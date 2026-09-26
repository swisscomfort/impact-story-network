import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  MapPin, 
  Compass, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Story, StoryCategory, StoryStatus, UserStats, CommentReaction, StoryUpdate } from './types';
import { INITIAL_STORIES } from './data/mockStories';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { StoryCard } from './components/StoryCard';
import { StoryDetailModal } from './components/StoryDetailModal';
import { CreateStoryModal } from './components/CreateStoryModal';
import { TrustSafetyModal } from './components/TrustSafetyModal';
import { ReputationView } from './components/ReputationView';
import { MicroFundModal } from './components/MicroFundModal';

export const App: React.FC = () => {
  // Stories state
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('isn_stories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STORIES;
      }
    }
    return INITIAL_STORIES;
  });

  // Save stories
  useEffect(() => {
    localStorage.setItem('isn_stories', JSON.stringify(stories));
  }, [stories]);

  // User Stats state
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('isn_user_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // default
      }
    }
    return {
      storiesChanged: 4,
      missionsSolved: 2,
      totalMicroImpact: 28,
      reputationPoints: 145,
      badge: 'Alltagsheld L1'
    };
  });

  useEffect(() => {
    localStorage.setItem('isn_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Tab & filters
  const [activeTab, setActiveTab] = useState<'feed' | 'reputation'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<StoryStatus | 'all'>('all');
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'CH' | 'DE' | 'AT'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'CHF' | 'EUR'>('CHF');

  // Modals
  const [selectedStoryForDetail, setSelectedStoryForDetail] = useState<Story | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isTrustSafetyOpen, setIsTrustSafetyOpen] = useState(false);
  const [microFundTarget, setMicroFundTarget] = useState<{ story: Story; amount: number } | null>(null);

  // Sync selected story when stories state updates
  useEffect(() => {
    if (selectedStoryForDetail) {
      const updated = stories.find(s => s.id === selectedStoryForDetail.id);
      if (updated) setSelectedStoryForDetail(updated);
    }
  }, [stories]);

  // Handlers
  const handleQuickFund = (story: Story, amount: number) => {
    setMicroFundTarget({ story, amount });
  };

  const handleConfirmMicroFund = (amount: number, note?: string) => {
    if (!microFundTarget) return;
    const targetId = microFundTarget.story.id;

    setStories(prev => prev.map(s => {
      if (s.id !== targetId) return s;

      const newAmount = s.currentAmount + amount;
      const isNowFunded = newAmount >= s.targetAmount;
      const newStatus = isNowFunded ? 'good_end' : 'turning';

      const newDonations = [
        ...s.donations,
        {
          id: `d-${Date.now()}`,
          supporterName: 'Du',
          amount,
          currency: s.currency,
          timestamp: 'Gerade eben',
          note
        }
      ];

      const newUpdates = [...s.updates];
      if (isNowFunded && !s.updates.some(u => u.isGoodEnd)) {
        newUpdates.push({
          id: `u-auto-${Date.now()}`,
          timestamp: 'Gerade eben',
          title: '🎉 Zielbetrag erreicht! Wendung finanziert!',
          content: 'Dank eurer Reaktionen ist das Ziel vollständig erreicht. Der Zweckbetrag wird umgesetzt!',
          isGoodEnd: true
        });
      }

      return {
        ...s,
        currentAmount: newAmount,
        status: newStatus,
        donations: newDonations,
        updates: newUpdates,
        goodEndSummary: isNowFunded ? (s.goodEndSummary || 'Zweckbetrag vollständig durch die Community finanziert!') : s.goodEndSummary
      };
    }));

    // Update user stats
    setUserStats(prev => ({
      ...prev,
      storiesChanged: prev.storiesChanged + 1,
      totalMicroImpact: prev.totalMicroImpact + amount,
      reputationPoints: prev.reputationPoints + 20,
      missionsSolved: (microFundTarget.story.currentAmount + amount >= microFundTarget.story.targetAmount) 
        ? prev.missionsSolved + 1 
        : prev.missionsSolved
    }));

    setMicroFundTarget(null);
  };

  const handleAddComment = (storyId: string, commentData: Omit<CommentReaction, 'id' | 'timestamp' | 'likes'>) => {
    setStories(prev => prev.map(s => {
      if (s.id !== storyId) return s;
      const newComment: CommentReaction = {
        id: `c-${Date.now()}`,
        ...commentData,
        timestamp: 'Gerade eben',
        likes: 1
      };
      return {
        ...s,
        comments: [newComment, ...s.comments],
        reactionsCount: s.reactionsCount + 1
      };
    }));

    // Give user reputation for helpful comments
    setUserStats(prev => ({
      ...prev,
      reputationPoints: prev.reputationPoints + 5
    }));
  };

  const handleUpvoteComment = (storyId: string, commentId: string) => {
    setStories(prev => prev.map(s => {
      if (s.id !== storyId) return s;
      return {
        ...s,
        comments: s.comments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c)
      };
    }));
  };

  const handleAddUpdate = (storyId: string, updateData: Omit<StoryUpdate, 'id' | 'timestamp'>) => {
    setStories(prev => prev.map(s => {
      if (s.id !== storyId) return s;
      const newUpdate: StoryUpdate = {
        id: `u-${Date.now()}`,
        ...updateData,
        timestamp: 'Gerade eben'
      };
      return {
        ...s,
        status: updateData.isGoodEnd ? 'good_end' : s.status,
        updates: [newUpdate, ...s.updates],
        goodEndSummary: updateData.isGoodEnd ? updateData.content : s.goodEndSummary
      };
    }));

    setUserStats(prev => ({
      ...prev,
      reputationPoints: prev.reputationPoints + 25
    }));
  };

  const handleCreateStory = (newStoryData: any) => {
    const newStory: Story = {
      ...newStoryData,
      id: `story-${Date.now()}`,
      currentAmount: 0,
      status: 'open',
      createdAt: 'Gerade eben',
      comments: [],
      updates: [],
      donations: [],
      views: 1,
      reactionsCount: 0
    };

    setStories(prev => [newStory, ...prev]);
    setIsCreateOpen(false);

    setUserStats(prev => ({
      ...prev,
      reputationPoints: prev.reputationPoints + 15
    }));
  };

  // Filtered stories logic
  const filteredStories = stories.filter(story => {
    if (selectedCategory !== 'all' && story.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && story.status !== selectedStatus) return false;
    if (selectedCountry !== 'all' && story.country !== selectedCountry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchSituation = story.situation.toLowerCase().includes(q);
      const matchProblem = story.problem.toLowerCase().includes(q);
      const matchCity = story.city.toLowerCase().includes(q);
      const matchPurpose = story.purposeTag.toLowerCase().includes(q);
      if (!matchTitle && !matchSituation && !matchProblem && !matchCity && !matchPurpose) return false;
    }
    return true;
  });

  const storyCounts = {
    total: stories.length,
    open: stories.filter(s => s.status === 'open').length,
    turning: stories.filter(s => s.status === 'turning').length,
    goodEnd: stories.filter(s => s.status === 'good_end').length
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenTrustSafety={() => setIsTrustSafetyOpen(true)}
        onOpenReputation={() => setActiveTab('reputation')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={userStats}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'feed' ? (
          <div>
            {/* Hero / Landing statement */}
            <div className="mb-8 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/20 to-stone-900 border border-stone-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="max-w-2xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Keine klassische Spendenplattform · Echte Alltagsszenen</span>
                </div>

                <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                  Die spannendsten echten Alltagsgeschichten – bei denen du den Ausgang verändern kannst.
                </h1>

                <p className="text-stone-300 text-sm leading-relaxed">
                  Menschen erzählen kurze, ungeschminkte Situationen: ein vergessenes Ticket, eine Panne, ein teurer Fehler. Die Community liest mit, gibt Tipps, zweifelt – und leitet mit kleinen, zweckgebundenen Beiträgen das gute Ende ein.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Eigene Situation erzählen</span>
                  </button>

                  <button
                    onClick={() => setIsTrustSafetyOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Wie Schutz & Zweckbindung funktionieren</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filters Header */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Geschichten durchsuchen (z.B. Zürich HB, Fahrradkette, Ladekabel, München)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition shadow-inner"
                />
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold transition self-center"
                >
                  Suche zurücksetzen
                </button>
              )}
            </div>

            {/* Filter Bar (Categories, Status, Country) */}
            <FilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              storyCounts={storyCounts}
            />

            {/* Stories Grid */}
            {filteredStories.length === 0 ? (
              <div className="bg-stone-900/50 rounded-3xl border border-stone-800 p-12 text-center space-y-3">
                <Compass className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-heading font-bold text-lg text-stone-300">
                  Keine Geschichten mit diesen Filtern gefunden
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Probiere andere Filterkategorien aus oder erzähle als Erster eine Situation in dieser Kategorie!
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                    setSelectedCountry('all');
                    setSearchQuery('');
                  }}
                  className="mt-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl"
                >
                  Alle Filter zurücksetzen
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onSelectStory={(s) => setSelectedStoryForDetail(s)}
                    onQuickFund={(s, amount) => handleQuickFund(s, amount)}
                    displayCurrency={currency}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <ReputationView
            userStats={userStats}
            currency={currency}
            onBackToFeed={() => setActiveTab('feed')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-800 bg-stone-950 text-stone-400 text-xs py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-heading font-bold text-stone-200 text-sm">
              Impact Story Network
            </span>
            <p className="text-stone-500 text-[11px]">
              Die Geschichten bewegen Menschen. Die Menschen verändern Geschichten. (DACH-Region)
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setIsTrustSafetyOpen(true)}
              className="hover:text-amber-400 transition"
            >
              Schutzstandards & Würde
            </button>
            <span className="text-stone-700">·</span>
            <button 
              onClick={() => {
                setActiveTab('reputation');
              }}
              className="hover:text-amber-400 transition"
            >
              Reputation
            </button>
            <span className="text-stone-700">·</span>
            <span className="text-stone-500">DSGVO-konform (Datenminimierung)</span>
          </div>
        </div>
      </footer>

      {/* Modal: Story Detail View */}
      {selectedStoryForDetail && (
        <StoryDetailModal
          story={selectedStoryForDetail}
          onClose={() => setSelectedStoryForDetail(null)}
          onAddComment={handleAddComment}
          onAddDonation={(storyId, amount, note) => {
            const targetStory = stories.find(s => s.id === storyId);
            if (targetStory) {
              setMicroFundTarget({ story: targetStory, amount });
            }
          }}
          onAddUpdate={handleAddUpdate}
          onUpvoteComment={handleUpvoteComment}
        />
      )}

      {/* Modal: Create / Tell a Story */}
      {isCreateOpen && (
        <CreateStoryModal
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateStory}
          defaultCurrency={currency}
        />
      )}

      {/* Modal: Trust & Safety */}
      {isTrustSafetyOpen && (
        <TrustSafetyModal
          onClose={() => setIsTrustSafetyOpen(false)}
        />
      )}

      {/* Modal: Quick Micro-Fund */}
      {microFundTarget && (
        <MicroFundModal
          story={microFundTarget.story}
          presetAmount={microFundTarget.amount}
          onClose={() => setMicroFundTarget(null)}
          onConfirm={handleConfirmMicroFund}
        />
      )}
    </div>
  );
};

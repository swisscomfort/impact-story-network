import React from 'react';
import { 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Shield, 
  Flame
} from 'lucide-react';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  onSelectStory: (story: Story) => void;
  onQuickFund: (story: Story, amount: number) => void;
  displayCurrency: 'CHF' | 'EUR';
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onSelectStory,
  onQuickFund,
  displayCurrency
}) => {
  const percentFunded = Math.min(100, Math.round((story.currentAmount / story.targetAmount) * 100));
  const remaining = Math.max(0, story.targetAmount - story.currentAmount);
  const isGoodEnd = story.status === 'good_end';

  const categoryColors: Record<string, string> = {
    'Heimkommen': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Gestrandet': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'Peinlicher Fehler': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Letztes Geld falsch eingesetzt': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    'Kleine Alltagspanne': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Spontane Wendung': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Mini-Mission': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  };

  const badgeStyle = categoryColors[story.category] || 'bg-stone-800 text-stone-300 border-stone-700';

  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isGoodEnd 
          ? 'bg-gradient-to-b from-stone-800/90 to-stone-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20' 
          : 'bg-stone-900/80 hover:bg-stone-850 border-stone-800 hover:border-stone-700 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Top Header */}
      <div className="p-5 pb-3">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${badgeStyle}`}>
              {story.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>{story.city}, {story.country}</span>
            </div>
          </div>

          {/* Status Badge */}
          {isGoodEnd ? (
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gutes Ende 🎉</span>
            </span>
          ) : story.status === 'turning' ? (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Wendung im Gang</span>
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
              Offene Mission
            </span>
          )}
        </div>

        {/* Story Title */}
        <h3 
          onClick={() => onSelectStory(story)}
          className="font-heading font-bold text-lg text-stone-100 hover:text-amber-300 cursor-pointer leading-snug transition mb-3"
        >
          {story.title}
        </h3>

        {/* Author info */}
        <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-stone-800/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-700 text-stone-300 font-bold flex items-center justify-center text-[10px]">
              {story.author.slice(0, 2).toUpperCase()}
            </div>
            <span>{story.author}</span>
            <span className="text-amber-400/90 font-mono text-[11px] bg-stone-800 px-1.5 py-0.2 rounded border border-stone-700">
              ★ {story.authorReputation}
            </span>
          </div>
          <span className="text-stone-500">{story.createdAt}</span>
        </div>

        {/* Situation & Problem */}
        <div className="space-y-2.5 text-sm mb-4">
          <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Die Situation:
            </span>
            <p className="text-stone-300 line-clamp-2 leading-relaxed">
              {story.situation}
            </p>
          </div>

          <div className="bg-amber-950/20 rounded-xl p-3 border border-amber-900/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Die Panne / Der Wendepunkt:
            </span>
            <p className="text-amber-200/90 line-clamp-2 leading-relaxed">
              {story.problem}
            </p>
          </div>
        </div>

        {/* Mission Box */}
        <div className="bg-stone-950/60 rounded-xl p-3.5 border border-stone-800 mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Konkrete Mini-Mission
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono border border-stone-700 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              {story.purposeTag}
            </span>
          </div>
          <p className="text-xs text-stone-300 font-medium mb-3">
            {story.mission}
          </p>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-stone-200">
                {story.currentAmount} {story.currency} <span className="text-stone-500 font-normal">/ {story.targetAmount} {story.currency}</span>
              </span>
              <span className="font-bold text-amber-400 font-mono">
                {percentFunded}%
              </span>
            </div>

            <div className="h-2.5 w-full bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700/60">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isGoodEnd 
                    ? 'bg-emerald-500' 
                    : percentFunded > 75 
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-400' 
                    : 'bg-gradient-to-r from-orange-500 to-amber-400'
                }`}
                style={{ width: `${percentFunded}%` }}
              />
            </div>

            {!isGoodEnd && remaining > 0 && (
              <div className="text-[11px] text-stone-400 flex items-center justify-between pt-0.5">
                <span>Noch <strong className="text-stone-200">{remaining} {story.currency}</strong> für die Wendung</span>
                <span className="text-stone-500">{story.donations.length} Unterstützer</span>
              </div>
            )}
          </div>
        </div>

        {/* Good End Summary Banner (if resolved) */}
        {isGoodEnd && story.goodEndSummary && (
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 mb-4 text-xs text-emerald-200">
            <strong className="block text-emerald-300 font-bold mb-1">🎉 Wendung geglückt:</strong>
            <p className="line-clamp-2">{story.goodEndSummary}</p>
          </div>
        )}

        {/* Quick Micro-Fund Action Buttons (Only if not resolved) */}
        {!isGoodEnd && (
          <div className="bg-stone-800/40 rounded-xl p-2.5 border border-stone-800 mb-3">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span className="font-semibold text-stone-300">Zweckgebunden wenden:</span>
              <span className="text-[10px] text-stone-500">1-Klick Micro-Impact</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickFund(story, 2);
                }}
                className="py-1.5 px-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-lg text-xs font-bold font-mono transition border border-stone-700 hover:border-amber-500 cursor-pointer text-center"
              >
                +2 {story.currency}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickFund(story, 5);
                }}
                className="py-1.5 px-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-lg text-xs font-bold font-mono transition border border-stone-700 hover:border-amber-500 cursor-pointer text-center"
              >
                +5 {story.currency}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickFund(story, Math.min(remaining, 10));
                }}
                className="py-1.5 px-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 rounded-lg text-xs font-bold font-mono transition shadow-sm cursor-pointer text-center"
              >
                +{Math.min(remaining, 10)} {story.currency}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Comments Teaser & Detail button */}
      <div className="px-5 py-3 bg-stone-950/40 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
        <button
          onClick={() => onSelectStory(story)}
          className="flex items-center gap-1.5 hover:text-stone-200 transition"
        >
          <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
          <span>{story.comments.length} Kommentare & Zweifel</span>
        </button>

        <button
          onClick={() => onSelectStory(story)}
          className="flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition group"
        >
          <span>Story ansehen</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  Flame, 
  Send, 
  ThumbsUp, 
  AlertTriangle, 
  Clock, 
  Heart, 
  DollarSign,
  PlusCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { Story, CommentReaction, StoryUpdate } from '../types';

interface StoryDetailModalProps {
  story: Story;
  onClose: () => void;
  onAddComment: (storyId: string, comment: Omit<CommentReaction, 'id' | 'timestamp' | 'likes'>) => void;
  onAddDonation: (storyId: string, amount: number, note?: string) => void;
  onAddUpdate: (storyId: string, update: Omit<StoryUpdate, 'id' | 'timestamp'>) => void;
  onUpvoteComment: (storyId: string, commentId: string) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onAddComment,
  onAddDonation,
  onAddUpdate,
  onUpvoteComment,
}) => {
  const [commentText, setCommentText] = useState('');
  const [commentRole, setCommentRole] = useState<'Tippgeber' | 'Zweifler' | 'Retter' | 'Community'>('Community');
  const [customDonation, setCustomDonation] = useState('');
  const [donationNote, setDonationNote] = useState('');
  const [trustWarning, setTrustWarning] = useState<string | null>(null);

  // Creator update form
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateContent, setNewUpdateContent] = useState('');
  const [isGoodEndMark, setIsGoodEndMark] = useState(false);

  const percentFunded = Math.min(100, Math.round((story.currentAmount / story.targetAmount) * 100));
  const remaining = Math.max(0, story.targetAmount - story.currentAmount);
  const isGoodEnd = story.status === 'good_end';

  // Basic Trust & Safety content moderation as required by TRUST_AND_SAFETY.md & PLAYFUL_QUICK_STORY_FEED.md:
  // Prohibit IBAN, phone numbers, private meeting offers, or hate speech
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const lower = commentText.toLowerCase();
    // Prohibit IBAN detection
    if (/([a-z]{2}\s*\d{2}[\s\d]{10,30})/i.test(commentText) || lower.includes('iban') || lower.includes('kontonummer')) {
      setTrustWarning('Sicherheitsregel: Keine IBAN oder Kontonummern im Kommentarbereich erlaubt! Spenden laufen strikt zweckgebunden über das System.');
      return;
    }

    // Prohibit private meeting / rides as defined in Startmechanik (Was der Start nicht ist)
    if (lower.includes('abholen') || lower.includes('mitnehmen') || lower.includes('schlafplatz bei mir') || lower.includes('treffen wir uns privat')) {
      setTrustWarning('Sicherheitsregel: Der Start der Plattform ist keine private Hilfskoordination (keine Abholungen, Mitfahrten oder private Treffen). Bitte gib Tipps oder reagiere mit einem Mini-Betrag.');
      return;
    }

    // Clear warning and submit
    setTrustWarning(null);
    onAddComment(story.id, {
      author: 'Du (Community)',
      roleTag: commentRole,
      text: commentText.trim(),
      isHelpfulAdvice: commentRole === 'Tippgeber'
    });
    setCommentText('');
  };

  const handleDonationSubmit = (amount: number, note?: string) => {
    if (amount <= 0) return;
    onAddDonation(story.id, amount, note);
    setCustomDonation('');
    setDonationNote('');
  };

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateTitle.trim() || !newUpdateContent.trim()) return;

    onAddUpdate(story.id, {
      title: newUpdateTitle.trim(),
      content: newUpdateContent.trim(),
      isGoodEnd: isGoodEndMark
    });
    setShowUpdateForm(false);
    setNewUpdateTitle('');
    setNewUpdateContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-stone-800 flex items-start justify-between gap-4 bg-stone-900/90 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                {story.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>{story.city}, {story.country}</span>
              </div>
              {isGoodEnd ? (
                <span className="flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gutes Ende 🎉</span>
                </span>
              ) : story.status === 'turning' ? (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Wendung im Gang</span>
                </span>
              ) : null}
            </div>

            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-100 leading-tight">
              {story.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition shrink-0"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Author bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-800/40 border border-stone-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 font-bold flex items-center justify-center text-sm shadow-md">
                {story.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-200 text-sm">{story.author}</span>
                  <span className="text-amber-400 font-mono text-[11px] bg-stone-800 px-1.5 py-0.5 rounded border border-stone-700">
                    Reputation: {story.authorReputation}
                  </span>
                </div>
                <span className="text-stone-500">Erstellt: {story.createdAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-400">
              <span className="hidden sm:inline">Schutzstufe:</span>
              <span className="bg-stone-800 px-2 py-1 rounded text-stone-300 font-mono text-[11px] border border-stone-700">
                L1 Schnellstory
              </span>
            </div>
          </div>

          {/* Dramaturgy: Situation & Problem */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-stone-800/40 rounded-2xl p-4 border border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                1. Die Reale Situation
              </span>
              <p className="text-stone-200 text-sm leading-relaxed whitespace-pre-line">
                {story.situation}
              </p>
            </div>

            <div className="bg-amber-950/20 rounded-2xl p-4 border border-amber-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                2. Die Panne / Der Wendepunkt
              </span>
              <p className="text-amber-100/90 text-sm leading-relaxed whitespace-pre-line">
                {story.problem}
              </p>
            </div>
          </div>

          {/* Mini-Mission & Zweckgebundene Geldreaktion Card */}
          <div className="bg-stone-950/70 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  3. Konkrete Mini-Mission
                </span>
                <p className="text-stone-100 font-medium text-base">
                  {story.mission}
                </p>
              </div>

              <div className="shrink-0 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block leading-none">Zweckbindung:</span>
                  <span className="text-xs font-bold text-stone-200">{story.purposeTag}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between items-baseline">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-extrabold text-2xl text-stone-100">
                    {story.currentAmount} {story.currency}
                  </span>
                  <span className="text-stone-400 text-sm">
                    von {story.targetAmount} {story.currency} Zielbetrag
                  </span>
                </div>
                <span className="font-mono font-bold text-amber-400 text-lg">
                  {percentFunded}%
                </span>
              </div>

              <div className="h-3 w-full bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700">
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

              <div className="flex justify-between text-xs text-stone-400">
                <span>{story.donations.length} Zweck-Reaktionen</span>
                {remaining > 0 ? (
                  <span>Noch <strong className="text-amber-300 font-bold">{remaining} {story.currency}</strong> für das gute Ende</span>
                ) : (
                  <span className="text-emerald-400 font-bold">Vollständig zweckfinanziert!</span>
                )}
              </div>
            </div>

            {/* Active Micro-Funding Action */}
            {!isGoodEnd ? (
              <div className="bg-stone-900 rounded-xl p-4 border border-stone-800">
                <h4 className="font-bold text-sm text-stone-200 mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Jetzt mit zweckgebundenem Geldbetrag die Story wenden
                </h4>
                <p className="text-xs text-stone-400 mb-3">
                  Keine privaten Töpfe. Der Betrag ist strikt zweckgebunden an: <strong className="text-stone-300">{story.purposeTag}</strong>.
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {[2, 5, 10, remaining].filter(a => a > 0).map((amt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDonationSubmit(amt, `Unterstützung für ${story.purposeTag}`)}
                      className="px-3.5 py-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-xl text-xs font-bold font-mono transition border border-stone-700 hover:border-amber-500 cursor-pointer"
                    >
                      +{amt} {story.currency}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max={remaining || 50}
                    placeholder={`Eigener Betrag (${story.currency})`}
                    value={customDonation}
                    onChange={(e) => setCustomDonation(e.target.value)}
                    className="w-40 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Kurze Aufmunterung (optional)"
                    value={donationNote}
                    onChange={(e) => setDonationNote(e.target.value)}
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => {
                      const val = parseFloat(customDonation);
                      if (val > 0) handleDonationSubmit(val, donationNote || undefined);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-bold rounded-xl transition cursor-pointer shrink-0"
                  >
                    Wendung ermöglichen
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-emerald-200 text-xs flex items-center justify-between">
                <div>
                  <strong className="block text-emerald-300 font-bold text-sm mb-1">🎉 Diese Mission ist erfolgreich beendet!</strong>
                  <span>Die Community hat die Wendung vollständig finanziert. Das Update siehst du unten.</span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              </div>
            )}

            {/* List of recent micro-supporters */}
            {story.donations.length > 0 && (
              <div className="mt-4 pt-3 border-t border-stone-800 text-xs">
                <span className="text-stone-400 text-[11px] block mb-2 font-medium">Beteiligte Unterstützer:</span>
                <div className="flex flex-wrap gap-2">
                  {story.donations.map((d) => (
                    <div key={d.id} className="bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 flex items-center gap-1.5">
                      <span className="font-semibold text-stone-200">{d.supporterName}</span>
                      <span className="text-amber-400 font-mono font-bold">+{d.amount} {d.currency}</span>
                      {d.note && <span className="text-stone-500 italic max-w-[150px] truncate">"{d.note}"</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Updates & Good End Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-stone-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Live Updates & Ausgang der Geschichte
              </h3>

              {/* Creator Update Button */}
              {!isGoodEnd && (
                <button
                  onClick={() => setShowUpdateForm(!showUpdateForm)}
                  className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-stone-800 hover:bg-stone-700 px-2.5 py-1.5 rounded-lg border border-stone-700 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Update als Robin posten</span>
                </button>
              )}
            </div>

            {/* Creator update form toggle */}
            {showUpdateForm && (
              <form onSubmit={handleCreateUpdate} className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-3 text-xs">
                <span className="font-bold text-amber-300 block">Neues sichtbares Update teilen:</span>
                <input
                  type="text"
                  placeholder="Update-Titel (z.B. Ticket am Schalter gekauft!)"
                  value={newUpdateTitle}
                  onChange={(e) => setNewUpdateTitle(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
                <textarea
                  rows={2}
                  placeholder="Was ist gerade passiert? (z.B. Sitze im Zug nach Luzern, riesiges Dankeschön!)"
                  value={newUpdateContent}
                  onChange={(e) => setNewUpdateContent(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  required
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGoodEndMark}
                      onChange={(e) => setIsGoodEndMark(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-500 bg-stone-900 border-stone-700"
                    />
                    <span>Als "Gutes Ende" (Mission erfolgreich gelöst) markieren 🎉</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                      className="px-3 py-1.5 text-stone-400 hover:text-stone-200"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg"
                    >
                      Update veröffentlichen
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Updates list */}
            {story.updates.length === 0 ? (
              <div className="bg-stone-800/30 rounded-xl p-4 text-center text-xs text-stone-400 border border-stone-800/60">
                Noch kein Update gepostet. Sobald die ersten Schritte unternommen werden, erscheint hier der Fortschritt.
              </div>
            ) : (
              <div className="space-y-3">
                {story.updates.map((update) => (
                  <div 
                    key={update.id} 
                    className={`rounded-xl p-4 border ${
                      update.isGoodEnd 
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                        : 'bg-stone-800/40 border-stone-700/80 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <strong className={`font-bold ${update.isGoodEnd ? 'text-emerald-300' : 'text-stone-100'}`}>
                        {update.title}
                      </strong>
                      <span className="text-stone-500">{update.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{update.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Comments & Second Layer (Kommentare als zweite Ebene der Story) */}
          <div className="space-y-4 pt-2 border-t border-stone-800">
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-200 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Die zweite Ebene: Kommentare, Nachfragen, Zweifel & Tipps
              </h3>
              <p className="text-xs text-stone-400">
                Ironie, Nachfragen und Zweifel sind erlaubt. Würde und Respekt bleiben geschützt. Keine privaten Daten oder Treffen.
              </p>
            </div>

            {/* Trust and safety warning alert if triggered */}
            {trustWarning && (
              <div className="bg-rose-950/50 border border-rose-500/50 p-3 rounded-xl text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{trustWarning}</span>
              </div>
            )}

            {/* Comment input form */}
            <form onSubmit={handleCommentSubmit} className="bg-stone-800/50 p-4 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium">Deine Rolle bei diesem Kommentar:</span>
                <div className="flex gap-1.5">
                  {(['Tippgeber', 'Zweifler', 'Retter', 'Community'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setCommentRole(r)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        commentRole === r
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={
                    commentRole === 'Tippgeber'
                      ? 'Gib einen konkreten, sicheren Tipp (z.B. Alternativroute, Sparpreis)...'
                      : commentRole === 'Zweifler'
                      ? 'Frag kritisch oder ironisch nach...'
                      : 'Kommentar, Frage oder Zuspruch verfassen...'
                  }
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-stone-700 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Senden</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-500 flex items-center gap-2">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Automatischer Vertrauensfilter aktiv (keine IBANs, keine Privatkontakte).</span>
              </div>
            </form>

            {/* Comments list */}
            <div className="space-y-3">
              {story.comments.map((comment) => (
                <div 
                  key={comment.id}
                  className={`p-3.5 rounded-xl border transition ${
                    comment.isHelpfulAdvice 
                      ? 'bg-blue-950/20 border-blue-800/40' 
                      : 'bg-stone-850/60 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-200">{comment.author}</span>
                      {comment.roleTag && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          comment.roleTag === 'Tippgeber' 
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                            : comment.roleTag === 'Zweifler'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : comment.roleTag === 'Creator'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-stone-800 text-stone-400'
                        }`}>
                          {comment.roleTag}
                        </span>
                      )}
                    </div>
                    <span className="text-stone-500 text-[11px]">{comment.timestamp}</span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed mb-2">
                    {comment.text}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-800/60">
                    <button
                      onClick={() => onUpvoteComment(story.id, comment.id)}
                      className="flex items-center gap-1 hover:text-amber-400 transition"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{comment.likes} Hilfreich / Zustimmen</span>
                    </button>

                    {comment.isHelpfulAdvice && (
                      <span className="flex items-center gap-1 text-blue-400 text-[11px]">
                        <Lightbulb className="w-3 h-3" />
                        Hilfreicher Tipp
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

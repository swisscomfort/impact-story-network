import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Flame, 
  Heart,
  Users,
  Star
} from 'lucide-react';
import { UserStats } from '../types';

interface ReputationViewProps {
  userStats: UserStats;
  currency: 'CHF' | 'EUR';
  onBackToFeed: () => void;
}

export const ReputationView: React.FC<ReputationViewProps> = ({
  userStats,
  currency,
  onBackToFeed
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Reputations-System
              </span>
              <span className="text-xs text-stone-400">DACH Community</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Dein Impact & Vertrauensstatus
            </h1>
            <p className="text-stone-300 text-sm max-w-xl leading-relaxed">
              Jede Reaktion zählt. Auf Impact Story Network baust du Reputation auf, indem du echte Situationen wendest, ehrliche Tipps gibst und Vertrauen schützt.
            </p>
          </div>

          <div className="bg-stone-900/90 border border-amber-500/40 p-4 rounded-2xl shrink-0 text-center shadow-lg">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Reputation Score
            </span>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-400 flex items-center justify-center gap-1 font-mono">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span>{userStats.reputationPoints}</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 inline-block mt-2">
              {userStats.badge}
            </span>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-stone-800 text-xs">
          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Geschichten verändert</span>
            </div>
            <span className="font-heading font-extrabold text-xl text-stone-100 font-mono">
              {userStats.storiesChanged}
            </span>
          </div>

          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gelöste Missionen</span>
            </div>
            <span className="font-heading font-extrabold text-xl text-stone-100 font-mono">
              {userStats.missionsSolved}
            </span>
          </div>

          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zweckgebundener Beitrag</span>
            </div>
            <span className="font-heading font-extrabold text-xl text-stone-100 font-mono">
              {userStats.totalMicroImpact} {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Levels Explanation (from REPUTATION_SYSTEM.md & UNIFIED_STORY_FLOW.md) */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
        <h2 className="font-heading font-bold text-lg text-stone-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Die 3 Schutz- und Vertrauensstufen
        </h2>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">Stufe L1</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">Aktiv</span>
            </div>
            <h3 className="font-bold text-sm text-stone-200">Schnellstory</h3>
            <p className="text-stone-400 leading-relaxed">
              Leichte Alltagspannen (Ticket, Ladekabel, Reparatur). Kleine Beträge bis 150 {currency}, direkte Community-Reaktionen und sofortige Wendungen.
            </p>
          </div>

          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300">Stufe L2</span>
              <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full font-mono">Freigeschaltet</span>
            </div>
            <h3 className="font-bold text-sm text-stone-200">Verifizierter Creator</h3>
            <p className="text-stone-400 leading-relaxed">
              Nutzer mit mindestens einem erfolgreich dokumentierten Good-End-Update. Höheres Vertrauen und Auszeichnung im Feed.
            </p>
          </div>

          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">Stufe L3</span>
              <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full font-mono">Community Lotse</span>
            </div>
            <h3 className="font-bold text-sm text-stone-200">Vertrauens-Moderator</h3>
            <p className="text-stone-400 leading-relaxed">
              Erfahrene Helfer, die Kommentare moderieren, Missbrauchsfälle melden und komplexe Begleitungen unterstützen.
            </p>
          </div>
        </div>
      </div>

      {/* Community Leaderboard / Recent Wendungen */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-lg text-stone-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              Top Story-Veränderer im DACH-Raum
            </h2>
            <p className="text-xs text-stone-400">
              Community-Mitglieder mit den meisten erfolgreichen Wendungen
            </p>
          </div>

          <button
            onClick={onBackToFeed}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 transition"
          >
            ← Zurück zum Storyfeed
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { name: 'Beat K. (Zürich)', score: 340, wendungen: 14, badge: 'Alltagsheld' },
            { name: 'Elena_Z (Basel)', score: 295, wendungen: 11, badge: 'Tipp-Königin' },
            { name: 'Felix_Kreuzberg (Berlin)', score: 260, wendungen: 9, badge: 'Ersthelfer' },
            { name: 'Stefan_Wien (Wien)', score: 215, wendungen: 8, badge: 'Community Lotse' },
            { name: 'Du (Robin / Supporter)', score: userStats.reputationPoints, wendungen: userStats.storiesChanged, badge: userStats.badge, isUser: true }
          ].sort((a, b) => b.score - a.score).map((member, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                member.isUser 
                  ? 'bg-amber-500/10 border-amber-500/40 text-stone-100' 
                  : 'bg-stone-800/40 border-stone-800 text-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 text-center font-bold font-mono text-sm ${idx === 0 ? 'text-amber-400' : 'text-stone-500'}`}>
                  #{idx + 1}
                </span>
                <div>
                  <span className="font-bold block text-stone-100">{member.name}</span>
                  <span className="text-[11px] text-stone-500">{member.wendungen} Geschichten gewendet</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                  {member.badge}
                </span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {member.score} Pkt.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

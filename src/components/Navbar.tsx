import React from 'react';
import { 
  Sparkles, 
  PlusCircle, 
  ShieldCheck, 
  Award, 
  Compass, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { UserStats } from '../types';

interface NavbarProps {
  onOpenCreate: () => void;
  onOpenTrustSafety: () => void;
  onOpenReputation: () => void;
  activeTab: 'feed' | 'reputation';
  setActiveTab: (tab: 'feed' | 'reputation') => void;
  userStats: UserStats;
  currency: 'CHF' | 'EUR';
  setCurrency: (c: 'CHF' | 'EUR') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreate,
  onOpenTrustSafety,
  onOpenReputation,
  activeTab,
  setActiveTab,
  userStats,
  currency,
  setCurrency
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
      {/* Top Banner: Platform Claim & Pulse */}
      <div className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-rose-600/20 px-4 py-1.5 border-b border-stone-800/60 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-amber-200">Impact Story Network:</span>
            <span className="hidden sm:inline text-stone-300">Die Geschichten bewegen Menschen. Die Menschen verändern Geschichten.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong className="text-stone-200">128</strong> Mini-Missionen gelöst</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span><strong className="text-stone-200">98.2%</strong> Good-End Quote</span>
            </div>
            <div className="flex items-center bg-stone-800 rounded px-1.5 py-0.5 border border-stone-700 text-xs">
              <button
                onClick={() => setCurrency('CHF')}
                className={`px-1.5 py-0.5 rounded transition ${currency === 'CHF' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
              >
                CHF
              </button>
              <span className="text-stone-600 px-0.5">/</span>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-1.5 py-0.5 rounded transition ${currency === 'EUR' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
              >
                EUR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-orange-500/20 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg text-white tracking-tight">Impact Story</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">DACH</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-none hidden sm:block">Kleine echte Alltagssituationen live verändern</p>
            </div>
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-xl border border-stone-700/60">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'feed'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Storyfeed</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('reputation');
              onOpenReputation();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'reputation'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Impact & Reputation</span>
            <span className="text-[10px] bg-stone-900/60 px-1.5 py-0.5 rounded-full text-amber-300 border border-amber-500/20">
              +{userStats.reputationPoints}
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTrustSafety}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-800/60 hover:bg-stone-800 border border-stone-700 transition"
            title="Vertrauensregeln & Schutzstandards"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Regeln & Schutz</span>
          </button>

          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Situation erzählen</span>
            <span className="sm:hidden">Erzählen</span>
          </button>
        </div>
      </div>
    </header>
  );
};

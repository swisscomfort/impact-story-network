import React from 'react';
import { Filter, Sparkles, CheckCircle2, Flame, MapPin } from 'lucide-react';
import { StoryCategory, StoryStatus } from '../types';

interface FilterBarProps {
  selectedCategory: StoryCategory | 'all';
  setSelectedCategory: (cat: StoryCategory | 'all') => void;
  selectedStatus: StoryStatus | 'all';
  setSelectedStatus: (status: StoryStatus | 'all') => void;
  selectedCountry: 'all' | 'CH' | 'DE' | 'AT';
  setSelectedCountry: (country: 'all' | 'CH' | 'DE' | 'AT') => void;
  storyCounts: {
    total: number;
    open: number;
    turning: number;
    goodEnd: number;
  };
}

const CATEGORIES: (StoryCategory | 'all')[] = [
  'all',
  'Heimkommen',
  'Gestrandet',
  'Peinlicher Fehler',
  'Letztes Geld falsch eingesetzt',
  'Kleine Alltagspanne',
  'Spontane Wendung',
  'Mini-Mission'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedCountry,
  setSelectedCountry,
  storyCounts
}) => {
  return (
    <div className="space-y-3 mb-6">
      {/* Top Filter Row: Status + Country */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/60 p-2 rounded-2xl border border-stone-800">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedStatus === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <span>Alle Geschichten</span>
            <span className="text-[10px] bg-stone-950/30 px-1.5 py-0.2 rounded-full font-mono">
              {storyCounts.total}
            </span>
          </button>

          <button
            onClick={() => setSelectedStatus('turning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedStatus === 'turning'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Wendung im Gang</span>
            <span className="text-[10px] bg-stone-950/30 px-1.5 py-0.2 rounded-full font-mono">
              {storyCounts.turning}
            </span>
          </button>

          <button
            onClick={() => setSelectedStatus('open')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedStatus === 'open'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Offene Missionen</span>
            <span className="text-[10px] bg-stone-950/30 px-1.5 py-0.2 rounded-full font-mono">
              {storyCounts.open}
            </span>
          </button>

          <button
            onClick={() => setSelectedStatus('good_end')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedStatus === 'good_end'
                ? 'bg-emerald-500 text-stone-950 font-bold'
                : 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/30'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Good Ends 🎉</span>
            <span className="text-[10px] bg-stone-950/30 px-1.5 py-0.2 rounded-full font-mono">
              {storyCounts.goodEnd}
            </span>
          </button>
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-1 bg-stone-950/60 p-1 rounded-xl border border-stone-800 text-xs">
          <div className="flex items-center gap-1 px-1.5 text-stone-400">
            <MapPin className="w-3 h-3 text-stone-500" />
            <span className="text-[11px] hidden sm:inline">Region:</span>
          </div>
          {[
            { id: 'all', label: 'Alle DACH' },
            { id: 'CH', label: '🇨🇭 CH' },
            { id: 'DE', label: '🇩🇪 DE' },
            { id: 'AT', label: '🇦🇹 AT' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCountry(c.id as any)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                selectedCountry === c.id
                  ? 'bg-stone-800 text-stone-100 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Horizontal Scroll Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-stone-500 flex items-center gap-1 pl-1 pr-2 shrink-0 font-medium">
          <Filter className="w-3 h-3" />
          Thema:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full shrink-0 font-medium transition border ${
              selectedCategory === cat
                ? 'bg-stone-100 text-stone-950 border-stone-100 font-bold shadow-sm'
                : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            {cat === 'all' ? 'Alle Themen' : cat}
          </button>
        ))}
      </div>
    </div>
  );
};

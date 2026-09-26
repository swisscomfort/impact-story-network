import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { Story } from '../types';

interface MicroFundModalProps {
  story: Story;
  presetAmount: number;
  onClose: () => void;
  onConfirm: (amount: number, note?: string) => void;
}

export const MicroFundModal: React.FC<MicroFundModalProps> = ({
  story,
  presetAmount,
  onClose,
  onConfirm
}) => {
  const [amount, setAmount] = useState<number>(presetAmount || 5);
  const [note, setNote] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const remaining = Math.max(0, story.targetAmount - story.currentAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(amount, note || undefined);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-stone-100">
                Story-Wendung unterstützen
              </h3>
              <p className="text-[11px] text-stone-400">Zweckgebundener Mini-Betrag</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-lg text-stone-100">
              Wendung ausgelöst! 🎉
            </h4>
            <p className="text-xs text-stone-300">
              Dein Betrag von <strong className="text-amber-400">{amount} {story.currency}</strong> wurde zweckgebunden verbucht.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Mission Target Summary */}
            <div className="bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Zweckgebunden für:
              </span>
              <p className="font-semibold text-stone-200 text-xs line-clamp-1">
                {story.mission}
              </p>
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-800">
                <span>Verwendungszweck: <strong>{story.purposeTag}</strong></span>
                <span>Noch offen: <strong>{remaining} {story.currency}</strong></span>
              </div>
            </div>

            {/* Quick Amount Selection */}
            <div>
              <label className="block text-stone-300 font-bold mb-1.5">
                Wähle deinen Betrag ({story.currency}):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 5, 10, remaining].filter(a => a > 0).slice(0, 4).map((amt, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition border ${
                      amount === amt 
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md' 
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    {amt} {story.currency}
                  </button>
                ))}
              </div>
            </div>

            {/* Note input */}
            <div>
              <label className="block text-stone-300 font-bold mb-1">
                Aufmunterung oder Tipp für die Story (optional):
              </label>
              <input
                type="text"
                placeholder="z.B. Fahr gut heim! / Viel Erfolg beim Gespräch!"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>

            {/* Guarantee note */}
            <div className="flex items-start gap-2 text-[11px] text-stone-400 bg-stone-800/40 p-3 rounded-xl border border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                100% Zweckbindung. Keine Spendenbürokratie. Sichtbarer Fortschritt direkt im Feed.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs rounded-xl transition shadow-lg shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{amount} {story.currency} zweckgebunden beitragen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

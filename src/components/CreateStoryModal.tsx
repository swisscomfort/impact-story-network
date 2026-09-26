import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { StoryCategory, Story } from '../types';

interface CreateStoryModalProps {
  onClose: () => void;
  onSubmit: (newStory: Omit<Story, 'id' | 'currentAmount' | 'status' | 'createdAt' | 'comments' | 'updates' | 'donations' | 'views' | 'reactionsCount'>) => void;
  defaultCurrency: 'CHF' | 'EUR';
}

const CATEGORIES: StoryCategory[] = [
  'Heimkommen',
  'Gestrandet',
  'Peinlicher Fehler',
  'Letztes Geld falsch eingesetzt',
  'Kleine Alltagspanne',
  'Spontane Wendung',
  'Mini-Mission'
];

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  onClose,
  onSubmit,
  defaultCurrency
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState<'CH' | 'DE' | 'AT'>('CH');
  const [category, setCategory] = useState<StoryCategory>('Heimkommen');
  const [situation, setSituation] = useState('');
  const [problem, setProblem] = useState('');
  const [mission, setMission] = useState('');
  const [purposeTag, setPurposeTag] = useState('');
  const [targetAmount, setTargetAmount] = useState<number>(20);
  const [currency, setCurrency] = useState<'CHF' | 'EUR'>(defaultCurrency);

  // Trust agreement check
  const [trustChecked, setTrustChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNext = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!title.trim() || !author.trim() || !city.trim() || !situation.trim()) {
        setErrorMsg('Bitte fülle Titel, deinen Namen/Pseudonym, Stadt und die Situation aus.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!problem.trim()) {
        setErrorMsg('Bitte beschreibe die Panne oder das konkrete Hindernis.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!mission.trim() || !purposeTag.trim() || targetAmount <= 0) {
        setErrorMsg('Bitte formuliere die Mini-Mission, den genauen Verwendungszweck und einen Betrag (z.B. 10 - 50).');
        return;
      }
      if (targetAmount > 150) {
        setErrorMsg('Sicherheitslimit für Schnellstories: Der Start fokussiert sich auf Mini-Missionen (maximal 150 CHF/EUR).');
        return;
      }
      setStep(4);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trustChecked) {
      setErrorMsg('Bitte bestätige die Schutzregeln zur Menschenwürde und Datenminimierung.');
      return;
    }

    onSubmit({
      title: title.trim(),
      author: author.trim(),
      authorReputation: 100, // starting reputation
      city: city.trim(),
      country,
      category,
      situation: situation.trim(),
      problem: problem.trim(),
      mission: mission.trim(),
      targetAmount,
      currency,
      purposeTag: purposeTag.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
              Unified Story Flow · Schritt {step} von 4
            </span>
            <h2 className="font-heading font-extrabold text-xl text-stone-100">
              {step === 1 && '1. Die Reale Alltagssituation'}
              {step === 2 && '2. Das Problem & Die Panne'}
              {step === 3 && '3. Konkrete Mini-Mission'}
              {step === 4 && '4. Vertrauens- & Schutz-Check'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress indicators */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-stone-950/50 border-b border-stone-800/80">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= s ? 'bg-amber-500' : 'bg-stone-800'
              }`}
            />
          ))}
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={step === 4 ? handleFinalSubmit : (e) => { e.preventDefault(); handleNext(); }} className="p-6 space-y-4">
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  Story-Titel (kurz, prägnant, ehrlich)
                </label>
                <input
                  type="text"
                  placeholder="z.B. Flirt verpatzt & letztes Geld für Drink weg: Ticket nach Luzern fehlt!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Dein Vorname oder Pseudonym
                  </label>
                  <input
                    type="text"
                    placeholder="z.B. Robin M."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Kategorie
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as StoryCategory)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Ort / Bahnhof / Stadt
                  </label>
                  <input
                    type="text"
                    placeholder="z.B. Zürich HB"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Land (DACH)
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { code: 'CH', label: '🇨🇭 CH' },
                      { code: 'DE', label: '🇩🇪 DE' },
                      { code: 'AT', label: '🇦🇹 AT' }
                    ].map((ct) => (
                      <button
                        type="button"
                        key={ct.code}
                        onClick={() => {
                          setCountry(ct.code as any);
                          if (ct.code === 'CH') setCurrency('CHF');
                          else setCurrency('EUR');
                        }}
                        className={`py-2 rounded-xl text-xs font-bold border transition ${
                          country === ct.code 
                            ? 'bg-amber-500 text-stone-950 border-amber-500' 
                            : 'bg-stone-950 text-stone-400 border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        {ct.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  Die Ausgangslage: Was ist passiert?
                </label>
                <textarea
                  rows={3}
                  placeholder="Beschreibe kurz die Szene. Wo stehst du? Wie kam es dazu?"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="bg-stone-800/40 p-3.5 rounded-xl border border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Deine Situation:</span>
                <p className="text-stone-300 italic">"{situation}"</p>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  Die Panne / Das konkrete Hindernis
                </label>
                <p className="text-stone-400 text-[11px] mb-2">
                  Was ging schief? Was fehlt dir genau im Hier und Jetzt? Sei authentisch und ehrlich.
                </p>
                <textarea
                  rows={4}
                  placeholder="z.B. Mein Tageslimit auf der Debitkarte ist erreicht, der Zug nach Luzern fährt in 25 Min und mir fehlen 24 CHF für das Ticket..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  Die konkrete Mini-Mission für die Community
                </label>
                <input
                  type="text"
                  placeholder="z.B. Ticket Zürich HB → Luzern zweckgebunden finanzieren"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Exakter Verwendungszweck (Zweckbindung)
                  </label>
                  <input
                    type="text"
                    placeholder="z.B. SBB Ticket, Fahrradschlauch, Ladekabel"
                    value={purposeTag}
                    onChange={(e) => setPurposeTag(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold mb-1">
                    Benötigter Betrag ({currency})
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max="150"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(parseInt(e.target.value) || 0)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-200 font-mono font-bold focus:outline-none focus:border-amber-500 text-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setCurrency(currency === 'CHF' ? 'EUR' : 'CHF')}
                      className="px-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-stone-200 font-bold font-mono text-xs"
                    >
                      {currency}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  Zweckbindungs-Prinzip:
                </span>
                <p>
                  Auf dieser Plattform sammeln wir keine anonymen Geldtöpfe. Der Betrag ist transparent an die Mini-Mission gebunden und du verpflichtest dich, ein sichtbares Update über die Wendung zu posten.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <h4 className="font-bold text-sm text-stone-200 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Vertrauens- und Schutz-Garantie (Impact Story Network)
                </h4>
                <ul className="space-y-2 text-stone-400 text-xs pl-1">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Keine privaten Daten:</strong> Keine IBAN, keine Privatadresse, keine Telefonnummer öffentlich im Text.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Keine Treffen / keine Abholungen:</strong> Der Start schützt alle Beteiligten vor unkontrollierten physischen Treffen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Update-Pflicht:</strong> Wenn die Community deine Mission finanziert, teilst du ein Bild oder eine kurze Bestätigung des guten Endes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Menschenwürde:</strong> Humor und Kritik sind erlaubt, Herabwürdigung oder Beschämung ist strikt untersagt.</span>
                  </li>
                </ul>
              </div>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-800/50 border border-stone-700 cursor-pointer hover:bg-stone-800 transition">
                <input
                  type="checkbox"
                  checked={trustChecked}
                  onChange={(e) => setTrustChecked(e.target.checked)}
                  className="mt-0.5 rounded text-amber-500 focus:ring-amber-500 bg-stone-900 border-stone-700"
                />
                <span className="text-stone-300 leading-snug">
                  Ich habe die Schutzregeln verstanden, versichere die Richtigkeit meiner Situation und werde die Community nach der Wendung mit einem Update informieren.
                </span>
              </label>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 text-xs font-semibold transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zurück</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-semibold"
              >
                Abbrechen
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
              >
                <span>Weiter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!trustChecked}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
                  trustChecked
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 cursor-pointer shadow-emerald-500/20'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Story & Mission veröffentlichen</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

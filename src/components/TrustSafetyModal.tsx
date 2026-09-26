import React from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  HeartHandshake, 
  Lock, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

interface TrustSafetyModalProps {
  onClose: () => void;
}

export const TrustSafetyModal: React.FC<TrustSafetyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-stone-100">
                Vertrauen, Würde & Schutzregeln
              </h2>
              <p className="text-xs text-stone-400">
                Sicherheits- und Moderationsprinzipien von Impact Story Network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-300 flex-1">
          {/* Section 1: Würde und Ton */}
          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              1. Würde, Leichtigkeit und Respekt
            </h3>
            <p className="leading-relaxed">
              Der Ton ist leicht, direkt und menschlich. Humor darf aus der absurden Alltagssituation entstehen – niemals aus der Erniedrigung der Person.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                <strong>Erlaubt & erwünscht:</strong>
                <p>Echte Szenen, Nachfragen, Zweifel, Ironie, sachliche Tipps, Zuspruch und kleine zweckgebundene Wendungen.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-200">
                <strong>Strikte rote Linien:</strong>
                <p>Hass, systematische Demütigung, Doxxing, Bedrohung, Belästigung oder Beschämung.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Was der Start bewusst nicht ist */}
          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              2. Was der Start bewusst NICHT ist (Schutz vor Missbrauch)
            </h3>
            <p className="leading-relaxed">
              Um Nutzer vor unkontrollierten Risiken zu schützen, ist der Start bewusst <strong>keine private Hilfskoordination</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-400">
              <li>Keine Mitfahrten oder Abholungen</li>
              <li>Keine privaten Treffen oder Schlafplatz-Angebote</li>
              <li>Keine Sachhilfeübergaben vor Ort</li>
              <li>Keine direkte Übermittlung von IBANs oder Telefonnummern im Feed</li>
            </ul>
            <p className="text-amber-300 font-medium pt-1">
              Hilfe zum Start bedeutet: Kleine, transparente, zweckgebundene Geldreaktionen (Ticket, Ladekabel, Reparatur, etc.) mit sichtbarem Good-End-Update.
            </p>
          </div>

          {/* Section 3: DSGVO & Datenminimierung */}
          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              3. DSGVO, Datenminimierung & Transparenz
            </h3>
            <p className="leading-relaxed">
              Stories erfordern keine Klarnamen oder Ausweiskopien im öffentlichen Feed. Pseudonyme genügen. Es werden niemals sensible Bankdaten oder Adressen dritter Personen veröffentlicht.
            </p>
          </div>

          {/* Section 4: Zweckbindung & Good End */}
          <div className="bg-stone-800/40 p-4 rounded-2xl border border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              4. Die Good-End-Verpflichtung
            </h3>
            <p className="leading-relaxed">
              Wer eine Story einstellt und von der Community unterstützt wird, verpflichtet sich zur Veröffentlichung eines sichtbaren Updates (z.B. Ticket gelöst, Zug erreicht, Reparatur erfolgt). Das schützt das Vertrauen aller Unterstützer.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
          >
            Verstanden & Schliessen
          </button>
        </div>
      </div>
    </div>
  );
};

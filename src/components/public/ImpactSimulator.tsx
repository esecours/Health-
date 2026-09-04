import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  CreditCard, 
  Smartphone,
  Gift,
  Coins
} from 'lucide-react';

interface ImpactSimulatorProps {
  onOpenPaymentModal: (amount?: number) => void;
}

export const ImpactSimulator: React.FC<ImpactSimulatorProps> = ({ onOpenPaymentModal }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [
    { value: 5000, label: '5 000 F' },
    { value: 15000, label: '15 000 F' },
    { value: 25000, label: '25 000 F' },
    { value: 50000, label: '50 000 F' },
    { value: 100000, label: '100 000 F' },
    { value: 250000, label: '250 000 F' }
  ];

  // Dynamic calculations based on amount
  const calculateImpact = (amount: number) => {
    if (amount < 10000) {
      return {
        kits: 1,
        apprentices: 2,
        sessions: 1,
        title: "Kit d'Hygiène & Sensibilisation Initiale",
        description: "Financement d'un kit complet de dignité menstruelle et documentation SDSR pour 2 jeunes filles apprenties en atelier."
      };
    } else if (amount < 25000) {
      return {
        kits: 3,
        apprentices: 6,
        sessions: 2,
        title: "Prise en charge SDSR & Éducation de Proximité",
        description: "2 sessions d'éducation complète à la sexualité et kits d'hygiène pour 6 apprenties couturières ou coiffeuses à Parakou."
      };
    } else if (amount < 50000) {
      return {
        kits: 8,
        apprentices: 15,
        sessions: 4,
        title: "Cercle de Parole & Prévention des VBG",
        description: "Organisation d'un cercle de parole sécurisé pour 15 femmes et jeunes filles + orientation médicale et soutien psychosocial."
      };
    } else if (amount < 100000) {
      return {
        kits: 20,
        apprentices: 40,
        sessions: 8,
        title: "Caravane Communautaire & Prise en Charge Juridique",
        description: "Déploiement d'une caravane d'action dans 2 quartiers périurbains et suivi juridique de dossiers de violences basées sur le genre."
      };
    } else if (amount < 250000) {
      return {
        kits: 50,
        apprentices: 100,
        sessions: 15,
        title: "Académie de Leadership Féminin & Autonomisation",
        description: "Formation intensive en art oratoire, leadership transformateur et gestion d'activités génératrices de revenus pour 25 jeunes femmes leaders."
      };
    } else {
      return {
        kits: 120,
        apprentices: 300,
        sessions: 30,
        title: "Programme Stratégique Intégré Intercommunal",
        description: "Soutien majeur d'une clinique mobile communautaire sur plusieurs communes du Borgou avec dépistage, écoute et insertion économique."
      };
    }
  };

  const currentImpact = calculateImpact(selectedAmount);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Decorative luminous backdrop */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest">
            <Coins className="w-3.5 h-3.5" />
            <span>Simulateur d'Impact Direct & Don Solidaire</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
            Votre contribution, mesurée en vies transformées
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Chaque franc investi est géré avec une rigueur comptable totale et une traçabilité 
            documentée selon les standards internationaux de bonne gouvernance féministe.
          </p>
        </div>

        {/* Interactive Simulator Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Amount Selection Panel (Left) */}
          <div className="lg:col-span-6 bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-md space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Choisissez ou saisissez un montant (FCFA) :
              </label>
              
              <div className="grid grid-cols-3 gap-2.5">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      setSelectedAmount(preset.value);
                      setIsCustom(false);
                    }}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                      !isCustom && selectedAmount === preset.value
                        ? 'bg-teal-600 text-white border-teal-400 shadow-lg shadow-teal-600/30 scale-[1.02]'
                        : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Ou entrez un montant personnalisé :</span>
                <span className="font-bold text-teal-400">XOF (FCFA)</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={selectedAmount}
                  onChange={(e) => {
                    setSelectedAmount(Math.max(1000, Number(e.target.value) || 0));
                    setIsCustom(true);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl py-3 px-4 text-white font-bold text-lg focus:outline-hidden"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  FCFA
                </span>
              </div>
            </div>

            {/* Supported Payment Channels */}
            <div className="pt-4 border-t border-slate-700/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Canaux sécurisés instantanés :
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  MTN Mobile Money
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30 font-semibold flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  Moov Money
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  Visa / Mastercard
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Real Impact Result Card (Right) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 border border-teal-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-teal-500/20">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md border border-teal-500/30">
                  Impact Estimé
                </span>
                <h3 className="text-xl font-black font-display text-white mt-2">
                  {currentImpact.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Montant choisi</span>
                <span className="text-2xl font-black text-teal-300 font-display">
                  {selectedAmount.toLocaleString()} <span className="text-xs font-normal">F</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentImpact.description}
            </p>

            {/* Dynamic Metric Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-teal-500/20 text-center">
                <div className="text-lg sm:text-2xl font-black text-teal-400 font-display">
                  {currentImpact.apprentices}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                  Filles & Femmes
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-2xl border border-teal-500/20 text-center">
                <div className="text-lg sm:text-2xl font-black text-emerald-400 font-display">
                  {currentImpact.kits}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                  Kits Hygiène
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-2xl border border-teal-500/20 text-center">
                <div className="text-lg sm:text-2xl font-black text-amber-400 font-display">
                  {currentImpact.sessions}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                  Ateliers / Écoute
                </div>
              </div>
            </div>

            {/* Launch Modal Button */}
            <button
              onClick={() => onOpenPaymentModal(selectedAmount)}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Valider ce don de {selectedAmount.toLocaleString()} FCFA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

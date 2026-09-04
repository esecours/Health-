import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export const PartnersCarousel: React.FC = () => {
  const { partners } = useApp();
  
  // Filter out partners without logos
  const validPartners = partners.filter(p => p.logoUrl && p.logoUrl.trim() !== '');
  
  if (validPartners.length === 0) {
    return (
      <section className="w-full bg-slate-50 py-12 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-xs italic">Chargement des partenaires...</p>
      </section>
    );
  }

  // Triple the list for a smooth infinite scroll effect
  const duplicatedPartners = [...validPartners, ...validPartners, ...validPartners];

  return (
    <section className="w-full overflow-hidden bg-slate-50 py-24 border-y border-slate-200 min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 shadow-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
          </span>
          <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">
            Partenariat & Voix du Changement
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
          Nos Partenaires de Confiance
        </h2>
        <div className="w-20 h-1.5 bg-[#144D32] rounded-full mx-auto"></div>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
          Ils soutiennent nos actions stratégiques pour l'autonomisation, 
          la santé communautaire et le plaidoyer social au Bénin.
        </p>
      </div>

      <div className="relative w-full py-12">
        {/* Decorative Gradients for smooth fade at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex gap-16 sm:gap-32 items-center whitespace-nowrap px-8"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="flex flex-col items-center group/item shrink-0">
                <div className="h-32 w-32 sm:h-44 sm:w-44 flex items-center justify-center rounded-[2.5rem] bg-white border border-slate-200 shadow-md p-8 sm:p-12 group-hover/item:shadow-2xl group-hover/item:border-teal-400 transition-all duration-500 hover:-translate-y-2">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-all duration-700 transform group-hover/item:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


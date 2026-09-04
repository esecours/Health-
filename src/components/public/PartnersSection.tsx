import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ArrowRight, 
  Globe2, 
  FolderGit2, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const { partners = [], setCurrentView } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Nos Organismes & Partenaires Stratégiques
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Des collaborations solides avec les bailleurs internationaux, réseaux féministes, administrations publiques et collectives communautaires au Bénin.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                setCurrentView('partners');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#144D32] font-black hover:text-[#0d3623] text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Voir tous ({partners.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FCFBF7] border border-slate-200 hover:border-[#144D32] hover:bg-emerald-50 text-slate-700 hover:text-[#144D32] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FCFBF7] border border-slate-200 hover:border-[#144D32] hover:bg-emerald-50 text-slate-700 hover:text-[#144D32] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Partners Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="snap-start shrink-0 w-[280px] sm:w-[370px] bg-[#FCFBF7] rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#144D32] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3.5">
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#144D32] bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200/80">
                    {partner.country}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    Depuis {partner.sinceYear}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#144D32] transition-colors">
                  {partner.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {partner.description}
                </p>

                {/* Focus Domains */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200/80 space-y-1 text-xs">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Domaines d'action :</div>
                  <div className="font-semibold text-slate-800 text-[11px] line-clamp-1">
                    {partner.focusDomains.join(' • ')}
                  </div>
                </div>

                {/* Main executed project highlight if available */}
                {partner.projectsExecuted && partner.projectsExecuted.length > 0 && (
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-1 text-xs">
                    <div className="text-[#144D32] text-[10px] uppercase font-bold flex items-center gap-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#F5C84F]" />
                      <span>Projet / Action menée :</span>
                    </div>
                    <p className="font-medium text-slate-800 text-[11px] line-clamp-2">
                      {partner.projectsExecuted[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-200/60">
                <button
                  onClick={() => {
                    setCurrentView('partners');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-white hover:bg-[#144D32] hover:text-white text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Consulter le profil complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#144D32]/5 rounded-3xl border border-[#144D32]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#F5C84F]" />
              <span>Vous représentez une institution, une ONG ou un bailleur de fonds ?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Co-construisons des programmes durables en faveur de la SDSR, de la prévention des VBG et de l'autonomisation des jeunes au Bénin.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('partners');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#144D32] hover:bg-[#0d3623] text-white font-bold text-xs rounded-xl transition-all uppercase tracking-wider shrink-0 cursor-pointer shadow-md"
          >
            Proposer un Partenariat
          </button>
        </div>
      </div>
    </section>
  );
};

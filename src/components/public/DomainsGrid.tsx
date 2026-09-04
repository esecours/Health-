import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { 
  HeartPulse, 
  Scale, 
  ShieldAlert, 
  Sparkles, 
  Users, 
  Award, 
  Leaf, 
  Handshake, 
  Home,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const DomainsGrid: React.FC = () => {
  const { setCurrentView } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Scale': return <Scale className="w-6 h-6 text-indigo-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-600" />;
      case 'Users': return <Users className="w-6 h-6 text-purple-600" />;
      case 'Award': return <Award className="w-6 h-6 text-blue-600" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-emerald-600" />;
      case 'Handshake': return <Handshake className="w-6 h-6 text-teal-600" />;
      case 'Home': return <Home className="w-6 h-6 text-cyan-600" />;
      default: return <Sparkles className="w-6 h-6 text-rose-600" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Nos Piliers Stratégiques
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              9 Domaines d'Intervention pour Transformer les Vies
            </h2>
            <p className="text-xs sm:text-base text-slate-600">
              Une approche féministe, inclusive et holistique pour répondre aux besoins concrets 
              des populations du Bénin, en particulier les adolescentes, les jeunes et les femmes.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-slate-700 hover:text-teal-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-slate-700 hover:text-teal-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {NGO_INFO.domains.map((domain, index) => (
            <div
              key={domain.id}
              className="snap-start shrink-0 w-[280px] sm:w-[350px] bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-teal-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getDomainIcon(domain.icon)}
                  </div>
                  <span className="text-xs font-black text-slate-300 group-hover:text-teal-600 transition-colors font-display">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                  {domain.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-4">
                  {domain.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">
                  Cible : <strong className="text-slate-800">{domain.target}</strong>
                </span>
                <button
                  onClick={() => {
                    setCurrentView('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-teal-600 font-bold hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Projets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

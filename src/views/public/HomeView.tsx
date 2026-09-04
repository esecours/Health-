import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from '../../components/public/HeroSection';
import { AboutMissionSection } from '../../components/public/AboutMissionSection';
import { StatsCounter } from '../../components/public/StatsCounter';
import { DomainsGrid } from '../../components/public/DomainsGrid';
import { HomeActivitiesShowcase } from '../../components/public/HomeActivitiesShowcase';
import { BeninMapSection } from '../../components/public/BeninMapSection';
import { PartnersSection } from '../../components/public/PartnersSection';
import { ImpactSimulator } from '../../components/public/ImpactSimulator';
import { VoicesOfChange } from '../../components/public/VoicesOfChange';
import { PartnersCarousel } from '../../components/public/PartnersCarousel';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FolderGit2
} from 'lucide-react';

interface HomeViewProps {
  onOpenPaymentModal: (amount?: number) => void;
  onOpenRoleSwitcher: () => void;
  onOpenSpotlight?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onOpenPaymentModal, 
  onOpenRoleSwitcher,
  onOpenSpotlight 
}) => {
  const { 
    projects = [], 
    activities = [], 
    news = [], 
    setCurrentView, 
    setSelectedProjectId, 
    setSelectedActivityId, 
    setSelectedArticleId 
  } = useApp();

  const projectsScrollRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      projectsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const recentActivities = (activities || []).slice(0, 3);
  const featuredNews = (news || []).slice(0, 3);

  return (
    <div className="space-y-0 bg-white">
      {/* 1. Split Hero Section (Forest Green Left + Warm Orange Right with 3 Beneficiary Cards & Partner Bar) */}
      <HeroSection 
        onOpenPaymentModal={() => onOpenPaymentModal(15000)} 
        onOpenSpotlight={onOpenSpotlight}
      />

      {/* 2. About & Mission Section with Overlapping Collage & Dual Metric Pill */}
      <AboutMissionSection onOpenPaymentModal={onOpenPaymentModal} />

      {/* Activités Publiées du Tableau de Bord (En haut de la section "Nos Piliers Stratégiques") */}
      <HomeActivitiesShowcase />

      {/* 3. 9 Strategic Domains of Intervention ("Nos Piliers Stratégiques") - Carousel */}
      <DomainsGrid />

      {/* 4. Featured Strategic Projects - Carousel */}
      <section className="py-12 sm:py-20 bg-[#FCFBF7] border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#E86A24] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Actions Concrètes & Résultats
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mt-2">
                Nos Projets Stratégiques en Cours
              </h2>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => {
                  setCurrentView('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#144D32] font-black hover:text-[#0d3623] text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Voir tous ({projects.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollProjects('left')}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 hover:border-[#144D32] hover:bg-emerald-50 text-slate-700 hover:text-[#144D32] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollProjects('right')}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 hover:border-[#144D32] hover:bg-emerald-50 text-slate-700 hover:text-[#144D32] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="py-12 px-6 text-center bg-white rounded-3xl border border-slate-200/90 space-y-2">
              <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Aucun projet publié pour le moment</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Les projets stratégiques et fiches d'impact officielles de HEALTHDEV ONG seront ajoutés très prochainement.
              </p>
            </div>
          ) : (
            <div
              ref={projectsScrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="snap-start shrink-0 w-[285px] sm:w-[370px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[#144D32] hover:shadow-xl transition-all flex flex-col justify-between group p-5 sm:p-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="px-2.5 py-1 bg-teal-50 text-teal-800 text-[10px] font-extrabold rounded-lg uppercase tracking-wider border border-teal-200">
                        {project.domain}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#E86A24]" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#144D32] transition-colors line-clamp-2 pt-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 space-y-4">
                    {/* Progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Avancement terrain</span>
                        <span className="text-[#144D32] font-black">{project.progressPercentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#144D32] rounded-full transition-all duration-500"
                          style={{ width: `${project.progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                        <span>Bénéficiaires atteints :</span>
                        <strong className="text-slate-800 font-bold">
                          {project.actualBeneficiaries.toLocaleString()} / {project.targetBeneficiaries.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setCurrentView('projects');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 bg-slate-50 hover:bg-[#144D32] hover:text-white text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Fiche complète du projet</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Benin Map & Territorial Hotspots */}
      <BeninMapSection />

      {/* 8. Featured Institutional & Technical Partners */}
      <PartnersSection />

      {/* 9. Latest News & Publications */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E86A24] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Communication & Plaidoyer
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mt-2">
                Actualités & Voix du Changement
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentView('news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#144D32] font-black hover:text-[#0d3623] text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Toutes les publications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNews.length === 0 ? (
              <div className="col-span-full py-12 px-6 text-center bg-[#FCFBF7] rounded-3xl border border-slate-200 space-y-2">
                <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">Aucune actualité publiée pour le moment</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Les communiqués officiels, articles de presse et récits de plaidoyer seront publiés ici.
                </p>
              </div>
            ) : (
              featuredNews.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    setSelectedArticleId(art.id);
                    setCurrentView('news');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#FCFBF7] rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-[#144D32] text-white text-[10px] font-extrabold rounded-lg uppercase shadow-md">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="text-xs text-slate-400 font-medium">
                        {art.date} • Par {art.author}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#144D32] transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-1 text-xs font-bold text-[#E86A24] group-hover:text-[#c45314]">
                    <span>Lire l'article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="mt-16">
          <PartnersCarousel />
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="py-20 bg-[#144D32] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E86A24]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6 relative z-10">
          <span className="inline-block px-3.5 py-1 bg-white/10 text-emerald-200 font-extrabold text-xs uppercase tracking-widest rounded-full border border-white/20">
            Rejoignez le Mouvement Féministe au Bénin
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
            Prêt(e) à faire la différence pour les jeunes et les femmes ?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Que vous soyez jeune volontaire, professionnel(le), partenaire technique ou bailleur, 
            votre engagement à nos côtés permet de sauver des vies, de prévenir les violences et 
            de bâtir une société équitable.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentView('volunteer-register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-4 bg-white hover:bg-emerald-50 text-[#144D32] font-black text-sm rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Users className="w-4 h-4 text-[#E86A24]" />
              <span>Devenir Bénévole</span>
            </button>

            <button
              onClick={() => onOpenPaymentModal(25000)}
              className="px-6 py-4 bg-[#E86A24] hover:bg-[#d45c1a] text-white font-black text-sm rounded-xl shadow-xl shadow-[#E86A24]/40 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Faire un Don Sécurisé</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('partners');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-4 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 border border-emerald-700 font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Devenir Partenaire</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

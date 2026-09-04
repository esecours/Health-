import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Users,
  Target, 
  Award, 
  Megaphone
} from 'lucide-react';

interface AboutMissionSectionProps {
  onOpenPaymentModal?: (amount?: number) => void;
}

export const AboutMissionSection: React.FC<AboutMissionSectionProps> = ({ onOpenPaymentModal }) => {
  const { 
    currentUser, 
    setCurrentView, 
    users, 
    projects, 
    announcements = []
  } = useApp();

  const publicAnnouncements = announcements.filter(a => a.isActive && (a.targetAudience === 'public' || a.targetAudience === 'all'));

  return (
    <section id="about-mission-section" className="py-20 sm:py-28 bg-[#FCFBF7] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Active Public Announcements (if created in Dashboard) */}
        {publicAnnouncements.length > 0 && (
          <div className="space-y-4">
            {publicAnnouncements.map(ann => (
              <div key={ann.id} className="bg-gradient-to-r from-[#144D32] to-[#1e6b47] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-emerald-600/40 relative overflow-hidden flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                {ann.imageUrl && (
                  <div className="w-full md:w-56 h-44 sm:h-52 md:h-40 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 border-white/20 shadow-md bg-slate-900">
                    <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="grow space-y-2 relative z-10 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] sm:text-xs font-bold text-emerald-200">
                    <Megaphone className="w-3.5 h-3.5 text-[#F5C84F] shrink-0" />
                    <span className="truncate">
                      {ann.targetAudience === 'public' ? 'Communiqué Officiel • Grand Public' : 'Communiqué • Bénévoles & Public'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-black font-display text-white break-words leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed break-words">
                    {ann.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Collage Frames matching Reference Image */}
          <div className="lg:col-span-6 relative mb-10 lg:mb-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background decorative square badge */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F5C84F]/20 rounded-3xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#144D32]/10 rounded-3xl -z-10"></div>

              {/* Main Primary Image (Top Left) */}
              <div className="relative z-10 w-4/5 rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-slate-100 aspect-4/5">
                <img
                  src="/Ban1.jpg"
                  alt="Équipe, membres et bénévoles de HEALTHDEV ONG"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/75 backdrop-blur-md text-white p-3 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5C84F]"></span>
                    <span className="text-xs font-bold font-display">Jeunesse & Mobilisation</span>
                  </div>
                  <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">
                    Leadership féministe & engagement communautaire à Parakou
                  </p>
                </div>
              </div>

              {/* Overlapping Secondary Image (Bottom Right) */}
              <div className="absolute -bottom-8 -right-2 sm:-right-4 w-3/5 rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-slate-200 aspect-square z-20">
                <img
                  src="/Ban2.jpg"
                  alt="Mains de solidarité et engagement communautaire"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#144D32] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-md">
                  Solidarité
                </div>
              </div>

              {/* Overlapping Mini Image (Top Right) */}
              <div className="absolute top-12 -right-4 sm:-right-6 w-2/5 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 aspect-4/3 z-15 hidden sm:block">
                <img
                  src="/Ban1.jpg"
                  alt="Activistes de HEALTHDEV ONG"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Mission Narrative, Dual Green Metric Bar & Orange CTA */}
          <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
            {/* Gold Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C84F]"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8A5C05] bg-[#FEF8E7] px-3 py-1 rounded-full border border-[#F5C84F]/50 font-display">
                À Propos de HEALTHDEV ONG
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.2] font-display">
              « Si nous faisons progresser l'humanité, la santé et les droits, chaque personne retrouve goût à la vie. »
            </h2>

            {/* Narrative text */}
            <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Fondée à <strong>Parakou (Bénin)</strong> par de jeunes leaders féministes et de santé communautaire, 
                <strong> HEALTHDEV ONG</strong> transforme durablement les conditions de vie des adolescentes, 
                des jeunes et des femmes vulnérables à travers le pays.
              </p>
              <p className="text-sm text-slate-500">
                Nous intervenons sur la santé et les droits sexuels et reproductifs (SDSR), la lutte sans concession 
                contre les violences basées sur le genre (VBG), la justice climatique, l'autonomie financière 
                et la consolidation de la paix.
              </p>
            </div>

            {/* Key Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#144D32] shrink-0" />
                <span>Ancrage communautaire dans 9+ pôles</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#144D32] shrink-0" />
                <span>Partenariat UNFPA, IPPF, GFW</span>
              </div>
            </div>

            {/* Dual Forest-Green Metric Banner matching the Reference Design */}
            <div className="bg-[#144D32] text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#195c3c] grid grid-cols-2 gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="border-r border-emerald-600/50 pr-4">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200">
                  Bénéficiaires Touchés
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display mt-1 tracking-tight">
                  8 440+
                </div>
                <div className="text-[10px] text-emerald-300 font-medium mt-0.5">
                  Dont 78% jeunes femmes
                </div>
              </div>

              <div className="pl-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200">
                  Objectif National 2026
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#F5C84F] font-display mt-1 tracking-tight">
                  15 000+
                </div>
                <div className="text-[10px] text-emerald-300 font-medium mt-0.5">
                  Adolescentes & jeunes ciblés
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#144D32] hover:bg-[#0d3623] text-white font-black text-sm rounded-xl shadow-lg shadow-[#144D32]/25 hover:shadow-[#144D32]/40 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Découvrir notre histoire & équipe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (onOpenPaymentModal) onOpenPaymentModal(15000);
                }}
                className="px-5 py-3.5 bg-[#FEF8E7] hover:bg-[#FDF6E2] text-[#8A5C05] border-2 border-[#F5C84F] font-bold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Heart className="w-4 h-4 fill-[#F5C84F] text-[#F5C84F]" />
                <span>Soutenir nos actions</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

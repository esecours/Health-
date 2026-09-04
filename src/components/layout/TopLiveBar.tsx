import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { Announcement } from '../../types';
import { 
  ShieldCheck, 
  Globe2,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  X,
  Calendar,
  Edit,
  Globe,
  Users
} from 'lucide-react';

interface TopLiveBarProps {
  onOpenSpotlight?: () => void;
  onOpenPaymentModal?: () => void;
}

export const TopLiveBar: React.FC<TopLiveBarProps> = () => {
  const { 
    announcements = [], 
    currentUser, 
    setCurrentView,
    setActiveDashboardTab 
  } = useApp();

  // Filter communiqués created in the dashboard's "Communiqués" space
  const activeAnnouncements = announcements.filter((item) => {
    if (item.isActive === false) return false;
    if (currentUser?.role === 'volunteer') {
      return item.targetAudience === 'public' || item.targetAudience === 'all' || item.targetAudience === 'volunteers';
    }
    return item.targetAudience === 'public' || item.targetAudience === 'all';
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Auto-rotation every 5 seconds if multiple communiqués and not hovered
  useEffect(() => {
    if (activeAnnouncements.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeAnnouncements.length, isPaused]);

  const safeIndex = activeAnnouncements.length > 0 ? currentIndex % activeAnnouncements.length : 0;
  const currentCommunique = activeAnnouncements[safeIndex];

  const canManage = currentUser?.role === 'admin' || currentUser?.role === 'super_admin' || currentUser?.role === 'coordinator';

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeAnnouncements.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeAnnouncements.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length);
  };

  const handleGoToDashboardAnnouncements = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (setActiveDashboardTab) {
      setActiveDashboardTab('announcements');
    }
    setCurrentView('dashboard');
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'public':
        return { label: 'Grand Public', icon: Globe, color: 'text-emerald-300 bg-emerald-950/60 border-emerald-800' };
      case 'volunteers':
        return { label: 'Bénévoles', icon: Users, color: 'text-teal-300 bg-teal-950/60 border-teal-800' };
      case 'all':
      default:
        return { label: 'Public & Bénévoles', icon: Megaphone, color: 'text-purple-300 bg-purple-950/60 border-purple-800' };
    }
  };

  return (
    <>
      <div className="bg-slate-900 text-white text-xs border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-4">
          
          {/* Left: Dynamic Communiqués sent from Dashboard (Espace Communiqués) */}
          <div 
            className="flex items-center gap-3 overflow-hidden text-[11px] sm:text-xs flex-1 min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Live Indicator Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-extrabold shrink-0 border border-teal-500/30 uppercase tracking-wider text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Megaphone className="w-3 h-3 text-teal-300" />
              <span>COMMUNIQUÉ</span>
            </div>

            {/* Active Communique Text Display */}
            {currentCommunique ? (
              <div
                onClick={() => setSelectedAnnouncement(currentCommunique)}
                className="flex items-center gap-2 truncate text-slate-200 hover:text-white cursor-pointer group transition-all min-w-0 flex-1"
                title="Cliquer pour lire le communiqué officiel complet"
              >
                <span className="font-extrabold text-teal-400 shrink-0 uppercase tracking-wide text-[10px]">
                  [OFFICIEL] :
                </span>
                <span className="truncate group-hover:underline font-bold text-white">
                  {currentCommunique.title}
                </span>
                {currentCommunique.content && (
                  <span className="hidden md:inline text-slate-300 truncate border-l border-slate-700 pl-2 font-normal">
                    {currentCommunique.content}
                  </span>
                )}
                <ArrowUpRight className="w-3.5 h-3.5 text-teal-400 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            ) : (
              <div className="truncate text-slate-400 italic flex items-center gap-2">
                <span>Aucun communiqué officiel en cours de diffusion.</span>
              </div>
            )}

            {/* Controls (if multiple communiqués) + Direct shortcut for managers */}
            <div className="flex items-center gap-1 shrink-0 text-slate-400 border-l border-slate-800 pl-2">
              {activeAnnouncements.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                    title="Communiqué précédent"
                    aria-label="Communiqué précédent"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 px-0.5">
                    {safeIndex + 1}/{activeAnnouncements.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                    title="Communiqué suivant"
                    aria-label="Communiqué suivant"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {canManage && (
                <button
                  onClick={handleGoToDashboardAnnouncements}
                  className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-[10px] font-medium transition-colors cursor-pointer"
                  title="Accéder à l'espace Communiqués du tableau de bord"
                >
                  <Edit className="w-3 h-3" />
                  <span>Espace Communiqués</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Registration Tag & Region */}
          <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Enreg. MISP : <strong>{NGO_INFO.registrationNumber}</strong></span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 border-l border-slate-800 pl-4">
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-300">Bénin (BJ) • FCFA (XOF)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Communiqué Modal */}
      {selectedAnnouncement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div 
            className="bg-white text-slate-800 rounded-2xl sm:rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#144D32] flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    COMMUNIQUÉ OFFICIEL
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Direction Exécutive HEALTHDEV ONG
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAnnouncement(null)} 
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {(() => {
                  const info = getAudienceLabel(selectedAnnouncement.targetAudience);
                  const IconComp = info.icon;
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      <IconComp className="w-3 h-3" />
                      <span>{info.label}</span>
                    </span>
                  );
                })()}

                <span className="inline-flex items-center gap-1 text-slate-400 text-xs ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Publié le {selectedAnnouncement.startDate || selectedAnnouncement.createdAt?.split('T')[0]}</span>
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display leading-snug">
                {selectedAnnouncement.title}
              </h2>

              {selectedAnnouncement.imageUrl && (
                <div className="relative aspect-video sm:aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src={selectedAnnouncement.imageUrl} 
                    alt={selectedAnnouncement.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                {selectedAnnouncement.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              {canManage ? (
                <button
                  onClick={() => {
                    setSelectedAnnouncement(null);
                    handleGoToDashboardAnnouncements();
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Gérer dans le tableau de bord</span>
                </button>
              ) : <div />}

              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-[#144D32] hover:bg-[#0d3623] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

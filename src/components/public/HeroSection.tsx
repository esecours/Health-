import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { 
  ArrowRight, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  CheckCircle2,
  Award,
  Globe2,
  FolderGit2,
  Activity,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Flame,
  ImageIcon
} from 'lucide-react';

interface HeroSectionProps {
  onOpenPaymentModal: () => void;
  onOpenSpotlight?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPaymentModal, onOpenSpotlight }) => {
  const { setCurrentView, users, projects } = useApp();

  const banners = [
    {
      src: '/hero_benin_activists.jpg',
      alt: 'Activistes et bénévoles de HEALTHDEV ONG réunis à Parakou au Bénin',
      label: 'Bannière Principale'
    },
    {
      src: '/Ban1.jpg',
      alt: 'Équipe, membres et bénévoles de HEALTHDEV ONG',
      label: 'Bannière 1 • Équipe'
    },
    {
      src: '/Ban2.jpg',
      alt: 'Solidarité et actions communautaires HEALTHDEV ONG',
      label: 'Bannière 2 • Solidarité'
    }
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Gentle auto-rotation between background banners
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Container with Visible Background Image */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="bg-[#144D32] text-white px-4 py-12 sm:p-14 lg:p-20 flex flex-col items-center text-center justify-center relative min-h-[480px] sm:min-h-[540px] overflow-hidden"
      >
        {/* Background Images with Cross-Fade Transition */}
        <div className="absolute inset-0 z-0">
          {banners.map((banner, index) => (
            <img
              key={banner.src}
              src={banner.src}
              alt={banner.alt}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === currentBannerIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              referrerPolicy="no-referrer"
            />
          ))}

          {/* Balanced gradient overlay: preserves rich photo clarity while guaranteeing high contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2A1C]/75 via-[#144D32]/60 to-[#0B2A1C]/85"></div>
        </div>

        {/* Subtle luminous accent */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none z-1"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none z-1"></div>

        <div className="relative z-10 max-w-3xl space-y-6 mx-auto">
          {/* Main Headline */}
          <h1 id="hero-headline" className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] font-display drop-shadow-md">
            Organisation féministe de jeunes engagée pour la{' '}
            <span className="text-[#F5C84F]">santé</span>, les{' '}
            <span className="text-[#F5C84F]">droits humains</span>, l'égalité des sexes, l'autonomisation des femmes et le bien-être durable des communautés en République du Bénin.
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setCurrentView('volunteer-register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#F5C84F] hover:bg-[#E5B537] text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-[#F5C84F]/30 hover:shadow-[#F5C84F]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider"
            >
              <Users className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Devenir Bénévole</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-white/15 hover:bg-white/25 text-white border border-white/25 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs shadow-lg"
            >
              <span>Découvrir nos projets</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Carousel Switcher Controls (Bottom Bar) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          <button
            onClick={() => setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)}
            aria-label="Image d'arrière-plan précédente"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1.5 px-1">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBannerIndex(idx)}
                aria-label={`Afficher l'image d'arrière-plan ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === currentBannerIndex 
                    ? 'w-5 h-2 bg-[#F5C84F]' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % banners.length)}
            aria-label="Image d'arrière-plan suivante"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

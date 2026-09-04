import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0B1E15] text-slate-300 border-t border-emerald-900/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1 & 2: NGO Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-2xl bg-[#144D32] text-white flex items-center justify-center shadow-lg shadow-black/40 border border-emerald-500/30 relative overflow-hidden shrink-0">
                <img src="/logo1.jpg" alt="HEALTHDEV ONG" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-display">
                  HEALTH<span className="text-[#F5C84F]">DEV</span> ONG
                </span>
                <p className="text-xs text-emerald-300 font-semibold tracking-wide">
                  HEALTH AND DEVELOPMENT ONG
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/70 leading-relaxed max-w-md">
              Organisation féministe de jeunes engagée pour la santé, les droits humains, 
              l'égalité des sexes, l'autonomisation des femmes et le bien-être durable des 
              communautés en République du Bénin.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5C84F] shrink-0 mt-0.5" />
                <span>{NGO_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5C84F] shrink-0" />
                <a href={`tel:${NGO_INFO.phoneClean}`} className="hover:text-white transition-colors">
                  {NGO_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5C84F] shrink-0" />
                <a href={`mailto:${NGO_INFO.email}`} className="hover:text-white transition-colors">
                  {NGO_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href={NGO_INFO.socialLinks.facebook} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#42A274] hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-white/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={NGO_INFO.socialLinks.twitter} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#42A274] hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-white/10"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={NGO_INFO.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#42A274] hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={NGO_INFO.socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#42A274] hover:text-white flex items-center justify-center text-slate-400 transition-colors border border-white/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C84F]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-emerald-300 transition-colors">
                  Notre Histoire & Vision
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('domains')} className="hover:text-emerald-300 transition-colors">
                  9 Domaines d'Action
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('projects')} className="hover:text-emerald-300 transition-colors">
                  Nos Projets en cours
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('activities')} className="hover:text-emerald-300 transition-colors">
                  Activités Terrain & Agenda
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('impact')} className="hover:text-emerald-300 transition-colors">
                  Indicateurs & Résultats
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('opportunities')} className="hover:text-emerald-300 transition-colors">
                  Opportunités de Financement
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Engagement & Portails */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5C84F]">
              Portails & Engagement
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('volunteer-register')} className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-[#F5C84F] font-semibold">
                  <span>Devenir Bénévole</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('partners')} className="hover:text-emerald-300 transition-colors">
                  Espace Partenaires & PTF
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('resources')} className="hover:text-emerald-300 transition-colors">
                  Centre Documentaire
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('news')} className="hover:text-emerald-300 transition-colors">
                  Actualités & Communiqués
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-emerald-300 transition-colors">
                  Portail ERP Membres
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-emerald-300 transition-colors">
                  Contact & Localisation
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <div>
            © {new Date().getFullYear()} HEALTHDEV ONG (HEALTH AND DEVELOPMENT ONG). Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>Enreg. MISP : {NGO_INFO.registrationNumber}</span>
            <span>•</span>
            <span>IFU : {NGO_INFO.ifu}</span>
            <span>•</span>
            <button onClick={() => setCurrentView('resources')} className="hover:text-white transition-colors">
              Statuts & Règlements
            </button>
            <span>•</span>
            <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors">
              Charte Éthique & Genre
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

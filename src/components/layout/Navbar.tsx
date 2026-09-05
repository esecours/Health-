import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { NotificationsCenter } from '../common/NotificationsCenter';
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  LayoutDashboard, 
  LogOut,
  Shield,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Globe,
  Bell,
  Award
} from 'lucide-react';

interface NavbarProps {
  onOpenPaymentModal: () => void;
  onOpenSpotlight?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenPaymentModal,
  onOpenSpotlight
}) => {
  const { currentUser, currentView, setCurrentView, logout, setActiveDashboardTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'domains', label: 'Domaines' },
    { id: 'projects', label: 'Projets' },
    { id: 'activities', label: 'Activités' },
    { id: 'impact', label: 'Impact & Résultats' },
    { id: 'opportunities', label: 'Opportunités' },
    { id: 'volunteer-register', label: 'Devenir bénévole' },
    { id: 'partners', label: 'Partenaires' },
    { id: 'news', label: 'Actualités' },
    { id: 'resources', label: 'Ressources' },
    { id: 'contact', label: 'Contact' },
    { id: 'login', label: 'Connexion' }
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin (Dir. Exécutive)';
      case 'admin': return 'Admin RH & Juridique';
      case 'program_manager': return 'Resp. Programmes';
      case 'financial_manager': return 'Resp. Financier';
      case 'comm_manager': return 'Resp. Communication';
      case 'me_manager': return 'Resp. Suivi-Éval';
      case 'partner': return 'Partenaire PTF';
      case 'volunteer': return 'Bénévole';
      default: return 'Visiteur';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand matching Green & Orange theme */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#144D32] text-white flex items-center justify-center shadow-md shadow-[#144D32]/20 group-hover:scale-105 transition-transform font-display font-black text-lg tracking-tight relative overflow-hidden shrink-0 border border-slate-200">
              <img src="/logo1.jpg" alt="HEALTHDEV ONG" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-slate-900 tracking-tight font-display">
                  HEALTH<span className="text-[#144D32]">DEV</span>
                </span>
                <span className="text-[10px] font-extrabold text-[#8A5C05] bg-[#FEF8E7] border border-[#F5C84F]/60 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  ONG
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight line-clamp-1">
                Santé • Droits • Égalité des sexes • Parakou, Bénin
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold text-slate-700">
            {navLinks.filter(l => l.id !== 'login').slice(0, 5).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  currentView === link.id
                    ? 'bg-[#144D32]/10 text-[#144D32] font-black'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dropdown for extra links */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-xl hover:bg-slate-100 flex items-center gap-1 cursor-pointer text-slate-700">
                <span>Explorer Plus</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {navLinks.filter(l => l.id !== 'login').slice(5).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      currentView === link.id
                        ? 'bg-[#144D32]/10 text-[#144D32] font-bold'
                        : 'hover:bg-slate-100 hover:text-slate-900 text-slate-700'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Principal - Page Connexion */}
            <button
              id="main-nav-connexion-link"
              onClick={() => handleNavClick('login')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'login'
                  ? 'bg-[#144D32]/10 text-[#144D32] font-black'
                  : 'hover:bg-slate-100 hover:text-slate-900 text-slate-700'
              }`}
            >
              <span>Connexion</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* VBG Signalement Button */}
            <button
              onClick={() => handleNavClick('vbg')}
              className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-rose-900/20 hover:scale-[1.02] cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-200 animate-pulse" />
              <span>Dénonciation VBG</span>
            </button>

            {/* Notifications Center Bell - Uniquement si connecté */}
            {currentUser && <NotificationsCenter />}

            {/* User Account / ERP Portal Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 bg-slate-100 hover:bg-slate-200/80 rounded-2xl transition-all border border-slate-200 cursor-pointer"
                  >
                    <img
                      src={currentUser.avatarUrl || '/default_avatar.jpg'}
                      alt={currentUser.firstName}
                      className="w-8 h-8 rounded-xl object-cover"
                    />
                    <div className="text-left leading-tight hidden md:block">
                      <span className="text-xs font-bold text-slate-900 block truncate max-w-[110px]">
                        {currentUser.firstName}
                      </span>
                      <span className="text-[10px] text-[#144D32] font-semibold block truncate max-w-[110px]">
                        {currentUser.role === 'volunteer' ? 'Bénévole' : 'ERP Membre'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="p-3 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                        <div className="font-bold text-slate-900 text-sm">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-xs text-[#144D32] font-semibold mt-0.5">
                          {getRoleLabel(currentUser.role)}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {currentUser.email}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-teal-700" />
                        <span>Mon Tableau de Bord</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('notifications');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-teal-600" />
                        <span>Centre de Notifications</span>
                      </button>

                      <div className="my-1 border-t border-slate-100"></div>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bouton direct Déconnexion rapide visible en permanence */}
                <button
                  onClick={() => logout()}
                  className="px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Se déconnecter de la session (démo ou normale)"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden xl:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <button
                id="navbar-connexion-btn"
                onClick={() => handleNavClick('login')}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <User className="w-3.5 h-3.5 text-[#F5C84F]" />
                <span>Connexion</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            {currentUser && <NotificationsCenter />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 sm:px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`p-3 min-h-[44px] rounded-xl text-left transition-all cursor-pointer flex items-center ${
                  currentView === link.id
                    ? 'bg-[#144D32] text-white font-bold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-100'
                }`}
              >
                <span className="line-clamp-1">{link.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {/* Bouton Connexion / Profil utilisateur placé EN HAUT pour une visibilité maximale */}
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={currentUser.avatarUrl || '/default_avatar.jpg'}
                      alt={currentUser.firstName}
                      className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-300"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                      <div className="text-[10px] text-teal-700 font-semibold truncate">
                        {currentUser.role === 'volunteer' ? 'Bénévole' : 'Membre ERP'} • {currentUser.email}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleNavClick('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#144D32] hover:bg-[#0f3b26] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Mon Tableau de Bord</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <button
                id="mobile-connexion-btn"
                onClick={() => {
                  handleNavClick('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md border border-slate-700 transition-all"
              >
                <User className="w-4 h-4 text-[#F5C84F]" />
                <span>Connexion</span>
              </button>
            )}

            {/* Bouton Dénonciation VBG placé en dessous de Connexion */}
            <button
              onClick={() => handleNavClick('vbg')}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <ShieldAlert className="w-4 h-4 text-rose-200 animate-pulse" />
              <span>Dénonciation VBG (Anonyme & Sécurisée)</span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setCurrentView('notifications');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Bell className="w-4 h-4 text-teal-600" />
                <span>Centre de Notifications</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

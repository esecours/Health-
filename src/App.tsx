import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { TopLiveBar } from './components/layout/TopLiveBar';
import { Footer } from './components/layout/Footer';
import { PaymentModal } from './components/common/PaymentModal';
import { SpotlightModal } from './components/common/SpotlightModal';
import { AlertCircle } from 'lucide-react';

// Public Views
import { HomeView } from './views/public/HomeView';
import { AboutView } from './views/public/AboutView';
import { DomainsGrid } from './components/public/DomainsGrid';
import { ProjectsView } from './views/public/ProjectsView';
import { ActivitiesView } from './views/public/ActivitiesView';
import { ImpactView } from './views/public/ImpactView';
import { OpportunitiesView } from './views/public/OpportunitiesView';
import { VolunteerRegisterView } from './views/public/VolunteerRegisterView';
import { PartnersView } from './views/public/PartnersView';
import { NewsView } from './views/public/NewsView';
import { ResourcesView } from './views/public/ResourcesView';
import { ContactView } from './views/public/ContactView';
import { LoginView } from './views/public/LoginView';
import { NotificationsView } from './views/public/NotificationsView';
import { VbgReportView } from './views/public/VbgReportView';

// Private Views
import { DashboardView } from './views/private/DashboardView';

const MainAppContent: React.FC = () => {
  const { currentView, isMaintenanceMode, currentUser, setCurrentView } = useApp();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [activePaymentAmount, setActivePaymentAmount] = useState<number>(15000);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Listen to path or hash containing "democonnexion", "connexion" or "faire-un-don" to route accordingly
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (
        path === '/democonnexion' || 
        path.endsWith('/democonnexion') || 
        hash === '#democonnexion' || 
        hash.includes('democonnexion')
      ) {
        setCurrentView('democonnexion');
      } else if (
        path === '/connexion' || 
        path.endsWith('/connexion') || 
        path === '/login' ||
        path.endsWith('/login') ||
        hash === '#connexion' || 
        hash === '#login' ||
        hash.includes('login') ||
        hash.includes('connexion')
      ) {
        setCurrentView('login');
      } else if (
        path === '/faire-un-don' || 
        path.endsWith('/faire-un-don') || 
        path === '/don' ||
        path.endsWith('/don') ||
        hash === '#faire-un-don' || 
        hash === '#don' ||
        hash.includes('don')
      ) {
        setPaymentModalOpen(true);
      } else if (
        path === '/espace-erp' ||
        path.endsWith('/espace-erp') ||
        path === '/dashboard' ||
        path.endsWith('/dashboard') ||
        hash === '#espace-erp' ||
        hash === '#dashboard' ||
        hash.includes('dashboard') ||
        hash.includes('espace-erp')
      ) {
        setCurrentView('dashboard');
      }
    };
    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, [setCurrentView]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K for Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenPayment = (amount?: number) => {
    if (amount) {
      setActivePaymentAmount(amount);
    }
    setPaymentModalOpen(true);
  };

  if (isMaintenanceMode && currentUser?.role !== 'super_admin' && currentUser?.role !== 'admin' && currentView !== 'login') {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black font-display">Plateforme en Maintenance</h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              HEALTHDEV ONG procède actuellement à une maintenance programmée de sa plateforme. Nous serons de retour très prochainement.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => setCurrentView('login')}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-teal-600/20 cursor-pointer"
            >
              Connexion Administrateur
            </button>
          </div>
        </div>
      </div>
    );
  }


  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onOpenPaymentModal={handleOpenPayment}
            onOpenSpotlight={() => setSpotlightOpen(true)}
          />
        );
      case 'about':
        return <AboutView />;
      case 'domains':
        return (
          <div className="bg-slate-50 min-h-screen">
            <DomainsGrid />
          </div>
        );
      case 'projects':
        return <ProjectsView />;
      case 'activities':
        return <ActivitiesView />;
      case 'impact':
        return <ImpactView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'volunteer-register':
        return <VolunteerRegisterView />;
      case 'partners':
        return <PartnersView />;
      case 'news':
        return <NewsView />;
      case 'resources':
        return <ResourcesView />;
      case 'contact':
        return <ContactView />;
      case 'login':
      case 'democonnexion':
        return <LoginView />;
      case 'notifications':
        return <NotificationsView />;
      case 'vbg':
      case 'vbg-report':
      case 'vbg-denonciation':
        return <VbgReportView />;
      case 'dashboard':
        return (
          <DashboardView
            onOpenPaymentModal={() => handleOpenPayment()}
            onOpenPaymentForContrib={(contrib) => handleOpenPayment(contrib.amount)}
          />
        );
      default:
        return (
          <HomeView
            onOpenPaymentModal={handleOpenPayment}
            onOpenSpotlight={() => setSpotlightOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white">
      {/* Top Dynamic Live Bar */}
      <TopLiveBar 
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onOpenPaymentModal={() => handleOpenPayment()}
      />

      {/* Top Main Navigation */}
      <Navbar
        onOpenPaymentModal={() => handleOpenPayment()}
        onOpenSpotlight={() => setSpotlightOpen(true)}
      />

      {/* Main View Display */}
      <main className="grow">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        contributionTitle="Soutien & Don Général • HEALTHDEV ONG"
        defaultAmount={activePaymentAmount}
      />

      <SpotlightModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenPaymentModal={() => handleOpenPayment()}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

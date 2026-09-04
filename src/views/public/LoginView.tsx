import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Users,
  Building,
  HeartHandshake
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, setCurrentView, users } = useApp();
  const [email, setEmail] = useState('rolland.gnangni@healthdev.ong');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      setCurrentView('dashboard');
    } else {
      setError('Identifiants incorrects. Veuillez sélectionner l\'un des comptes officiels ci-dessous.');
    }
  };

  const handleQuickLogin = (userEmail: string) => {
    login(userEmail, 'password123');
    setCurrentView('dashboard');
  };

  const demoAccounts = [
    {
      role: 'Directeur Exécutif',
      title: 'Rolland GNANGNI (DE)',
      email: 'rolland.gnangni@healthdev.ong',
      roleKey: 'super_admin',
      desc: 'Direction générale, gestion opérationnelle des programmes, administration globale.'
    },
    {
      role: 'Présidente CA',
      title: 'Régina AHO (Présidente du CA)',
      email: 'regina.aho@healthdev.ong',
      roleKey: 'admin',
      desc: 'Supervision de gouvernance, orientation stratégique et validation des instances.'
    },
    {
      role: 'Trésorier Général / RAF',
      title: 'C. Rodrigue HOUNKPATIN / Eliane AKLI',
      email: 'rodrigue.hounkpatin@healthdev.ong',
      roleKey: 'financial_manager',
      desc: 'Trésorerie, recouvrement des cotisations, validation Mobile Money & rapports financiers.'
    },
    {
      role: 'Contrôle Interne',
      title: 'Moïse AHISSOU (Commissaire aux Comptes)',
      email: 'moise.ahissou@healthdev.ong',
      roleKey: 'admin',
      desc: 'Audit interne, conformité statutaire et transparence des opérations.'
    },
    {
      role: 'Coord. Programmes',
      title: 'Néonelle P. HOUNGNISSI (CoP)',
      email: 'neonelle.houngnissi@healthdev.ong',
      roleKey: 'program_manager',
      desc: 'Coordination des projets PESCA, VBG, JIF et affectation des missions terrain.'
    },
    {
      role: 'Volontaire / Membre',
      title: 'Marcelline SOUNNOUKINNY (Bénévole)',
      email: 'marcelline.sounnoukinny@healthdev.ong',
      roleKey: 'volunteer',
      desc: 'Espace membre, participation aux activités, cotisations, badge officiel et attestations.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-teal-400 flex items-center justify-center font-display font-black text-2xl mx-auto shadow-md border border-slate-700">
            HD
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Portail ERP & Espace Membres
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Système Intégré de Gestion de HEALTHDEV ONG (Parakou, Bénin)
          </p>
        </div>

        {/* Login Form Box */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email professionnel ou adhérent</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@healthdev.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Se connecter à l'ERP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* 1-Click Demo Profile Switcher Section */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Connexion Rapide Démo • Rôles Préconfigurés
            </span>
            <h3 className="text-xl font-black text-slate-900 font-display">
              Testez la plateforme avec les 6 profils clés
            </h3>
            <p className="text-xs text-slate-500">
              Cliquez simplement sur un rôle pour vous connecter instantanément et explorer son tableau de bord spécifique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoAccounts.map((acc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickLogin(acc.email)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {acc.role}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-teal-700 transition-colors">
                    {acc.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {acc.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                  <span>Connexion 1-clic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

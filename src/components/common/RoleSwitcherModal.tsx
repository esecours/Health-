import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, UserCheck, Briefcase, DollarSign, Megaphone, BarChart3, Building2, HeartHandshake, X } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, switchUserRole, users } = useApp();

  if (!isOpen) return null;

  const rolesConfig: { role: UserRole; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      role: 'super_admin',
      title: 'Directeur Exécutif (Rolland GNANGNI)',
      desc: 'Direction opérationnelle, validation générale et accès intégral à tous les modules.',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      role: 'admin',
      title: 'Présidente du Conseil d\'Administration (Régina AHO)',
      desc: 'Supervision stratégique, gouvernance, orientation et accréditation des membres.',
      icon: <UserCheck className="w-5 h-5" />,
      color: 'bg-teal-100 text-teal-800 border-teal-200'
    },
    {
      role: 'secretary',
      title: 'Secrétaire Générale CA (Yasmine BAH-OURE)',
      desc: 'Gestion administrative, PV des réunions, registres statutaires et correspondances.',
      icon: <UserCheck className="w-5 h-5" />,
      color: 'bg-cyan-100 text-cyan-800 border-cyan-200'
    },
    {
      role: 'financial_manager',
      title: 'Trésorier Général / RAF (C. Rodrigue HOUNKPATIN / Eliane AKLI)',
      desc: 'Gestion des cotisations, trésorerie, validation MTN MoMo / Moov et rapports financiers.',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    {
      role: 'program_manager',
      title: 'Coordonnatrice des Programmes (Néonelle P. HOUNGNISSI)',
      desc: 'Pilotage des projets PESCA, JIF, VBG, affectation et suivi des activités terrain.',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      role: 'me_manager',
      title: 'Chargé Suivi-Évaluation (Amour BAKPE)',
      desc: 'Indicateurs M&E, cibles d\'impact, statistiques de terrain et rapports d\'évaluation.',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    },
    {
      role: 'comm_manager',
      title: 'Chargé de Communication (Flaviano GOMEZ)',
      desc: 'Actualités, médiathèque, campagnes de sensibilisation, newsletters et relations presse.',
      icon: <Megaphone className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
      role: 'partner',
      title: 'Partenaire Technique & Financier (ABPF / IPPF)',
      desc: 'Suivi transparent des projets conjoints, rapports d\'exécution et calendrier d\'impact.',
      icon: <Building2 className="w-5 h-5" />,
      color: 'bg-teal-100 text-teal-700 border-teal-200'
    },
    {
      role: 'volunteer',
      title: 'Bénévole / Membre Engagé (Marcelline SOUNNOUKINNY)',
      desc: 'Espace membre, participation aux activités, badge officiel, cotisations et attestations.',
      icon: <HeartHandshake className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#144D32] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Simulateur Multi-Rôles
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Changer de Rôle Utilisateur</h2>
            <p className="text-sm text-slate-500">
              Basculez instantanément pour tester les permissions et les interfaces selon chaque profil de HEALTHDEV ONG.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {rolesConfig.map((item) => {
            const userForRole = users.find(u => u.role === item.role);
            const isCurrent = currentUser?.role === item.role;

            return (
              <button
                key={item.role}
                onClick={() => {
                  switchUserRole(item.role);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                  isCurrent 
                    ? 'border-[#144D32] bg-emerald-50/50 shadow-xs ring-2 ring-[#144D32]/20' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
                    {isCurrent && (
                      <span className="text-xs font-bold text-[#144D32] bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        Actif
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  {userForRole && (
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Compte démo : {userForRole.firstName} {userForRole.lastName} ({userForRole.email})</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>HEALTHDEV ONG • Système d'authentification RBAC</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

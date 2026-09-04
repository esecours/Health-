import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, CheckCircle2, FolderGit2, MapPin, Building2, HeartHandshake } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const { users, projects, activities, zones } = useApp();

  const totalVolunteers = users.filter(u => u.role === 'volunteer').length + 86;
  const completedActivities = activities.filter(a => a.status === 'completed').length + 24;
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const communesCovered = zones.length + 3;
  const totalBeneficiaries = projects.reduce((acc, p) => acc + (p.actualBeneficiaries || 0), 0) + 7500;
  const womenImpactedPercentage = 78;

  const stats = [
    {
      label: 'Bénévoles & Membres',
      value: totalVolunteers,
      suffix: '+',
      desc: 'Jeunes volontaires mobilisés',
      icon: <Users className="w-5 h-5 text-teal-600" />,
      bg: 'bg-white border-slate-200'
    },
    {
      label: 'Activités Réalisées',
      value: completedActivities,
      suffix: '+',
      desc: 'Ateliers, cliniques & caravanes',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-white border-slate-200'
    },
    {
      label: 'Projets Stratégiques',
      value: activeProjects,
      suffix: '',
      desc: 'Programmes en cours d\'exécution',
      icon: <FolderGit2 className="w-5 h-5 text-blue-600" />,
      bg: 'bg-white border-slate-200'
    },
    {
      label: 'Communes Couvertes',
      value: communesCovered,
      suffix: '',
      desc: 'Borgou, Donga, Atacora, etc.',
      icon: <MapPin className="w-5 h-5 text-amber-600" />,
      bg: 'bg-white border-slate-200'
    },
    {
      label: 'Femmes & Jeunes Touchés',
      value: totalBeneficiaries,
      suffix: '+',
      desc: 'Bénéficiaires directs & indirects',
      icon: <HeartHandshake className="w-5 h-5 text-purple-600" />,
      bg: 'bg-white border-slate-200'
    },
    {
      label: 'Priorité Féministe',
      value: womenImpactedPercentage,
      suffix: '%',
      desc: 'De filles et femmes bénéficiaires',
      icon: <Building2 className="w-5 h-5 text-rose-600" />,
      bg: 'bg-white border-slate-200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-4 sm:p-5 rounded-2xl bg-white border ${stat.bg} shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                {stat.icon}
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                {stat.label}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

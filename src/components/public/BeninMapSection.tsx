import React from 'react';
import { MapPin, Target, Compass, Building, ShieldCheck, Quote } from 'lucide-react';

export const BeninMapSection: React.FC = () => {
  const departments = [
    {
      name: 'Borgou',
      region: 'Nord-Est',
      isHQ: true,
      communes: ['Parakou (Siège social)', 'N’Dali', 'Tchaourou', 'Nikki'],
      badge: '4 Communes actives'
    },
    {
      name: 'Alibori',
      region: 'Extrême-Nord',
      isHQ: false,
      communes: ['Kandi'],
      badge: '1 Commune active'
    },
    {
      name: 'Atacora',
      region: 'Nord-Ouest',
      isHQ: false,
      communes: ['Natitingou'],
      badge: '1 Commune active'
    },
    {
      name: 'Atlantique',
      region: 'Sud',
      isHQ: false,
      communes: ['Abomey-Calavi'],
      badge: '1 Commune active'
    },
    {
      name: 'Littoral',
      region: 'Sud',
      isHQ: false,
      communes: ['Cotonou'],
      badge: '1 Commune active'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>Ancrage Territorial au Bénin</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Zones d’intervention
            </h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-700 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>5 Départements Actifs sur le Terrain</span>
          </div>
        </div>

        {/* National Ambition Banner */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 border border-teal-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 shrink-0 mt-1 sm:mt-0">
                <Target className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                  Ambition Institutionnelle & National Coverage
                </span>
                <p className="text-base sm:text-xl font-bold text-white leading-snug">
                  L’organisation a pour ambition de couvrir tous les départements et communes du Bénin.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
              <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="block text-lg font-black text-emerald-400">12</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">Départements Visés</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="block text-lg font-black text-emerald-400">77</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">Communes Visées</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Cards Grid */}
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
            Déploiement Actuel par Département
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dep, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                  dep.isHQ
                    ? 'bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/50 border-teal-300 ring-2 ring-teal-500/10'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${dep.isHQ ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg tracking-tight font-display">
                          {dep.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-500">
                          Région {dep.region}
                        </span>
                      </div>
                    </div>

                    {dep.isHQ && (
                      <span className="px-2.5 py-1 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                        Siège Social
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Commune(s) couverte(s) :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dep.communes.map((commune, cIdx) => (
                        <span
                          key={cIdx}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                            commune.includes('Siège')
                              ? 'bg-teal-100 text-teal-900 border border-teal-200'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {commune}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-teal-700 font-bold">
                    <Building className="w-3.5 h-3.5" />
                    {dep.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Bénin</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verbatim Official Statement Card */}
        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-slate-200 text-slate-700 shrink-0 mt-0.5">
            <Quote className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
            « L’organisation a pour ambition de couvrir tous les départements et communes du Bénin. Cependant, actuellement, elle intervient dans les départements du Borgou (Parakou, N’Dali, Tchaourou, Nikki), de l’Alibori (Kandi) de l’Atacora (Natitingou) de l’Atlantique (Abomey-Calavi) et du Littoral (Cotonou) »
          </p>
        </div>
      </div>
    </section>
  );
};



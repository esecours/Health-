import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Printer, 
  Download, 
  Target,
  Award
} from 'lucide-react';

export const ImpactView: React.FC = () => {
  const { meIndicators = [], indicators = [], projects = [], zones = [] } = useApp();
  const indList = meIndicators && meIndicators.length > 0 ? meIndicators : (indicators || []);

  const demographicData = [
    { name: 'Adolescentes & Filles (10-24 ans)', value: 55, color: '#0d9488' },
    { name: 'Femmes adultes & mères', value: 25, color: '#14b8a6' },
    { name: 'Jeunes garçons & pairs', value: 15, color: '#3b82f6' },
    { name: 'Leaders & Dignitaires', value: 5, color: '#64748b' }
  ];

  const zoneImpactData = (zones || []).map(z => ({
    commune: z.commune,
    beneficiaires: z.beneficiariesReached,
    activites: z.completedActivitiesCount * 100
  }));

  const chartIndicators = indList.slice(0, 4).map(ind => ({
    name: ind.code,
    Cible: ind.targetValue,
    Atteint: ind.currentValue,
    full: ind.title
  }));

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Redevabilité & Transparence
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Résultats & Indicateurs d'Impact
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Système de Suivi-Évaluation (M&E) orienté résultats. Mesurez l'impact concret 
              de nos programmes sur les communautés vulnérables au Bénin.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le Bilan d'Impact</span>
            </button>
          </div>
        </div>

        {/* Global KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
              <span>Bénéficiaires Directs</span>
              <Users className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-display">
              15 350+
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+112% par rapport aux cibles initiales 2024</span>
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
              <span>Filles & Femmes Émancipées</span>
              <Sparkles className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-black text-teal-700 font-display">
              80.2%
            </div>
            <p className="text-[11px] text-slate-500">
              Priorité absolue du cadre féministe HEALTHDEV
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
              <span>Kits Dignité & Santé Distribués</span>
              <Award className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-display">
              2 850
            </div>
            <p className="text-[11px] text-slate-500">
              Dans les collèges ruraux du Borgou & Alibori
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
              <span>Cas VBG Pris en Charge</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-display">
              342
            </div>
            <p className="text-[11px] text-slate-500">
              Accompagnement psycho-médical & juridique
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Chart: Cibles vs Réalisations */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Performance des Indicateurs Stratégiques (Cibles vs Réalisations)
              </h3>
              <p className="text-xs text-slate-500">
                Comparaison quantitative des objectifs annuels et des résultats mesurés sur le terrain.
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartIndicators} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Cible" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Atteint" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demographic Breakdown */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Profil des Bénéficiaires
              </h3>
              <p className="text-xs text-slate-500">
                Répartition selon le genre et la tranche d'âge.
              </p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              {demographicData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                    <span className="text-slate-700">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Indicators Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Tableau de Bord Détaillé du Cadre Logique (M&E)
              </h3>
              <p className="text-xs text-slate-500">
                Suivi systématique par domaine d'intervention et fréquence de collecte.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {meIndicators.length} Indicateurs actifs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Intitulé de l'Indicateur</th>
                  <th className="py-3 px-4">Projet / Domaine</th>
                  <th className="py-3 px-4 text-center">Cible</th>
                  <th className="py-3 px-4 text-center">Réalisé</th>
                  <th className="py-3 px-4 text-center">Taux d'atteinte</th>
                  <th className="py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {meIndicators.map((ind) => {
                  const rate = Math.round((ind.currentValue / ind.targetValue) * 100);
                  return (
                    <tr key={ind.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{ind.code}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs">{ind.title}</td>
                      <td className="py-3.5 px-4 text-slate-500">{ind.domain}</td>
                      <td className="py-3.5 px-4 text-center font-mono">{ind.targetValue.toLocaleString()} {ind.unit}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">{ind.currentValue.toLocaleString()} {ind.unit}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-bold ${rate >= 100 ? 'text-emerald-700' : 'text-teal-700'}`}>
                          {rate}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          ind.status === 'achieved' || ind.status === 'exceeded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {ind.status === 'exceeded' ? 'Dépassé' : ind.status === 'achieved' ? 'Atteint' : 'En progrès'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

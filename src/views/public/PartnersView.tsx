import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Partner } from '../../types';
import { 
  Handshake, 
  Building, 
  Globe, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  FolderGit2,
  CheckSquare,
  MapPin,
  Coins
} from 'lucide-react';

export const PartnersView: React.FC = () => {
  const { partners = [] } = useApp();
  const [partnerType, setPartnerType] = useState('Tous');

  // Contact form state
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const filteredPartners = (partners || []).filter(p => 
    partnerType === 'Tous' || p.type === partnerType
  );

  const handlePartnerInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOrgName('');
      setContactName('');
      setEmail('');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Écosystème & Coopération
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Partenaires Sociaux & PTF
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            HEALTHDEV ONG collabore étroitement avec des organisations sociales locales, des réseaux féministes, 
            des bailleurs internationaux et des institutions pour maximiser son impact sur le terrain au Bénin.
          </p>
        </div>

        {/* Highlight Banner: Partenaires Sociaux */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-teal-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-teal-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-teal-300">
              Synergie & Partenaires Sociaux du Bénin
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
            HEALTHDEV ONG agit en forte synergie communautaire et féministe avec <strong>9 partenaires sociaux majeurs</strong> sur le territoire béninois : 
            <span className="text-emerald-300 font-semibold"> Réseau des Féministes du Bénin, COJAS-Bénin, Jeunes Volontaires pour la Santé, JAIE, ALDD, Association BARIKA, Association WANROU, YID et RESCUE and HOPE</span>.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'Tous', label: 'Tous les partenaires' },
            { id: 'social_partner', label: 'Partenaires Sociaux' },
            { id: 'international_donor', label: 'PTF & Bailleurs' },
            { id: 'ngo', label: 'ONG & Synergies' },
            { id: 'civil_society', label: 'Société Civile' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPartnerType(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                partnerType === item.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-1.5">
                    {partner.country}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {partner.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {partner.description}
                </p>

                {/* Domaines d'appui */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Domaines d'appui :</div>
                  <div className="font-semibold text-slate-800">{partner.focusDomains.join(' • ')}</div>
                </div>

                {/* Projets exécutés */}
                {partner.projectsExecuted && partner.projectsExecuted.length > 0 && (
                  <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100/80 space-y-1 text-xs">
                    <div className="text-teal-800 text-[10px] uppercase font-bold flex items-center gap-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Projets associés :</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-800 text-[11px] font-medium">
                      {partner.projectsExecuted.map((proj, idx) => (
                        <li key={idx}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Activités exécutées */}
                {partner.activitiesExecuted && partner.activitiesExecuted.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
                      <span>Activités réalisées avec l'organisme :</span>
                    </div>
                    <ul className="space-y-1">
                      {partner.activitiesExecuted.map((act, idx) => (
                        <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 shrink-0"></span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Portée & Zones */}
                {(partner.fundingScope || (partner.interventionZones && partner.interventionZones.length > 0)) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] pt-1">
                    {partner.fundingScope && (
                      <div className="bg-amber-50/70 border border-amber-200/60 p-2 rounded-lg text-amber-900">
                        <span className="font-bold block uppercase text-[9px] text-amber-700">Type d'engagement</span>
                        <span className="font-medium">{partner.fundingScope}</span>
                      </div>
                    )}
                    {partner.interventionZones && partner.interventionZones.length > 0 && (
                      <div className="bg-slate-100/80 border border-slate-200/80 p-2 rounded-lg text-slate-800">
                        <span className="font-bold block uppercase text-[9px] text-slate-500">Zones couvertes</span>
                        <span className="font-medium">{partner.interventionZones.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Partenaire depuis <strong>{partner.sinceYear}</strong></span>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 font-bold hover:text-teal-900 flex items-center gap-1"
                  >
                    <span>Site web</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Proposal / Call for Alliance Form */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Coopération & Synergie
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display leading-tight">
              Devenir Partenaire de HEALTHDEV ONG
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Vous êtes une fondation, une agence de coopération, une ONG internationale ou une entreprise socialement responsable ? 
              Construisons ensemble des programmes à fort impact pour la jeunesse et les femmes au Bénin.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Gestion administrative & financière aux normes internationales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Rapports d'impact M&E trimestriels audités</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Tolérance zéro et sauvegarde éthique</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
            {sent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
                <h4 className="font-bold text-white text-lg">Message de partenariat envoyé !</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  La Direction Exécutive de HEALTHDEV ONG vous recontactera sous 24 à 48 heures ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerInquiry} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nom de l'Organisation / Institution *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Fondation pour l'Égalité"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nom du Contact / Représentant *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean-Marc VOGEL"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Professionnel *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@organisation.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Axes de collaboration envisagés *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Précisez votre proposition de partenariat, co-financement ou assistance technique..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-teal-500 leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre la proposition de partenariat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

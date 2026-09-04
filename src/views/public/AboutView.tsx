import React from 'react';
import { useApp } from '../../context/AppContext';
import { NGO_INFO } from '../../data/initialData';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Award, 
  CheckCircle2, 
  Users, 
  MapPin, 
  FileText,
  ShieldCheck,
  HeartPulse,
  Scale,
  Leaf,
  Layers,
  ArrowRight,
  TrendingUp,
  Building2,
  Share2
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView, users = [] } = useApp();

  const leadershipTeam = (users || []).filter(u => 
    ['super_admin', 'admin', 'program_manager', 'financial_manager', 'comm_manager', 'me_manager'].includes(u.role)
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Qui sommes-nous ?
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            À Propos de HEALTHDEV ONG
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {NGO_INFO.tagline}
          </p>
        </div>

        {/* Legal & Administrative Identification Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img 
                src="/logo1.jpg" 
                alt="HEALTHDEV ONG Logo" 
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0" 
              />
              <div>
                <span className="text-xs font-bold text-[#144D32] uppercase tracking-widest">
                  Reconnaissance Légale & Statut Officiel
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-0.5">
                  HEALTH and DEVELOPMENT (HEALTHDEV) ONG
                </h2>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200 self-start md:self-auto flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Enregistrement Officiel & Conforme</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Récépissé Ministère (MISP)
              </span>
              <p className="font-bold text-slate-900">
                {NGO_INFO.registrationNumber}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Publication Journal Officiel
              </span>
              <p className="font-bold text-slate-900">
                {NGO_INFO.journalOfficiel}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Identifiant Fiscal Unique (IFU)
              </span>
              <p className="font-bold text-slate-900 font-mono">
                {NGO_INFO.ifu}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Siège Social
              </span>
              <p className="font-bold text-slate-900">
                {NGO_INFO.address}
              </p>
            </div>
          </div>
        </div>

        {/* History & Genesis Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#144D32] text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C84F]" />
            <span>Genèse & Historique</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Du Mouvement d'Action des Jeunes (MAJ/ABPF) à l'engagement communautaire
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <p>
                Ayant milité en tant que <strong>pairs éducateurs</strong> au sein du <strong>Mouvement d'Action des Jeunes de l'Association Béninoise pour la Promotion de la Famille (MAJ/ABPF affilié à IPPF)</strong>, certains membres après l’âge requis ont exprimé le vif désir de continuer leur militantisme.
              </p>
              <p>
                Leur motivation : mettre leurs compétences, leur expertise de terrain et leurs connaissances au service direct des communautés à la base. C’est ainsi qu’a germé en <strong>2021</strong> l’idée de créer une organisation plus ouverte sur les préoccupations sociales, d'où la dénomination <strong>« Santé et Développement » en anglais : HEALTH and DEVELOPMENT (HEALTHDEV)</strong>.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Les initiatives entreprises sont inspirées des réalités quotidiennes des communautés à la base, précisément les <strong>jeunes filles, garçons et jeunes femmes</strong>, afin de répondre aux défis majeurs : insuffisance d'informations fiables, tabous sur la sexualité et obstacles à la jouissance des droits sexuels.
              </p>
              <p>
                De <strong>2021 à 2023</strong>, l’idée a été mûrie, les bases institutionnelles posées, les objectifs et la vision clarifiés. <strong>Les activités ont réellement démarré sur le terrain en 2024</strong> et se poursuivent activement aujourd’hui.
              </p>
            </div>
          </div>
        </div>

        {/* 3 General Objectives */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Objectifs Généraux
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Nos Trois Objectifs Stratégiques
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NGO_INFO.generalObjectives.map((obj, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#144D32] text-white flex items-center justify-center font-black text-sm">
                  0{idx + 1}
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Official Strategic Axes */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Cadre Stratégique
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Les 4 Axes Stratégiques d'Intervention
            </h2>
            <p className="text-sm text-slate-500">
              Les piliers d'action qui structurent l'ensemble des projets et des activités de HEALTHDEV ONG.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NGO_INFO.strategicAxes.map((axe, idx) => (
              <div
                key={axe.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4 hover:border-[#144D32] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Axe {idx + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">HEALTHDEV</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {axe.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {axe.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Users className="w-4 h-4 text-[#144D32] shrink-0" />
                  <span><strong>Cible :</strong> {axe.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Groups & Affiliations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Target Groups */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#144D32] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Groupes Cibles Prioritaires
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              {NGO_INFO.targetGroups.map((tg, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{tg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliation Networks */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#144D32] flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Réseaux d'Affiliation & Synergies
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <span className="font-bold text-[#144D32] text-base block">
                  Le Réseau des Féministes du Bénin
                </span>
                <p className="text-xs text-emerald-900">
                  Affiliation active pour la synergie du plaidoyer national féministe et la défense des droits des femmes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 text-base block">
                  Le Mouvement ODAS (Afrique Francophone)
                </span>
                <p className="text-xs text-slate-600">
                  Mouvement régional pour l'accès universel à l'avortement sécurisé et aux droits reproductifs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Nos Valeurs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Principes Fondateurs
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
              Nos Valeurs Féministes & Éthiques
            </h2>
            <p className="text-sm text-slate-500">
              Le socle de principes qui guide chaque intervention terrain et chaque partenariat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NGO_INFO.values.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#144D32] hover:bg-emerald-50/40 transition-all space-y-2"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#144D32] flex items-center justify-center font-black text-xs">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {val.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Executive Team */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#144D32] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Gouvernance & Direction
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display mt-2">
                Le Conseil d'Administration & l'Équipe Exécutive
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Présidence assurée par <strong>{NGO_INFO.president}</strong> ({NGO_INFO.presidentRole}).
              </p>
            </div>
            <button
              onClick={() => setCurrentView('volunteer-register')}
              className="px-4 py-2.5 bg-[#144D32] hover:bg-[#0d3623] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 self-start cursor-pointer shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>Rejoindre l'équipe comme bénévole</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatarUrl}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {member.firstName} {member.lastName}
                    </h4>
                    <span className="text-xs text-[#144D32] font-bold block mt-0.5">
                      {member.profession}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {member.city}, {member.department}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  « {member.motivation} »
                </p>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {member.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Besoin de collaborer ou d'appuyer nos programmes au Bénin ?
            </h3>
            <p className="text-xs text-slate-400">
              Siège : {NGO_INFO.address} • Tél : {NGO_INFO.phone}
            </p>
          </div>
          <button
            onClick={() => setCurrentView('contact')}
            className="px-6 py-3.5 bg-[#144D32] hover:bg-[#0d3623] text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
          >
            Contacter HEALTHDEV ONG
          </button>
        </div>
      </div>
    </div>
  );
};

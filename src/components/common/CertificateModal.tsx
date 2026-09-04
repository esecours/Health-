import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity } from '../../types';
import { X, Award, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  volunteerName?: string;
  hours?: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  activity,
  volunteerName,
  hours = 8
}) => {
  const { currentUser } = useApp();
  const recipient = volunteerName || (currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Bénévole Engagé(e)');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateNumber = `CERT-HD-${activity.id.replace('act-', '')}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top bar */}
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Attestation Officielle de Bénévolat & d'Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-slate-50 text-slate-900">
          <div className="bg-white border-8 border-double border-teal-900/20 rounded-xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
            {/* Background seal watermark */}
            <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
              <ShieldCheck className="w-72 h-72 text-teal-950" />
            </div>

            {/* Header */}
            <div className="text-center space-y-1 pb-6 border-b border-slate-200">
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 font-extrabold text-[11px] uppercase tracking-widest rounded-full border border-teal-200 mb-2">
                RÉPUBLIQUE DU BÉNIN • ORGANISATION NON GOUVERNEMENTALE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                HEALTHDEV ONG
              </h2>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Health and Development ONG – Organisation Féministe de Jeunes
              </p>
              <p className="text-[11px] text-slate-400">
                Parakou, Département du Borgou • Email: healthdev.ong@gmail.com
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-6">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-1">
                CERTIFICAT DE RECONNAISSANCE & DE PARTICIPATION
              </span>
              <h3 className="text-xl sm:text-2xl font-serif italic text-slate-800">
                Attestation de Bénévolat
              </h3>
            </div>

            {/* Content */}
            <div className="text-center space-y-4 text-slate-700 max-w-xl mx-auto text-sm leading-relaxed">
              <p className="text-xs text-slate-500">
                La Direction Exécutive et le Conseil d'Administration de HEALTHDEV ONG certifient avec honneur que :
              </p>
              
              <div className="py-2">
                <span className="text-2xl sm:text-3xl font-black text-teal-700 border-b-2 border-teal-500/40 pb-1 px-4 inline-block font-display">
                  {recipient}
                </span>
              </div>

              <p className="text-xs sm:text-sm">
                a activement participé et accompli avec dévouement, éthique et rigueur féministe les missions assignées lors de l'activité communautaire :
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm">
                  « {activity.title} »
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Lieu : {activity.location}, {activity.commune} ({activity.department}) • Date : {activity.date}
                </span>
              </div>

              <p className="text-xs text-slate-600">
                Volume horaire bénévole validé : <strong className="text-slate-900">{hours} heures d'engagement terrain</strong>.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 text-xs">
              <div className="text-center">
                <div className="h-12 flex items-center justify-center font-serif italic text-teal-800 text-lg opacity-80">
                  Régina AHO
                </div>
                <div className="font-bold text-slate-900">Régina AHO</div>
                <div className="text-[11px] text-slate-500">Présidente du Conseil d'Administration</div>
              </div>

              <div className="text-center">
                <div className="h-12 flex items-center justify-center font-serif italic text-teal-800 text-lg font-bold">
                  Rolland GNANGNI
                </div>
                <div className="font-bold text-slate-900">Rolland GNANGNI</div>
                <div className="text-[11px] text-slate-500">Directeur Exécutif</div>
              </div>
            </div>

            {/* Footer stamp code */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>N° Réf: {certificateNumber}</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="w-3 h-3" />
                Certificat authentifié par HEALTHDEV ONG
              </span>
              <span>Parakou, République du Bénin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

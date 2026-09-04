import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { 
  X, 
  Printer, 
  Download, 
  Camera, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Award, 
  Edit3,
  Briefcase,
  Image as ImageIcon,
  Loader2,
  Check
} from 'lucide-react';

interface UserBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser?: UserProfile | null;
  onOpenEditProfile?: () => void;
}

export const UserBadgeModal: React.FC<UserBadgeModalProps> = ({
  isOpen,
  onClose,
  targetUser,
  onOpenEditProfile
}) => {
  const { currentUser, users } = useApp();
  const user = targetUser || currentUser;

  const [cardSide, setCardSide] = useState<'front' | 'back' | 'both'>('front');
  const [badgeFormat, setBadgeFormat] = useState<'portrait' | 'landscape'>('portrait');
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPNG, setIsExportingPNG] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const frontBadgeRef = useRef<HTMLDivElement>(null);
  const backBadgeRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !user) return null;

  const fullName = `${user.firstName} ${user.lastName}`.trim() || 'Membre Engagé(e)';
  const matricule = user.matricule || `HD-BEN-${(user.id || '01').replace(/\D/g, '').slice(-4).padStart(4, '0')}`;
  
  // Nom de la Direction Exécutive enregistrée sur la plateforme
  const directriceExec = users?.find(u => 
    (u.poste?.toLowerCase().includes('direct') && u.poste?.toLowerCase().includes('exécuti')) ||
    u.email === 'rolland.gnangni@healthdev.ong' ||
    u.id === 'usr-staff-1' ||
    u.email === 'directrice@healthdev.ong' ||
    u.id === 'usr-2'
  );
  const directriceName = directriceExec ? `${directriceExec.firstName} ${directriceExec.lastName}` : 'GNANGNI Rolland';
  const directorTitle = directriceExec?.gender === 'F' ? 'La Directrice Exécutive' : 'Le Directeur Exécutif';

  const getRoleBadgeLabel = (role: string) => {
    switch (role) {
      case 'volunteer': return 'BÉNÉVOLE TERRAIN';
      case 'super_admin': return 'SUPER ADMINISTRATEUR';
      case 'admin': return 'DIRECTION & ADMIN RH';
      case 'secretary': return 'SECRÉTAIRE GÉNÉRALE';
      case 'program_manager': return 'RESPONSABLE PROGRAMMES';
      case 'financial_manager': return 'RESPONSABLE FINANCIER';
      case 'me_manager': return 'RESPONSABLE SUIVI & ÉVAL.';
      case 'comm_manager': return 'RESPONSABLE COMMUNICATION';
      default: return 'MEMBRE ACCRÉDITÉ';
    }
  };

  // Le poste officiel accordé par l'Administrateur ou le Responsable RH
  const posteOccupe = user.poste?.trim() || getRoleBadgeLabel(user.role);
  const userAddress = user.address || `${user.city || 'Parakou'}, ${user.department || 'Borgou'}`;
  const userPhone = user.phone || '+229 01 92 43 15 95';
  const userEmail = user.email || 'membre@healthdev.ong';
  const defaultAvatarByGender = user.gender === 'F' ? '/default_avatar_f.jpg' : '/default_avatar_m.jpg';
  const userAvatar = user.avatarUrl || defaultAvatarByGender;

  const handlePrint = () => {
    window.print();
  };

  // Helper function to capture an element even if hidden or in different mode
  const captureBadgeElement = async (elem: HTMLDivElement | null) => {
    if (!elem) return '';
    try {
      return await toPng(elem, {
        pixelRatio: 4,
        cacheBust: true,
        skipFonts: true,
      });
    } catch (e) {
      console.error('Error capturing badge element:', e);
      return '';
    }
  };

  // Téléchargement du badge au format PDF haute résolution (Format carte CR80 / A4 planche)
  const handleDownloadPDF = async () => {
    try {
      setIsExportingPDF(true);
      setExportSuccessMsg(null);

      // Force both sides to be available for capture if needed
      const wasCardSide = cardSide;
      if (cardSide !== 'both') {
        setCardSide('both');
        // brief pause for DOM update
        await new Promise((r) => setTimeout(r, 100));
      }

      const frontElem = frontBadgeRef.current;
      const backElem = backBadgeRef.current;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // En-tête du document PDF imprimable
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(20, 77, 50); // #144D32
      pdf.text('HEALTHDEV ONG - CARTE D\'ACCRÉDITATION OFFICIELLE', 105, 18, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Titulaire : ${fullName} • Matricule : ${matricule} • Poste : ${posteOccupe}`, 105, 25, { align: 'center' });
      pdf.text('Organisation Féministe de Jeunes • Siège National Parakou, République du Bénin', 105, 30, { align: 'center' });

      // Ligne de séparation
      pdf.setDrawColor(245, 200, 79);
      pdf.setLineWidth(0.8);
      pdf.line(20, 34, 190, 34);

      const frontImgData = await captureBadgeElement(frontElem);
      const backImgData = await captureBadgeElement(backElem);

      // Dimensions d'une carte standard portrait CR80 (scale responsive sur A4)
      const badgeWidthMm = 75;
      const badgeHeightMm = 115;

      if (frontImgData && backImgData) {
        // Mode planche Recto + Verso côte à côte avec espacement équilibré
        pdf.addImage(frontImgData, 'PNG', 24, 42, badgeWidthMm, badgeHeightMm);
        pdf.addImage(backImgData, 'PNG', 110, 42, badgeWidthMm, badgeHeightMm);

        pdf.setFontSize(9.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(20, 77, 50);
        pdf.text('▲ RECTO (Face avant)', 61, 163, { align: 'center' });
        pdf.text('▲ VERSO (Face arrière)', 147, 163, { align: 'center' });
      } else if (frontImgData) {
        pdf.addImage(frontImgData, 'PNG', 67, 42, badgeWidthMm, badgeHeightMm);
        pdf.setFontSize(9.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(20, 77, 50);
        pdf.text('▲ RECTO (Face avant)', 105, 163, { align: 'center' });
      } else if (backImgData) {
        pdf.addImage(backImgData, 'PNG', 67, 42, badgeWidthMm, badgeHeightMm);
        pdf.setFontSize(9.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(20, 77, 50);
        pdf.text('▲ VERSO (Face arrière)', 105, 163, { align: 'center' });
      }

      // Instructions de découpe et d'usage
      pdf.setDrawColor(226, 232, 240);
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(20, 175, 170, 42, 3, 3, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(20, 77, 50);
      pdf.text('CONSIGNES D\'IMPRESSION ET D\'USAGE PROFESSIONNEL :', 26, 183);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(51, 65, 85);
      pdf.text('1. Imprimez ce document sur papier couché épais / cartonné (250g à 300g) ou papier photo.', 26, 190);
      pdf.text('2. Découpez soigneusement selon les contours arrondis des cartes Recto et Verso.', 26, 196);
      pdf.text('3. Glissez les deux faces dans un porte-badge transparent standard sécurisé avec cordon tour de cou.', 26, 202);
      pdf.text('4. Le QR Code et le code-barres permettent l\'identification électronique lors des missions et assemblées.', 26, 208);

      // Signature & Validation Footer
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} - Plateforme Officielle HEALTHDEV ERP Bénin`, 105, 285, { align: 'center' });

      // Reset cardSide if it was changed
      if (wasCardSide !== 'both') {
        setCardSide(wasCardSide);
      }

      // Télécharger le PDF
      const sanitizedName = fullName.replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`Badge_Officiel_HEALTHDEV_${sanitizedName}_${matricule}.pdf`);
      setExportSuccessMsg('Badge PDF téléchargé avec succès !');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Erreur export PDF:', err);
      window.print();
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Téléchargement en Images PNG Haute Définition (Recto ET Verso)
  const handleDownloadPNG = async () => {
    try {
      setIsExportingPNG(true);
      setExportSuccessMsg(null);

      // Ensure both sides are mounted for capture
      const wasCardSide = cardSide;
      if (cardSide !== 'both') {
        setCardSide('both');
        await new Promise((r) => setTimeout(r, 120));
      }

      const frontElem = frontBadgeRef.current;
      const backElem = backBadgeRef.current;

      const sanitizedName = fullName.replace(/[^a-zA-Z0-9_-]/g, '_');

      // Capture and download RECTO
      if (frontElem) {
        const frontImgData = await captureBadgeElement(frontElem);
        if (frontImgData) {
          const linkRecto = document.createElement('a');
          linkRecto.download = `Badge_HEALTHDEV_${sanitizedName}_RECTO.png`;
          linkRecto.href = frontImgData;
          linkRecto.click();
        }
      }

      // Small delay between downloads so browser handles both triggers cleanly
      await new Promise((r) => setTimeout(r, 300));

      // Capture and download VERSO
      if (backElem) {
        const backImgData = await captureBadgeElement(backElem);
        if (backImgData) {
          const linkVerso = document.createElement('a');
          linkVerso.download = `Badge_HEALTHDEV_${sanitizedName}_VERSO.png`;
          linkVerso.href = backImgData;
          linkVerso.click();
        }
      }

      if (wasCardSide !== 'both') {
        setCardSide(wasCardSide);
      }

      setExportSuccessMsg('Images RECTO et VERSO PNG téléchargées !');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Erreur export PNG:', err);
    } finally {
      setIsExportingPNG(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 rounded-2xl sm:rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[98vh] text-white animate-in zoom-in-95 duration-200">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 no-print">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-xs sm:text-base font-black font-display text-white truncate">
                  Badge Officiel d'Identification
                </h2>
                <span className="px-1.5 py-0.5 bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 rounded text-[8px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Accrédité
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate hidden sm:block">
                Carte de membre accréditée de HEALTHDEV ONG • Bénin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0 ml-1"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher & Action Controls (Hidden on Print) */}
        <div className="px-2.5 sm:px-5 py-2 sm:py-3 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs no-print">
          {/* Side toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 font-bold w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setCardSide('front')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all cursor-pointer text-center ${
                cardSide === 'front' ? 'bg-[#144D32] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Recto
            </button>
            <button
              type="button"
              onClick={() => setCardSide('back')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all cursor-pointer text-center ${
                cardSide === 'back' ? 'bg-[#144D32] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verso
            </button>
            <button
              type="button"
              onClick={() => setCardSide('both')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all cursor-pointer text-center ${
                cardSide === 'both' ? 'bg-[#144D32] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Planche R/V
            </button>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-1.5 justify-between sm:justify-end overflow-x-auto w-full sm:w-auto">
            {exportSuccessMsg && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-700/50 px-2 py-1 rounded-lg animate-in fade-in shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="truncate max-w-[120px] sm:max-w-none">{exportSuccessMsg}</span>
              </span>
            )}

            {onOpenEditProfile && (
              <button
                type="button"
                onClick={onOpenEditProfile}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700 cursor-pointer transition-colors shrink-0"
                title="Changer ma photo ou profil"
              >
                <Camera className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px]">Photo</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={isExportingPNG}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50 shrink-0"
              title="Télécharger l'image PNG haute définition"
            >
              {isExportingPNG ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-400" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
              )}
              <span className="text-[11px]">PNG HD</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExportingPDF}
              className="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-[#144D32] hover:from-teal-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-teal-500/40 disabled:opacity-50 shrink-0"
              title="Télécharger le badge officiel complet en PDF"
            >
              {isExportingPDF ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#F5C84F]" />
                  <span className="text-[11px]">PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#F5C84F]" />
                  <span className="text-[11px]">PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700 cursor-pointer shrink-0"
              title="Imprimer directement"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Imprimer</span>
            </button>
          </div>
        </div>

        {/* Badge Presentation Canvas */}
        <div className="p-2 sm:p-6 lg:p-10 overflow-x-hidden overflow-y-auto flex-1 flex flex-col items-center justify-start sm:justify-center bg-slate-950/80 w-full">
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 sm:gap-8 w-full max-w-full">

            {/* ================= RECTO (FRONT) ================= */}
            {(cardSide === 'front' || cardSide === 'both') && (
              <div className="flex justify-center items-center w-full max-w-full overflow-hidden py-1">
                <div className="transform scale-[0.74] min-[360px]:scale-[0.82] min-[400px]:scale-[0.88] min-[480px]:scale-[0.95] sm:scale-100 origin-center my-[-58px] min-[360px]:my-[-38px] min-[400px]:my-[-25px] sm:my-0 transition-transform flex justify-center shrink-0">
                  <div 
                    ref={frontBadgeRef}
                    className="w-[340px] bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200 flex flex-col relative print:border-slate-800 print:shadow-none select-none shrink-0"
                  >
                
                {/* Lanyard Hole Mockup (Top cutout) */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-200 rounded-full border border-slate-300 z-30 shadow-inner flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-400 rounded-full opacity-60"></div>
                </div>

                {/* Top Green Banner */}
                <div className="bg-[#144D32] text-white pt-7 pb-3.5 px-4 text-center relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#F5C84F]/20 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d3623] text-[#F5C84F] text-[9px] font-black uppercase tracking-widest border border-[#F5C84F]/30 mb-1">
                    <span>RÉPUBLIQUE DU BÉNIN</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 my-1">
                    <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-lg flex items-center justify-center overflow-hidden border-2 border-[#F5C84F] shrink-0">
                      <img src="/logo1.jpg" alt="Logo HEALTHDEV ONG" className="w-full h-full object-contain rounded-xl" crossOrigin="anonymous" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-black tracking-tight font-display text-white leading-tight">
                        HEALTHDEV ONG
                      </h3>
                      <p className="text-[10px] text-teal-100 font-bold tracking-wide uppercase">
                        Organisation Féministe de Jeunes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Holographic Ribbon */}
                <div className="h-1.5 bg-gradient-to-r from-[#F5C84F] via-emerald-400 to-[#144D32]"></div>

                {/* Photo & Identity Section */}
                <div className="p-4 sm:p-5 flex flex-col items-center text-center relative bg-gradient-to-b from-slate-50 to-white">
                  
                  {/* Photo Frame with status badge */}
                  <div className="relative mb-3 group">
                    <div className="w-28 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 relative">
                      <img
                        src={userAvatar}
                        alt={fullName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </div>

                    {/* Verified checkmark badge */}
                    <div className="absolute -bottom-2 right-1/2 translate-x-1/2 px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 border-2 border-white whitespace-nowrap">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ACCRÉDITÉ</span>
                    </div>

                    {onOpenEditProfile && (
                      <button
                        type="button"
                        onClick={onOpenEditProfile}
                        className="absolute inset-0 bg-slate-950/60 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
                        title="Changer la photo"
                      >
                        <Camera className="w-5 h-5 text-[#F5C84F]" />
                        <span className="text-[10px] font-bold">Modifier</span>
                      </button>
                    )}
                  </div>

                  {/* Name, Poste & Role */}
                  <div className="space-y-1 mb-3 w-full">
                    <h4 className="text-lg font-black text-slate-900 leading-tight font-display uppercase tracking-tight">
                      {fullName}
                    </h4>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-[#144D32] border border-teal-200 rounded-lg text-[10px] font-black uppercase tracking-wide max-w-full">
                      <Briefcase className="w-3 h-3 text-teal-700 shrink-0" />
                      <span className="truncate">{posteOccupe}</span>
                    </div>
                  </div>

                  {/* Official Credentials Grid */}
                  <div className="w-full bg-slate-50 rounded-2xl p-2.5 border border-slate-200 space-y-1.5 text-left text-[10px] mb-3">
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">Matricule Officiel</span>
                      <span className="font-mono font-black text-teal-950 text-xs px-2 py-0.5 bg-teal-100/70 rounded-md border border-teal-200">{matricule}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">Contact Direct</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 text-teal-600" />
                        {userPhone}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">Email Officiel</span>
                      <span className="font-medium text-slate-700 truncate max-w-[190px]">{userEmail}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">Résidence / Zone</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-teal-600" />
                        {user.city || 'Parakou'}, {user.department || 'Borgou'}
                      </span>
                    </div>
                  </div>

                  {/* QR Code & Digital Signature */}
                  <div className="w-full flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    {/* Stylized QR Code */}
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white border border-slate-300 rounded-xl shadow-xs">
                        <svg className="w-12 h-12" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Corner markers */}
                          <rect x="2" y="2" width="7" height="7" rx="1" fill="#144D32" />
                          <rect x="3.5" y="3.5" width="4" height="4" fill="white" />
                          <rect x="4.5" y="4.5" width="2" height="2" fill="#144D32" />

                          <rect x="20" y="2" width="7" height="7" rx="1" fill="#144D32" />
                          <rect x="21.5" y="3.5" width="4" height="4" fill="white" />
                          <rect x="22.5" y="4.5" width="2" height="2" fill="#144D32" />

                          <rect x="2" y="20" width="7" height="7" rx="1" fill="#144D32" />
                          <rect x="3.5" y="21.5" width="4" height="4" fill="white" />
                          <rect x="4.5" y="22.5" width="2" height="2" fill="#144D32" />

                          {/* Data dots */}
                          <rect x="10" y="3" width="2" height="2" fill="#144D32" />
                          <rect x="13" y="3" width="2" height="2" fill="#144D32" />
                          <rect x="16" y="3" width="2" height="2" fill="#144D32" />
                          <rect x="10" y="6" width="2" height="2" fill="#144D32" />
                          <rect x="14" y="6" width="2" height="2" fill="#144D32" />
                          
                          <rect x="3" y="10" width="2" height="2" fill="#144D32" />
                          <rect x="6" y="10" width="2" height="2" fill="#144D32" />
                          <rect x="10" y="10" width="2" height="2" fill="#144D32" />
                          <rect x="13" y="10" width="3" height="3" fill="#144D32" />
                          <rect x="18" y="10" width="2" height="2" fill="#144D32" />
                          <rect x="22" y="10" width="2" height="2" fill="#144D32" />
                          <rect x="25" y="10" width="2" height="2" fill="#144D32" />

                          <rect x="10" y="14" width="2" height="2" fill="#144D32" />
                          <rect x="14" y="14" width="2" height="2" fill="#144D32" />
                          <rect x="17" y="14" width="2" height="2" fill="#144D32" />
                          <rect x="20" y="14" width="2" height="2" fill="#144D32" />
                          <rect x="24" y="14" width="2" height="2" fill="#144D32" />

                          <rect x="3" y="17" width="2" height="2" fill="#144D32" />
                          <rect x="7" y="17" width="2" height="2" fill="#144D32" />
                          <rect x="11" y="17" width="2" height="2" fill="#144D32" />
                          <rect x="15" y="17" width="2" height="2" fill="#144D32" />
                          <rect x="19" y="17" width="2" height="2" fill="#144D32" />
                          <rect x="23" y="17" width="2" height="2" fill="#144D32" />

                          <rect x="10" y="21" width="2" height="2" fill="#144D32" />
                          <rect x="14" y="21" width="2" height="2" fill="#144D32" />
                          <rect x="18" y="21" width="2" height="2" fill="#144D32" />
                          <rect x="22" y="21" width="2" height="2" fill="#144D32" />
                          <rect x="25" y="21" width="2" height="2" fill="#144D32" />

                          <rect x="10" y="24" width="2" height="2" fill="#144D32" />
                          <rect x="13" y="25" width="2" height="2" fill="#144D32" />
                          <rect x="17" y="24" width="2" height="2" fill="#144D32" />
                          <rect x="21" y="25" width="2" height="2" fill="#144D32" />
                          <rect x="24" y="24" width="2" height="2" fill="#144D32" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-[9px] font-black text-teal-800 uppercase tracking-wider">
                          QR Vérifié
                        </div>
                        <div className="text-[8px] text-slate-400 font-mono">
                          ID: {user.id.slice(0, 8)}
                        </div>
                      </div>
                    </div>

                    {/* Official Signature */}
                    <div className="text-right">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        {directorTitle}
                      </div>
                      <div className="font-serif italic text-xs font-black text-slate-800 tracking-tight">
                        {directriceName}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Footer Band */}
                <div className="bg-slate-900 text-white py-1.5 px-4 text-center text-[8px] font-mono tracking-widest uppercase">
                  HEALTHDEV-ONG • CARTE D'ACCRÉDITATION OFFICIELLE
                </div>

              </div>
            </div>
          </div>
        )}

            {/* ================= VERSO (BACK) ================= */}
            {(cardSide === 'back' || cardSide === 'both') && (
              <div className="flex justify-center items-center w-full max-w-full overflow-hidden py-1">
                <div className="transform scale-[0.74] min-[360px]:scale-[0.82] min-[400px]:scale-[0.88] min-[480px]:scale-[0.95] sm:scale-100 origin-center my-[-58px] min-[360px]:my-[-38px] min-[400px]:my-[-25px] sm:my-0 transition-transform flex justify-center shrink-0">
                  <div 
                    ref={backBadgeRef}
                    className="w-[340px] bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-800 flex flex-col relative print:border-slate-800 print:shadow-none select-none shrink-0"
                  >
                
                {/* Lanyard Hole Mockup */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-800 rounded-full border border-slate-700 z-30 shadow-inner flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-600 rounded-full opacity-60"></div>
                </div>

                {/* Header Back with Logo */}
                <div className="bg-[#144D32] pt-7 pb-3 px-4 text-center border-b border-[#0d3623]">
                  <div className="flex items-center justify-center gap-2.5 mb-1.5">
                    <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md overflow-hidden flex items-center justify-center border-2 border-[#F5C84F] shrink-0">
                      <img src="/logo1.jpg" alt="HEALTHDEV ONG" className="w-full h-full object-contain rounded-lg" crossOrigin="anonymous" />
                    </div>
                    <span className="text-sm font-black tracking-wider uppercase text-[#F5C84F]">HEALTHDEV ONG</span>
                  </div>
                  <h4 className="text-[10px] font-black tracking-wider uppercase text-white">
                    FICHE SIGNALÉTIQUE & CONDITIONS D'USAGE
                  </h4>
                  <p className="text-[9px] text-teal-100 mt-0.5">
                    Direction des Ressources Humaines & Accréditation
                  </p>
                </div>

                {/* Titulaire Credentials Summary on Verso */}
                <div className="p-4 space-y-3 text-[10px] text-slate-300 leading-relaxed bg-slate-900">
                  
                  {/* Titulaire Box */}
                  <div className="bg-slate-800/90 rounded-2xl p-2.5 border border-slate-700 space-y-1 text-[10px]">
                    <div className="flex justify-between items-center pb-1 border-b border-slate-700/60">
                      <span className="text-slate-400 font-bold uppercase text-[9px]">Titulaire du Badge :</span>
                      <span className="font-black text-white">{fullName}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 text-[9px]">
                      <span className="text-slate-400">Poste :</span>
                      <span className="font-bold text-teal-300">{posteOccupe}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 text-[9px]">
                      <span className="text-slate-400">Contact Téléphone :</span>
                      <span className="font-mono text-white">{userPhone}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 text-[9px]">
                      <span className="text-slate-400">Email :</span>
                      <span className="text-slate-300 truncate max-w-[190px]">{userEmail}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 text-[9px]">
                      <span className="text-slate-400">Adresse / Résidence :</span>
                      <span className="text-slate-200">{userAddress}</span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-1 text-[9px] text-slate-300 leading-normal">
                    <p>
                      Cette carte atteste que le titulaire est légalement accrédité auprès de <strong>HEALTHDEV ONG</strong> pour l'accomplissement des activités statutaires, caravanes et projets au Bénin.
                    </p>
                  </div>

                  {/* Headquarters and Emergency Box */}
                  <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/80 space-y-1 text-[9px]">
                    <div className="font-bold text-white flex items-center gap-1 text-[9px]">
                      <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                      <span>Siège National HEALTHDEV ONG</span>
                    </div>
                    <p className="text-slate-400 pl-4 text-[8.5px]">
                      Bawé, 3e Arrondissement de Parakou, Borgou, Bénin
                    </p>
                    <div className="flex items-center gap-1 text-slate-300 pl-4 text-[8.5px]">
                      <Phone className="w-2.5 h-2.5 text-[#F5C84F]" />
                      <span>Urgence / Siège : +229 01 92 43 15 95 / +229 01 96 65 65 31</span>
                    </div>
                  </div>

                  {/* Barcode Mockup */}
                  <div className="bg-white p-2 rounded-xl text-center">
                    <div className="h-7 flex items-center justify-center gap-1 px-2">
                      {[3, 1, 4, 1, 2, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 2, 3, 1].map((w, i) => (
                        <div
                          key={i}
                          className="bg-black h-full rounded-xs"
                          style={{ width: `${w * 1.5}px` }}
                        />
                      ))}
                    </div>
                    <div className="font-mono text-[9px] font-black text-slate-900 tracking-widest mt-0.5">
                      {matricule}
                    </div>
                  </div>

                  <p className="text-[7.5px] text-slate-400 text-center italic">
                    Propriété exclusive de HEALTHDEV ONG. En cas de perte, merci de rapporter cette carte au siège social ou au commissariat le plus proche.
                  </p>
                </div>

                {/* Bottom Footer Band */}
                <div className="bg-[#144D32] text-white py-1.5 px-4 text-center text-[8px] font-mono tracking-widest uppercase mt-auto">
                  REPUBLIQUE DU BENIN • ORGANISATION NON GOUVERNEMENTALE
                </div>

              </div>
            </div>
          </div>
        )}

          </div>

          {/* Quick Tip under the badge */}
          <div className="mt-8 text-center text-xs text-slate-400 max-w-lg no-print space-y-2">
            <p>
              💡 <strong>Téléchargement & Impression :</strong> Utilisez <strong>« Télécharger PDF »</strong> pour obtenir votre planche haute définition prête pour découpe et insertion dans un porte-badge, ou <strong>« Télécharger PNG HD »</strong> pour une version graphique exploitable.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

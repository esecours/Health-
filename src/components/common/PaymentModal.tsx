import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Payment, PaymentMethod } from '../../types';
import { 
  X, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  Loader2, 
  Building, 
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contributionId?: string;
  contributionTitle?: string;
  defaultAmount?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  contributionId,
  contributionTitle,
  defaultAmount = 10000
}) => {
  const { currentUser, processPayment } = useApp();
  const [amount, setAmount] = useState(defaultAmount);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mtn_momo');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '+229 01 92 43 15 95');
  const [payerName, setPayerName] = useState(currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '');
  const [notes, setNotes] = useState('');
  
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [completedPayment, setCompletedPayment] = useState<Payment | null>(null);

  if (!isOpen) return null;

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    setStep('processing');

    // Simulate USSD push delay
    setTimeout(async () => {
      const res = await processPayment({
        contributionId,
        contributionTitle: contributionTitle || 'Cotisation / Don HEALTHDEV ONG',
        amount,
        paymentMethod,
        payerPhone: phoneNumber,
        notes: notes || `Paiement initié par ${payerName}`
      });

      setCompletedPayment(res.payment);
      setStep('success');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const resetAndClose = () => {
    setStep('form');
    setCompletedPayment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#144D32] text-[#F5C84F] flex items-center justify-center font-black">
              HD
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">
                {step === 'success' ? 'Reçu Officiel de Paiement' : 'Paiement Sécurisé • Bénin'}
              </h3>
              <p className="text-xs text-slate-500">
                {contributionTitle || 'Cotisation statutaire / Don'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Choisissez votre moyen de paiement
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn_momo')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                      paymentMethod === 'mtn_momo'
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                      MTN
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">MTN MoMo</div>
                      <div className="text-[10px] text-slate-500">Bénin (+229)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('moov_money')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                      paymentMethod === 'moov_money'
                        ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      MOOV
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Moov Money</div>
                      <div className="text-[10px] text-slate-500">Bénin (+229)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#144D32] bg-emerald-50/50 ring-2 ring-[#144D32]/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#144D32] text-white flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Carte Bancaire</div>
                      <div className="text-[10px] text-slate-500">Visa / Mastercard</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                      paymentMethod === 'cash'
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Espèces / Siège</div>
                      <div className="text-[10px] text-slate-500">Parakou, Borgou</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Montant à payer (FCFA)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="500"
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    className="w-full pl-4 pr-16 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#144D32] focus:bg-white transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    FCFA
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {[5000, 10000, 25000, 50000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-[#144D32] text-slate-600 rounded-lg transition-colors cursor-pointer"
                    >
                      {preset.toLocaleString()} F
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone or Card info */}
              {(paymentMethod === 'mtn_momo' || paymentMethod === 'moov_money') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Numéro de téléphone Mobile Money (+229)
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+229 01 92 43 15 95"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#144D32] focus:bg-white"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Une invite USSD sécurisée apparaîtra sur votre téléphone pour valider avec votre code secret.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Numéro de carte bancaire
                    </label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      defaultValue="4000 1234 5678 9010"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      defaultValue="12/28"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="123"
                      maxLength={4}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Payer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom du cotisant / donateur
                </label>
                <input
                  type="text"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  placeholder="Ex: Marcelline SOUNNOUKINNY"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#144D32]"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#144D32] hover:bg-[#0d3623] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Payer {amount.toLocaleString()} FCFA</span>
                <span className="text-xs bg-[#0d3623] text-[#F5C84F] px-2 py-0.5 rounded-full font-bold">Sécurisé</span>
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="relative inline-flex">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-[#144D32] animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Communication avec la passerelle Mobile Money...</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  Veuillez confirmer la transaction sur votre téléphone {phoneNumber} avec votre code PIN.
                </p>
              </div>
              <div className="w-48 mx-auto bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#144D32] h-full w-2/3 animate-pulse"></div>
              </div>
            </div>
          )}

          {step === 'success' && completedPayment && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-1.5" />
                <h4 className="font-bold text-emerald-900 text-base">Paiement validé avec succès !</h4>
                <p className="text-xs text-emerald-700">
                  Votre transaction a été enregistrée et transmise à la trésorerie de HEALTHDEV ONG.
                </p>
              </div>

              {/* Receipt card */}
              <div id="payment-receipt" className="border border-slate-200 rounded-2xl p-5 bg-slate-50 text-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                  <div>
                    <div className="font-black text-[#144D32] text-sm">HEALTHDEV ONG</div>
                    <div className="text-[10px] text-slate-500">Parakou, République du Bénin</div>
                    <div className="text-[10px] text-slate-500">Tél: +229 01 92 43 15 95</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">{completedPayment.receiptNumber}</span>
                    <div className="text-[10px] text-slate-500">{completedPayment.date}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Bénéficiaire / Donateur :</span>
                    <span className="font-semibold text-slate-900">{completedPayment.userName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Moyen de paiement :</span>
                    <span className="font-semibold uppercase text-slate-900">{completedPayment.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Référence Opérateur :</span>
                    <span className="font-mono text-[11px] text-slate-700">{completedPayment.reference}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Motif :</span>
                    <span className="font-medium text-slate-900 truncate block">{completedPayment.contributionTitle}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Total payé</span>
                  <span className="font-black text-[#144D32] text-base">
                    {completedPayment.amount.toLocaleString()} FCFA
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 text-center italic">
                  Ce reçu numérique certifié fait foi de libération statutaire ou de don.
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer le reçu</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Terminer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { NGO_INFO } from '../../data/initialData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Contactez Notre Équipe
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Restons en Contact
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Notre siège social est situé à <strong>Parakou (Bénin)</strong>. Pour toute question, 
            proposition d'intervention communautaire ou renseignement institutionnel, 
            notre équipe vous répond avec diligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-bold text-slate-900 text-lg font-display">
                Coordonnées Officielles
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Siège Social</span>
                    <span className="text-slate-600">{NGO_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Téléphone & WhatsApp</span>
                    <a href={`tel:${NGO_INFO.phoneClean}`} className="text-teal-700 font-semibold hover:underline">
                      {NGO_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Courrier Électronique</span>
                    <a href={`mailto:${NGO_INFO.email}`} className="text-teal-700 font-semibold hover:underline">
                      {NGO_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Horaires d'Ouverture</span>
                    <span className="text-slate-600">Lundi à Vendredi : 08h00 - 17h30 (GMT+1)</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1">Présidence du Conseil d'Administration :</span>
                  <p className="text-xs text-slate-600">
                    <strong>{NGO_INFO.president}</strong> ({NGO_INFO.presidentRole})<br />
                    <span className="text-teal-700">{NGO_INFO.presidentContact}</span>
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">Suivez-nous sur les réseaux :</span>
                  <div className="flex items-center gap-3">
                  <a 
                    href={NGO_INFO.socialLinks.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors border border-slate-200"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a 
                    href={NGO_INFO.socialLinks.twitter} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors border border-slate-200"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href={NGO_INFO.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors border border-slate-200"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={NGO_INFO.socialLinks.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white flex items-center justify-center text-slate-600 transition-colors border border-slate-200"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message envoyé avec succès !</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Merci de nous avoir contactés. Le secrétariat de HEALTHDEV ONG à Parakou accusera réception de votre message dans les meilleurs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-lg font-display pb-2 border-b border-slate-100">
                  Formulaire de Contact Direct
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Marius BIO"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="marius@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+229 01 92 43 15 95"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Objet du message *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Demande de partenariat / Adhésion"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Écrivez votre message ici..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mon message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

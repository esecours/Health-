import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Heart,
  Volume2
} from 'lucide-react';

export const VoicesOfChange: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 'voice-1',
      name: 'Fatoumata B.',
      role: 'Apprentie Couturière (19 ans)',
      location: 'Atelier Central, Parakou',
      project: 'Programme PESCA (Éducation Complète à la Sexualité)',
      quote: "Avant le passage de l'équipe de HEALTHDEV dans notre atelier de couture, nous n'osions jamais parler de notre cycle menstruel ou de nos droits avec notre patronne ni nos proches. Grâce aux pairs éducateurs, j'ai appris à me protéger, à reconnaître les situations de harcèlement et à avoir confiance en mon avenir professionnel.",
      metric: 'Formée avec 940 apprenti·e·s',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'voice-2',
      name: 'Blandine D.',
      role: 'Agente de Salubrité SGDS (34 ans)',
      location: 'Arrondissement de Calavi & Parakou',
      project: 'Projet « Balayeuses et Fières » (EngenderHealth)',
      quote: "Les cercles de parole de HEALTHDEV nous ont redonné notre fierté et notre dignité. Pour la première fois, une organisation s'est intéressée à nos conditions de travail, à notre santé gynécologique et à nos droits face aux violences verbales et physiques dans les rues.",
      metric: 'Membre du collectif de 90 femmes',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'voice-3',
      name: 'Moussa K.',
      role: 'Pair Éducateur & Leader Jeune (22 ans)',
      location: 'Université de Parakou / Quartier Titirou',
      project: 'Plaidoyer VBG & Caravane Jeunesse ABPF/IPPF',
      quote: "Être volontaire à HEALTHDEV m'a permis de transformer ma propre vision du genre et des masculinités positives. Quand nous allons dans les garages et les marchés sensibiliser les jeunes garçons, nous voyons les mentalités évoluer concrètement.",
      metric: '+1 200 jeunes sensibilisés',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const current = testimonials[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Témoignages & Récits de Vie
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mt-2">
              Les Voix du Changement sur le Terrain
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-slate-500 px-2">
              {activeIndex + 1} / {testimonials.length}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Card Display */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Photo Column */}
            <div className="lg:col-span-4 relative">
              <div className="aspect-4/5 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-lg relative bg-slate-100">
                <img
                  src={current.photo}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {current.metric}
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial Quote Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>{current.project}</span>
                </div>
                <Quote className="w-10 h-10 text-teal-200" />
              </div>

              <blockquote className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed italic">
                « {current.quote} »
              </blockquote>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-extrabold text-slate-900 text-lg font-display">
                    {current.name}
                  </div>
                  <div className="text-xs text-teal-700 font-semibold">
                    {current.role}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{current.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeIndex === i ? 'w-8 bg-teal-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Aller au témoignage ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

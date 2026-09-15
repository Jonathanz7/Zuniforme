import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Scissors, MapPin, MessageCircle } from 'lucide-react';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '../utils/formatters';

export const Hero: React.FC = () => {
  const waLink = createWhatsAppLink(createGeneralWhatsAppMessage());

  return (
    <section id="inicio" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FCE8EF] filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-[#FDF2F7] filter blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8EF] border border-[#F4B8CC] text-[#8C3D65] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#A8577F] animate-pulse" />
              <span>Confección Femenina y Profesional · Neiva, Huila</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Uniformes antifluidos con <br className="hidden sm:inline" />
              <span 
                className="relative inline-block"
                style={{
                  color: '#A8577F',
                }}
              >
                estilo, confort
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F4B8CC]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round"/>
                </svg>
              </span>{' '}
              y distinción.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Diseñamos y confeccionamos uniformes médicos (scrubs), batas y chaquetas antifluidos para el 
              <strong className="text-stone-800 font-semibold"> sector salud</strong> y 
              <strong className="text-stone-800 font-semibold"> dotaciones corporativas</strong>. 
              Prendas de alta durabilidad que combinan siluetas estilizadas, telas stretch que repelen líquidos y personalización con bordado computarizado.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #A8577F 0%, #8C3D65 100%)',
                }}
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold text-stone-800 bg-white border border-stone-200 hover:border-[#A8577F] hover:bg-[#FDF7FA] transition-all shadow-xs"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>Asesoría Personalizada</span>
              </a>
            </div>

            {/* Trust Highlights Row */}
            <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-[#FCE8EF] text-[#A8577F] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Antifluido Real</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Telas con repelencia a fluidos y cloro</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-[#FCE8EF] text-[#A8577F] shrink-0">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Taller Propio</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Bordados y ajustes a tu medida</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-xl bg-[#FCE8EF] text-[#A8577F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Neiva a Colombia</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Envíos rápidos a todo el país</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop"
                  alt="Doctora vistiendo uniforme antifluido ZUniforme"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Card Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FCE8EF] text-[#8C3D65]">
                        Colección Signature
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 mt-1">Conjunto Aura · Color Mauve</h3>
                    </div>
                    <span className="text-sm font-extrabold text-[#A8577F]">$135.000 COP</span>
                  </div>
                  
                  {/* Swatches teaser */}
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] text-stone-500 mr-1">Colores:</span>
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ background: '#A8577F' }} title="Mauve" />
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ background: '#F4B8CC' }} title="Rosa Empolvado" />
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ background: '#1F4E5B' }} title="Azul Petróleo" />
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ background: '#7D9D8B' }} title="Verde Salvia" />
                    <span className="text-[10px] text-[#A8577F] font-semibold ml-auto">+ más en catálogo</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Quality guarantee */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#F4B8CC]/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] flex items-center justify-center text-[#A8577F]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">4-Way Stretch</p>
                  <p className="text-[11px] text-stone-500">Comodidad 24/7</p>
                </div>
              </div>

              {/* Floating Badge 2: Bordado personalizado */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#A8577F] text-white flex items-center justify-center text-xs font-bold font-script">
                  ZU
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Bordado Gratis</p>
                  <p className="text-[10px] text-stone-500">En compras mayores a 3 uds</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

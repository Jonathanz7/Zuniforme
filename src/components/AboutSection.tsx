import React from 'react';
import { Heart, Sparkles, Award, Users, CheckCircle2, MessageCircle } from 'lucide-react';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '../utils/formatters';

export const AboutSection: React.FC = () => {
  const waLink = createWhatsAppLink(createGeneralWhatsAppMessage());

  return (
    <section id="nosotros" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-1/2 right-0 -mr-24 w-96 h-96 rounded-full bg-[#FAF0F4] filter blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Workshop and Craftsmanship Imagery */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Primary Image: Professional scrub & tailoring */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F5] aspect-[4/4.5] bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop"
                  alt="Taller de confección y diseño ZUniforme Neiva"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Overlay Card: Huila Craftsmanship */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-5 rounded-3xl shadow-xl border border-stone-200/80 max-w-xs sm:max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FCE8EF] text-[#A8577F] flex items-center justify-center font-script text-2xl font-bold">
                    ZU
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Pasión desde Neiva</h3>
                    <p className="text-xs text-stone-500">Confección 100% colombiana hecha con amor y precisión</p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white py-3 px-4 rounded-2xl shadow-lg border border-[#F4B8CC]/50 text-center">
                <span className="block text-2xl font-black text-[#A8577F]">+5 Años</span>
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Vistiendo a la salud</span>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F4] text-[#8C3D65] text-xs font-bold uppercase tracking-wider mb-4">
              <Heart className="w-3.5 h-3.5 text-[#A8577F] fill-[#A8577F]" />
              Nuestra Historia & Esencia
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Creemos que cuidar de otros también merece verse <span style={{ color: '#A8577F' }}>elegante</span>.
            </h2>

            <p className="mt-6 text-sm sm:text-base text-stone-600 leading-relaxed">
              <strong>ZUniforme</strong> nació en la ciudad de <strong>Neiva (Huila)</strong> con un propósito claro: 
              transformar el concepto de la ropa médica y laboral. Queríamos dejar atrás los uniformes rígidos, incómodos y sin forma, 
              para crear prendas que brinden la protección necesaria en el sector salud sin perder la feminidad, el estilo ni la comodidad que necesitas en turnos de 12 o 24 horas.
            </p>

            <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
              Cada uno de nuestros uniformes es confeccionado con <strong>telas antifluido stretch de tecnología superior</strong> (que repelen fluidos, no se decoloran y se secan al instante) y cuenta con la opción de <strong>bordado personalizado</strong> de tu nombre, especialidad o el logotipo de tu clínica o empresa.
            </p>

            {/* Core Values / Features */}
            <div className="mt-8 space-y-3.5 w-full">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#FCE8EF] text-[#A8577F] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700">
                  <strong className="text-stone-900">Diseño Anatómico y Femenino:</strong> Cortes estudiados que se adaptan a la silueta con libertad de movimiento.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#FCE8EF] text-[#A8577F] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700">
                  <strong className="text-stone-900">Telas Certificadas Antifluido:</strong> Resistencia comprobada a salpicaduras, cloro y lavados industriales.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#FCE8EF] text-[#A8577F] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700">
                  <strong className="text-stone-900">Atención Personalizada de Fundadora a Cliente:</strong> Te guiamos en la toma de medidas y selección de tonos.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Call */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-4 w-full">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #A8577F 0%, #8C3D65 100%)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Hablar con el Taller por WhatsApp</span>
              </a>

              <span className="text-xs text-stone-500 text-center sm:text-left">
                📍 Neiva, Huila · Despachos a toda Colombia
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

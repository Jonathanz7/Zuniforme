import React from 'react';
import { Building2, Stethoscope, Sparkles, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { createWhatsAppLink } from '../utils/formatters';

export const DotacionesBanner: React.FC = () => {
  const dotacionMessage = `¡Hola ZUniforme! Me interesa cotizar una dotación empresarial / clínica para mi equipo. ¿Cuáles son los precios por mayor y opciones de bordado institucional?`;
  const waLink = createWhatsAppLink(dotacionMessage);

  return (
    <section id="dotaciones" className="py-16 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full filter blur-3xl opacity-20 pointer-events-none"
        style={{ background: '#A8577F' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full filter blur-3xl opacity-15 pointer-events-none"
        style={{ background: '#F4B8CC' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-stone-800/90 to-stone-900/90 rounded-3xl p-8 sm:p-12 lg:p-14 border border-stone-700/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8577F]/30 border border-[#A8577F]/50 text-[#F4B8CC] text-xs font-bold uppercase tracking-wider mb-4">
                <Building2 className="w-3.5 h-3.5" />
                Ventas Corporativas & Por Mayor
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                ¿Buscas uniformar tu clínica, consultorio o empresa?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                En <strong>ZUniforme</strong> creamos dotaciones integrales con precios especiales a partir de <strong>6 unidades</strong>. 
                Adaptamos los colores de la tela a la identidad corporativa de tu marca y bordamos con alta definición el logo de tu empresa y el nombre de cada colaborador.
              </p>

              {/* Sectors */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-200">
                <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <Check className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                  <span>Clínicas Odontológicas</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <Check className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                  <span>Estéticas & Spas</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <Check className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                  <span>Laboratorios Clínicos</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <Check className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                  <span>Clínicas Veterinarias</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <Check className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                  <span>Hospitales & IPS</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
                  <Check className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                  <span>Empresas & Hotelería</span>
                </div>
              </div>
            </div>

            {/* Right CTA Box */}
            <div className="lg:col-span-4 bg-stone-800/90 rounded-2xl p-6 border border-stone-700 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-[#A8577F] text-white flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-[#F4B8CC]" />
              </div>
              <h3 className="text-base font-bold text-white">Cotización Inmediata</h3>
              <p className="text-xs text-stone-400 mt-1 mb-5">
                Te enviamos catálogo de telas por mayor y tabla de descuentos por volumen vía WhatsApp.
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg hover:brightness-110 transition-all text-center"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Solicitar Cotización Dotación</span>
              </a>

              <span className="text-[11px] text-stone-400 mt-3 block">
                Facturación electrónica y envíos asegurados
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

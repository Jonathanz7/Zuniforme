import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      pregunta: '¿Hacen envíos a toda Colombia?',
      respuesta: '¡Sí! Nuestro taller principal está en Neiva (Huila), y despachamos a diario a Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Ibagué, Florencia, Pitalito y cualquier municipio de Colombia a través de transportadoras aliadas (Interrapidísimo, Servientrega, Envia).'
    },
    {
      pregunta: '¿Cómo funciona la tecnología antifluido de sus prendas?',
      respuesta: 'Trabajamos con telas certificadas (como antifluidos Lafayette y Universal) que cuentan con un recubrimiento especial que repele líquidos, sangre, salpicaduras y aerosoles. Además, resisten la decoloración con cloro moderado y no retienen olores corporales.'
    },
    {
      pregunta: '¿Puedo personalizar mi uniforme con mi nombre o logo?',
      respuesta: 'Totalmente. Ofrecemos servicio de bordado computarizado de alta precisión. Puedes bordar tu nombre, apellido y especialidad médica (ej. Odontóloga, Pediatra, Instrumentadora, etc.), así como el logotipo de tu clínica o consultorio.'
    },
    {
      pregunta: '¿Cómo elijo la talla correcta?',
      respuesta: 'En la ficha de cada producto encontrarás el botón de "Guía de Tallas" con las medidas exactas de busto, cintura y cadera en centímetros. Como nuestras prendas tienen elastano (spandex), se adaptan con suavidad a tu figura. Si tienes dudas, puedes escribirnos por WhatsApp con tus medidas y te asesoramos al instante.'
    },
    {
      pregunta: '¿Qué medios de pago reciben?',
      respuesta: 'Recibimos transferencias Bancolombia, Nequi, Daviplata, PSE y pagos con tarjeta mediante enlace de pago seguro. Para dotaciones empresariales emitimos cuenta de cobro y factura.'
    },
    {
      pregunta: '¿Cómo debo lavar y cuidar mi uniforme antifluido?',
      respuesta: 'Lavar en ciclo suave o normal con agua fría o tibia, preferiblemente con jabón líquido suave. Secar a la sombra o en secadora a temperatura baja. Gracias a la tecnología de la tela, prácticamente no requiere planchado.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F5] border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F4] text-[#8C3D65] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#A8577F]" />
            Dudas Comunes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Todo lo que necesitas saber sobre envíos, tallaje, telas antifluido y pedidos de ZUniforme.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-stone-800 hover:text-[#A8577F] transition-colors"
                >
                  <span className="pr-4">{faq.pregunta}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-[#A8577F]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-50 bg-[#FAF8F7]/50">
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

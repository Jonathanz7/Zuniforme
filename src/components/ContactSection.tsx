import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { createWhatsAppLink } from '../utils/formatters';
import { MessageCircle, Instagram, MapPin, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    mensaje: '',
    interes: 'Catálogo General'
  });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build direct WhatsApp link with form data for instant seamless connection
    const customMessage = `¡Hola ZUniforme! Mi nombre es ${formData.nombre}.\n` +
      `• *Teléfono:* ${formData.telefono}\n` +
      `• *Interés:* ${formData.interes}\n` +
      `• *Mensaje:* ${formData.mensaje}`;
    
    const waUrl = createWhatsAppLink(customMessage);
    window.open(waUrl, '_blank');
    setSentSuccess(true);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F4] text-[#8C3D65] text-xs font-bold uppercase tracking-wider mb-3 self-start">
              <MessageCircle className="w-3.5 h-3.5 text-[#A8577F]" />
              Atención Directa
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              ¿Tienes dudas o deseas una asesoría personalizada?
            </h2>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed">
              Estamos aquí para ayudarte a elegir tu uniforme soñado o coordinar la dotación de tu clínica. 
              Escríbenos directamente o visítanos en Neiva.
            </p>

            {/* Contact channels list */}
            <div className="mt-8 space-y-4">
              
              {/* WhatsApp Item */}
              <a
                href={createWhatsAppLink(`¡Hola ZUniforme! Deseo información sobre uniformes y dotaciones.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200/80 hover:border-[#25D366] hover:bg-[#F4FDF7] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">WhatsApp Oficial</h3>
                  <p className="text-sm sm:text-base font-extrabold text-stone-900 mt-0.5">{siteConfig.whatsappFormatoDisplay}</p>
                  <span className="text-xs text-[#128C7E] font-medium">Respuesta rápida · Clic para chatear</span>
                </div>
              </a>

              {/* Instagram Item */}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200/80 hover:border-[#E1306C] hover:bg-[#FFF5F8] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Instagram</h3>
                  <p className="text-sm sm:text-base font-extrabold text-stone-900 mt-0.5">@{siteConfig.instagramUsuario}</p>
                  <span className="text-xs text-[#DD2A7B] font-medium">Ver fotos de clientas & novedades</span>
                </div>
              </a>

              {/* Location & Hours */}
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200/80 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#A8577F] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-700">Taller & Punto de Atención</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{siteConfig.direccionLocal}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-stone-200/60">
                  <Clock className="w-5 h-5 text-[#A8577F] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-700">Horario de Atención</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{siteConfig.horarioAtencion}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF7F5] rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              Envíanos un mensaje
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 mb-6">
              Al enviar, se abrirá WhatsApp con tus datos listos para que no tengas que repetir nada.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Dra. Marcela Trujillo"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#A8577F] focus:outline-none focus:ring-2 focus:ring-[#F4B8CC]/50 text-sm text-stone-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    WhatsApp o Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="Ej: 312 456 7890"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#A8577F] focus:outline-none focus:ring-2 focus:ring-[#F4B8CC]/50 text-sm text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    ¿Qué te interesa?
                  </label>
                  <select
                    value={formData.interes}
                    onChange={(e) => setFormData({ ...formData, interes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#A8577F] focus:outline-none focus:ring-2 focus:ring-[#F4B8CC]/50 text-sm text-stone-800"
                  >
                    <option value="Catálogo General">Catálogo General</option>
                    <option value="Uniforme Quirúrgico">Uniforme Quirúrgico (Scrub)</option>
                    <option value="Chaqueta Antifluido">Chaqueta Antifluido</option>
                    <option value="Dotación para Clínica/Empresa">Dotación para Clínica / Empresa</option>
                    <option value="Personalización y Bordados">Personalización y Bordados</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Mensaje o Consulta específica
                </label>
                <textarea
                  rows={3}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Escribe aquí tu consulta, color deseado, talla aproximada o cantidad..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#A8577F] focus:outline-none focus:ring-2 focus:ring-[#F4B8CC]/50 text-sm text-stone-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #A8577F 0%, #8C3D65 100%)',
                }}
              >
                <Send className="w-4 h-4" />
                <span>Enviar consulta vía WhatsApp</span>
              </button>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-[#E8F8EE] border border-[#25D366]/30 text-xs text-[#128C7E] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>¡Mensaje preparado! Te hemos redirigido a WhatsApp para finalizar tu consulta.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

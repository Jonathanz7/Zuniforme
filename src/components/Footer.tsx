import React from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '../utils/formatters';
import { MessageCircle, Instagram, MapPin, Phone, Lock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const waLink = createWhatsAppLink(createGeneralWhatsAppMessage());

  return (
    <footer className="bg-[#1E181B] text-stone-300 pt-16 pb-28 sm:pb-24 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Marca colombiana nacida en Neiva, Huila. Diseñamos y confeccionamos uniformes médicos (scrubs) y ropa de trabajo antifluido con alta tecnología textil, estética femenina y ajuste anatómico.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#25D366] text-stone-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#E1306C] text-stone-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-white">Navegación</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-[#F4B8CC] transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-[#F4B8CC] transition-colors">Catálogo de Uniformes</a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-[#F4B8CC] transition-colors">Nuestra Historia</a>
              </li>
              <li>
                <a href="#dotaciones" className="hover:text-[#F4B8CC] transition-colors">Dotaciones Corporativas</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#F4B8CC] transition-colors">Contacto & Pedidos</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-white">Ubicación & Contacto</h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4B8CC] shrink-0 mt-0.5" />
                <span>{siteConfig.direccionLocal}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                <span>{siteConfig.whatsappFormatoDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#F4B8CC] shrink-0" />
                <span>@{siteConfig.instagramUsuario}</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-block text-[11px] px-2.5 py-1 rounded-full bg-stone-800 text-[#F4B8CC] border border-stone-700">
                🇨🇴 Envíos a todo el territorio colombiano
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar with ample right clearance so floating button never covers Modo Administrador */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 sm:pr-24 lg:pr-32">
          <p className="flex items-center gap-1 text-center sm:text-left">
            © {new Date().getFullYear()} ZUniforme. Confeccionado con{' '}
            <Heart className="w-3.5 h-3.5 text-[#F4B8CC] fill-[#F4B8CC]" /> en Neiva, Huila.
          </p>

          <div className="flex items-center gap-4">
            {/* Admin entry point */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-400 hover:text-[#F4B8CC] transition-colors text-[11px] border border-stone-700/60"
            >
              <Lock className="w-3 h-3 text-[#A8577F]" />
              <span>Modo Administrador (Catálogo)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

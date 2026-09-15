import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '../utils/formatters';
import { Menu, X, MessageCircle, Settings, Phone, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  productsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, productsCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waLink = createWhatsAppLink(createGeneralWhatsAppMessage());

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Catálogo', href: '#catalogo', badge: productsCount > 0 ? `${productsCount}` : undefined },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Dotaciones', href: '#dotaciones' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/70 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#inicio" className="group focus:outline-none focus:ring-2 focus:ring-[#A8577F] rounded-lg">
              <Logo size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-semibold text-stone-700 hover:text-[#A8577F] transition-colors rounded-full hover:bg-[#FDF0F5] relative group"
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#FCE8EF] text-[#A8577F] border border-[#F4B8CC]/40">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#A8577F] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </a>
              ))}
            </nav>

            {/* Actions: Admin & WhatsApp CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Admin panel trigger */}
              <button
                onClick={onOpenAdmin}
                type="button"
                className="p-2 text-stone-500 hover:text-[#A8577F] hover:bg-[#FAF0F4] rounded-full transition-colors border border-transparent hover:border-[#F4B8CC]/60"
                title="Gestor de catálogo (Modo Admin)"
                aria-label="Abrir panel de administración"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Primary WhatsApp CTA */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-white shadow-sm"
                style={{ background: '#25D366' }}
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-[#A8577F] hover:bg-stone-100 rounded-lg transition-colors"
                aria-label="Alternar menú móvil"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-stone-200 shadow-xl px-4 pt-3 pb-6 space-y-2 mt-2 transition-all">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-stone-700 hover:text-[#A8577F] hover:bg-[#FDF2F6] transition-colors"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#FCE8EF] text-[#A8577F]">
                      {link.badge} productos
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white shadow-md text-center"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Pedir por WhatsApp ({siteConfig.whatsappFormatoDisplay})
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <Settings className="w-4 h-4 text-[#A8577F]" />
                Modo Administrador (Editar Catálogo)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Top Banner Notice */}
      <div className="bg-[#FAF0F4] border-b border-[#F4B8CC]/40 text-center py-1.5 px-4 text-xs font-medium text-[#7C355A]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-bold text-[#A8577F]">
            <Sparkles className="w-3.5 h-3.5 text-[#A8577F]" />
            ZUniforme Neiva:
          </span>
          <span>Uniformes antifluidos de alta gama para profesionales de la salud y empresas.</span>
          <span className="hidden sm:inline text-[#A8577F] font-bold">🇨🇴 Envíos a todo el país.</span>
        </div>
      </div>
    </>
  );
};

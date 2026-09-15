import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from '../utils/formatters';
import { Menu, X, MessageCircle, Settings, Sparkles, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  productsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, productsCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-stone-200/80 ${
          isScrolled ? 'shadow-sm' : 'shadow-xs'
        }`}
      >
        {/* Top Notice Banner: Integrated in fixed header so it never clips or overlaps */}
        <div className="bg-[#FAF0F4] border-b border-[#F4B8CC]/40 text-center py-1.5 px-3 text-[11px] sm:text-xs font-medium text-[#7C355A]">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 font-bold text-[#A8577F]">
              <Sparkles className="w-3.5 h-3.5 text-[#A8577F]" />
              ZUniforme Neiva:
            </span>
            <span>Uniformes antifluidos de alta gama para profesionales de la salud y empresas.</span>
            <span className="hidden sm:inline text-[#A8577F] font-bold">🇨🇴 Envíos a todo el país.</span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-3.5'
            }`}
          >
            {/* Brand Logo */}
            <a
              href="#inicio"
              className="group focus:outline-none focus:ring-2 focus:ring-[#A8577F] rounded-lg shrink-0"
              aria-label="Ir al inicio de ZUniforme"
            >
              <Logo size="md" />
            </a>

            {/* Desktop Navigation (md: 768px en adelante) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-semibold text-stone-700 hover:text-[#A8577F] transition-colors rounded-full hover:bg-[#FDF0F5] relative group"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#FCE8EF] text-[#A8577F] border border-[#F4B8CC]/40">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#A8577F] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </a>
              ))}
            </nav>

            {/* Desktop Actions (md: 768px en adelante) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {/* Admin panel trigger */}
              <button
                onClick={onOpenAdmin}
                type="button"
                className="p-2.5 text-stone-500 hover:text-[#A8577F] hover:bg-[#FAF0F4] rounded-full transition-colors border border-transparent hover:border-[#F4B8CC]/60"
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

            {/* Mobile Controls (< 768px) */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Compact WhatsApp Direct Trigger */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-white shadow-sm text-xs font-bold transition-transform active:scale-95 min-h-[40px]"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span className="text-[11px]">WhatsApp</span>
              </a>

              {/* Hamburger Button with min 44x44px touch target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="min-w-[44px] min-h-[44px] p-2 text-stone-800 hover:text-[#A8577F] hover:bg-[#FCE8EF]/40 rounded-xl transition-colors flex items-center justify-center border border-stone-200/80 active:scale-95"
                aria-label="Abrir menú de navegación"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (< 768px) */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-stone-200 animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal de navegación"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F5]">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-xl transition-colors flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Vertical Navigation Links - Minimum 44px touch height */}
            <div className="p-4 space-y-1.5 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
                Secciones
              </p>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[48px] flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold text-stone-800 hover:text-[#A8577F] hover:bg-[#FAF0F4] active:bg-[#FCE8EF] transition-colors"
                >
                  <span className="font-heading">{link.name}</span>
                  <div className="flex items-center gap-1.5">
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#FCE8EF] text-[#8C3D65] border border-[#F4B8CC]/50">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </a>
              ))}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-stone-100 bg-[#FAF7F5]/80 space-y-3">
              {/* Primary WhatsApp Order Button */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold text-white shadow-md text-center active:scale-98 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
              >
                <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                <span>Pedir por WhatsApp</span>
              </a>

              {/* Admin Mode Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="min-h-[44px] w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-semibold text-stone-600 bg-white hover:bg-stone-100 border border-stone-200/80 transition-colors shadow-2xs"
              >
                <Settings className="w-4 h-4 text-[#A8577F]" />
                <span>Modo Administrador (Catálogo)</span>
              </button>

              {/* Boutique Info Footer */}
              <div className="text-center pt-2 text-[11px] text-stone-500 font-medium">
                📍 Taller & Boutique en Neiva (Huila) · Envíos a todo el país
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

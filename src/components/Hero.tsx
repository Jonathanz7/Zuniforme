import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Scissors, MapPin, MessageCircle, Eye } from 'lucide-react';
import { createWhatsAppLink, createGeneralWhatsAppMessage, formatCOP } from '../utils/formatters';
import { Product, SiteConfig } from '../types';
import { initialProducts } from '../data/products';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig';

interface HeroProps {
  featuredProduct?: Product;
  onSelectProduct?: (product: Product, initialColorName?: string) => void;
  siteConfig?: SiteConfig;
}

export const Hero: React.FC<HeroProps> = ({ featuredProduct, onSelectProduct, siteConfig = defaultSiteConfig }) => {
  const waLink = createWhatsAppLink(createGeneralWhatsAppMessage());

  // Use the provided product or fallback to the first initial product
  const product = featuredProduct || initialProducts[0];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [userSelectedVariant, setUserSelectedVariant] = useState(false);

  // Safe index in case variants array changed
  const safeVariantIndex =
    product?.variantesColor && selectedVariantIndex < product.variantesColor.length
      ? selectedVariantIndex
      : 0;

  const currentVariant = product?.variantesColor?.[safeVariantIndex];
  const displayImage =
    userSelectedVariant && currentVariant?.imagenes?.[0]
      ? currentVariant.imagenes[0]
      : (siteConfig?.imagenHero ||
         defaultSiteConfig.imagenHero ||
         currentVariant?.imagenes?.[0] ||
         'https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop');

  return (
    <section id="inicio" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
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

            {/* Headline with Poppins font-heading */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.18]">
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
            <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed sm:leading-loose">
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
                  <h2 className="font-heading text-xs font-bold text-stone-900 uppercase tracking-wider">Antifluido Real</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Telas con repelencia a fluidos y cloro</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-[#FCE8EF] text-[#A8577F] shrink-0">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xs font-bold text-stone-900 uppercase tracking-wider">Taller Propio</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Bordados y ajustes a tu medida</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-xl bg-[#FCE8EF] text-[#A8577F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xs font-bold text-stone-900 uppercase tracking-wider">Neiva a Colombia</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Envíos rápidos a todo el país</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card - Clickable to open full detail modal */}
              <div 
                onClick={() => onSelectProduct?.(product, currentVariant?.color)}
                className="group relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100 cursor-pointer transition-transform duration-300 hover:shadow-2xl"
              >
                <img
                  src={displayImage}
                  alt={`${product?.nombre || 'Conjunto Aura'} en color ${currentVariant?.color || 'Mauve'}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge on Image */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#A8577F] text-white shadow-md font-heading">
                    <Sparkles className="w-3 h-3" />
                    Producto Estrella
                  </span>
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute inset-0 bg-stone-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#A8577F]" />
                    <span>Ver detalles y comprar</span>
                  </span>
                </div>

                {/* Overlaid Card Info with Interactive Swatches */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FCE8EF] text-[#8C3D65]">
                        Colección Signature
                      </span>
                      <h3 
                        onClick={() => onSelectProduct?.(product, currentVariant?.color)}
                        className="font-heading text-sm font-bold text-stone-900 mt-1 cursor-pointer hover:text-[#A8577F] transition-colors"
                      >
                        {product?.nombre || 'Conjunto Aura'}
                      </h3>
                    </div>
                    <span className="font-heading text-sm font-bold text-[#A8577F] shrink-0">
                      {product?.precio ? formatCOP(product.precio) : '$135.000 COP'}
                    </span>
                  </div>
                  
                  {/* Interactive Swatches - Change photo live */}
                  <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[11px] text-stone-500 font-medium">
                        Color:{' '}
                        <strong className="text-stone-800 font-semibold">
                          {currentVariant?.color || 'Mauve ZUniforme'}
                        </strong>
                      </span>
                      <a 
                        href="#catalogo" 
                        className="text-[10px] text-[#A8577F] font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver en catálogo ↓
                      </a>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {product?.variantesColor && product.variantesColor.length > 0 ? (
                        product.variantesColor.map((variant, idx) => {
                          const isActive = idx === safeVariantIndex;
                          return (
                            <button
                              key={`${variant.color}-${idx}`}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedVariantIndex(idx);
                                setUserSelectedVariant(true);
                              }}
                              className={`w-6 h-6 rounded-full transition-all relative flex items-center justify-center cursor-pointer ${
                                isActive
                                  ? 'ring-2 ring-offset-2 ring-[#A8577F] scale-110 shadow-sm'
                                  : 'hover:scale-105 opacity-85 hover:opacity-100'
                              }`}
                              style={{
                                backgroundColor: variant.colorHex,
                                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
                              }}
                              title={`Seleccionar color ${variant.color}`}
                              aria-label={`Seleccionar color ${variant.color}`}
                            >
                              {isActive && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    backgroundColor:
                                      variant.colorHex?.toLowerCase() === '#ffffff' ? '#333' : '#fff',
                                  }}
                                />
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <span className="text-[11px] text-stone-400">Variantes disponibles</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Quality guarantee - with safe z-index and padding */}
              <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-6 z-10 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-[#F4B8CC]/40 flex items-center gap-2.5 sm:gap-3 max-w-[170px] sm:max-w-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FCE8EF] flex items-center justify-center text-[#A8577F] shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-stone-900">4-Way Stretch</p>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Comodidad 24/7</p>
                </div>
              </div>

              {/* Floating Badge 2: Bordado personalizado */}
              <div className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-4 z-10 bg-white/95 backdrop-blur-md py-2 px-3 sm:py-2.5 sm:px-4 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#A8577F] text-white flex items-center justify-center text-xs font-bold font-script shrink-0">
                  ZU
                </div>
                <div>
                  <p className="font-heading text-xs font-bold text-stone-900">Bordado Gratis</p>
                  <p className="text-[10px] text-stone-500">En compras &gt; 3 uds</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

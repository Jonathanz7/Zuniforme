import React, { useState } from 'react';
import { Product } from '../types';
import { formatCOP, createWhatsAppLink, createProductWhatsAppMessage } from '../utils/formatters';
import { Eye, MessageCircle, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product, selectedColorName?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  // Active color variant state
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentVariant = product.variantesColor[activeVariantIndex] || product.variantesColor[0];
  const currentImage = currentVariant?.imagenes[0] || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop';

  const waLink = createWhatsAppLink(
    createProductWhatsAppMessage(product, currentVariant?.color)
  );

  return (
    <article
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1"
    >
      {/* Image Container with Swatch Preview */}
      <div 
        className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onSelect(product, currentVariant?.color)}
      >
        <img
          src={currentImage}
          alt={`${product.nombre} en color ${currentVariant?.color || ''}`}
          className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.destacado && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#A8577F] text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              Destacado
            </span>
          )}
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-stone-700 shadow-xs border border-white/60">
            {product.categoria}
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product, currentVariant?.color);
            }}
            className="px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold shadow-lg hover:bg-[#A8577F] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver detalles y tallas</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        
        {/* Color Swatches Selection */}
        {product.variantesColor && product.variantesColor.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
              <span className="text-[11px] font-medium">Color:</span>
              <span className="text-[11px] font-semibold text-stone-700 truncate max-w-[140px]">
                {currentVariant?.color}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.variantesColor.map((variant, idx) => {
                const isActive = idx === activeVariantIndex;
                return (
                  <button
                    key={`${variant.color}-${idx}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVariantIndex(idx);
                    }}
                    onMouseEnter={() => setActiveVariantIndex(idx)}
                    className={`w-6 h-6 rounded-full transition-all relative flex items-center justify-center ${
                      isActive
                        ? 'ring-2 ring-offset-2 ring-[#A8577F] scale-110'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: variant.colorHex,
                      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                    }}
                    title={variant.color}
                    aria-label={`Seleccionar color ${variant.color}`}
                  >
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: variant.colorHex.toLowerCase() === '#ffffff' ? '#333' : '#fff'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Title */}
        <h3 
          onClick={() => onSelect(product, currentVariant?.color)}
          className="font-heading text-base font-bold text-stone-900 group-hover:text-[#A8577F] transition-colors line-clamp-1 cursor-pointer"
          title={product.nombre}
        >
          {product.nombre}
        </h3>

        {/* Short Description */}
        <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed flex-grow">
          {product.descripcion}
        </p>

        {/* Available Sizes preview pills */}
        {product.tallas && product.tallas.length > 0 && (
          <div className="mt-3 flex items-center gap-1 flex-wrap">
            <span className="text-[10px] text-stone-400 font-medium mr-1">Tallas:</span>
            {product.tallas.map((talla) => (
              <span
                key={talla}
                className="px-1.5 py-0.5 text-[10px] font-semibold bg-stone-100 text-stone-600 rounded"
              >
                {talla}
              </span>
            ))}
          </div>
        )}

        {/* Price & Actions Row */}
        <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] uppercase font-bold text-stone-400">Precio</span>
            <span className="font-heading text-sm sm:text-base font-bold text-stone-900">
              {formatCOP(product.precio)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick WhatsApp Inquiry */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl text-white shadow-xs hover:shadow-md transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
              }}
              title="Consultar disponibilidad en WhatsApp"
              aria-label={`Consultar disponibilidad de ${product.nombre} en WhatsApp`}
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>

            {/* View Details Button */}
            <button
              type="button"
              onClick={() => onSelect(product, currentVariant?.color)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-[#A8577F] bg-[#FAF0F4] hover:bg-[#F8E2EC] transition-colors border border-[#F4B8CC]/40"
            >
              Detalle
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};

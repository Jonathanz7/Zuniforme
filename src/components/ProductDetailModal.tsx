import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatCOP, createWhatsAppLink, createProductWhatsAppMessage } from '../utils/formatters';
import { SizeGuideModal } from './SizeGuideModal';
import { X, MessageCircle, Ruler, Check, Sparkles, Shield, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  initialColorName?: string;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialColorName,
  onClose,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Sync initial color if provided
  useEffect(() => {
    if (product && initialColorName) {
      const idx = product.variantesColor.findIndex(v => v.color === initialColorName);
      if (idx !== -1) {
        setSelectedVariantIndex(idx);
      }
    } else {
      setSelectedVariantIndex(0);
    }
    setActiveImageIndex(0);
    if (product && product.tallas && product.tallas.length > 0) {
      setSelectedSize(product.tallas[0]);
    }
  }, [product, initialColorName]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSizeGuide) {
          setShowSizeGuide(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showSizeGuide]);

  if (!product) return null;

  const currentVariant = product.variantesColor[selectedVariantIndex] || product.variantesColor[0];
  const images = currentVariant?.imagenes || [];
  const currentImage = images[activeImageIndex] || images[0] || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop';

  const waLink = createWhatsAppLink(
    createProductWhatsAppMessage(product, currentVariant?.color, selectedSize)
  );

  return (
    <>
      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-stone-100 text-stone-600 hover:text-stone-900 shadow-md backdrop-blur-md transition-all"
            aria-label="Cerrar detalle de producto"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 bg-stone-100 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
              
              {/* Main Preview */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
                <img
                  src={currentImage}
                  alt={`${product.nombre} - ${currentVariant?.color}`}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#A8577F] text-white shadow-sm">
                    {product.categoria}
                  </span>
                </div>
              </div>

              {/* Thumbnails list if variant has multiple pictures */}
              {images.length > 1 && (
                <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#A8577F] ring-2 ring-[#F4B8CC]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Fabric hint */}
              {product.tela && (
                <div className="mt-3 p-3 rounded-xl bg-white/80 border border-stone-200/60 text-xs text-stone-600 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#A8577F] shrink-0" />
                  <span className="truncate"><strong>Tela:</strong> {product.tela}</span>
                </div>
              )}
            </div>

            {/* Right Column: Information & Options */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              
              <div className="space-y-5">
                {/* Header info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A8577F]">
                      ZUniforme · Confección Neiva
                    </span>
                    {product.genero && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                        {product.genero}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                    {product.nombre}
                  </h2>

                  <div className="mt-2.5 flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-stone-900">
                      {formatCOP(product.precio)}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      (IVA incluido / Por unidad)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed">
                  {product.descripcion}
                </p>

                {/* Color Selector */}
                {product.variantesColor && product.variantesColor.length > 0 && (
                  <div className="pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        Color seleccionado:
                      </span>
                      <span className="text-xs font-bold text-[#A8577F]">
                        {currentVariant?.color}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {product.variantesColor.map((variant, idx) => {
                        const isSelected = idx === selectedVariantIndex;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedVariantIndex(idx);
                              setActiveImageIndex(0);
                            }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                              isSelected
                                ? 'border-[#A8577F] bg-[#FAF0F4] text-[#8C3D65] ring-2 ring-[#F4B8CC]/40'
                                : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: variant.colorHex }}
                            />
                            <span>{variant.color}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selector & Guide */}
                {product.tallas && product.tallas.length > 0 && (
                  <div className="pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        Talla disponible:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSizeGuide(true)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#A8577F] hover:underline"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Ver guía de tallas</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {product.tallas.map((talla) => {
                        const isSelected = talla === selectedSize;
                        return (
                          <button
                            key={talla}
                            type="button"
                            onClick={() => setSelectedSize(talla)}
                            className={`min-w-10 h-10 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center ${
                              isSelected
                                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            {talla}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Characteristics bullet points */}
                {product.caracteristicas && product.caracteristicas.length > 0 && (
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                      Especificaciones & Ventajas:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {product.caracteristicas.map((carac, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#A8577F] shrink-0 mt-0.5" />
                          <span>{carac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Bottom WhatsApp CTA Button */}
              <div className="mt-6 pt-5 border-t border-stone-200">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl text-sm sm:text-base font-bold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  }}
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Consultar disponibilidad por WhatsApp</span>
                </a>
                <p className="text-center text-[11px] text-stone-400 mt-2">
                  Atención directa desde Neiva · Te enviamos fotos de cómo luce la prenda
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Embedded Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </>
  );
};

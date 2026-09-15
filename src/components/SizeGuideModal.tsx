import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-[#FAF7F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FCE8EF] text-[#A8577F] flex items-center justify-center">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Guía de Tallas ZUniforme</h3>
              <p className="text-xs text-stone-500">Medidas corporales en centímetros (cm)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors"
            aria-label="Cerrar guía de tallas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8577F]">Uniformes Femeninos & Scrubs</span>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <th className="py-2.5 px-3 rounded-l-lg">Talla</th>
                    <th className="py-2.5 px-3">Busto (cm)</th>
                    <th className="py-2.5 px-3">Cintura (cm)</th>
                    <th className="py-2.5 px-3">Cadera (cm)</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Estatura sugerida</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-600">
                  <tr className="hover:bg-[#FFF8FA]">
                    <td className="py-2.5 px-3 font-bold text-stone-900">XS (32)</td>
                    <td className="py-2.5 px-3">82 - 86</td>
                    <td className="py-2.5 px-3">62 - 66</td>
                    <td className="py-2.5 px-3">88 - 92</td>
                    <td className="py-2.5 px-3">1.50 - 1.60 m</td>
                  </tr>
                  <tr className="hover:bg-[#FFF8FA]">
                    <td className="py-2.5 px-3 font-bold text-stone-900">S (34)</td>
                    <td className="py-2.5 px-3">87 - 92</td>
                    <td className="py-2.5 px-3">67 - 72</td>
                    <td className="py-2.5 px-3">93 - 98</td>
                    <td className="py-2.5 px-3">1.55 - 1.65 m</td>
                  </tr>
                  <tr className="hover:bg-[#FFF8FA] bg-[#FAF3F6]/50">
                    <td className="py-2.5 px-3 font-bold text-[#A8577F]">M (36)</td>
                    <td className="py-2.5 px-3">93 - 98</td>
                    <td className="py-2.5 px-3">73 - 78</td>
                    <td className="py-2.5 px-3">99 - 104</td>
                    <td className="py-2.5 px-3">1.60 - 1.70 m</td>
                  </tr>
                  <tr className="hover:bg-[#FFF8FA]">
                    <td className="py-2.5 px-3 font-bold text-stone-900">L (38)</td>
                    <td className="py-2.5 px-3">99 - 104</td>
                    <td className="py-2.5 px-3">79 - 84</td>
                    <td className="py-2.5 px-3">105 - 110</td>
                    <td className="py-2.5 px-3">1.65 - 1.75 m</td>
                  </tr>
                  <tr className="hover:bg-[#FFF8FA]">
                    <td className="py-2.5 px-3 font-bold text-stone-900">XL (40)</td>
                    <td className="py-2.5 px-3">105 - 112</td>
                    <td className="py-2.5 px-3">85 - 92</td>
                    <td className="py-2.5 px-3">111 - 118</td>
                    <td className="py-2.5 px-3">1.65 - 1.80 m</td>
                  </tr>
                  <tr className="hover:bg-[#FFF8FA]">
                    <td className="py-2.5 px-3 font-bold text-stone-900">XXL (42)</td>
                    <td className="py-2.5 px-3">113 - 120</td>
                    <td className="py-2.5 px-3">93 - 100</td>
                    <td className="py-2.5 px-3">119 - 126</td>
                    <td className="py-2.5 px-3">1.65 - 1.80 m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-stone-200/80 text-xs text-stone-600 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A8577F] shrink-0 mt-0.5" />
              <span><strong>Tela con Spandex:</strong> Nuestras prendas stretch ceden suavemente adaptándose a tu cuerpo. Si estás entre dos tallas y prefieres entallado, elige la menor.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A8577F] shrink-0 mt-0.5" />
              <span><strong>Asesoría por WhatsApp:</strong> Si tienes dudas sobre tu contextura o largo de bota, escríbenos y con gusto te asesoramos con fotos reales de prueba.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

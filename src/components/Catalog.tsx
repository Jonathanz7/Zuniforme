import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  onSelectProduct: (product: Product, initialColorName?: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ products, onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedColor, setSelectedColor] = useState('Todos');
  const [sortBy, setSortBy] = useState<'destacados' | 'precio-menor' | 'precio-mayor' | 'nombre'>('destacados');

  // Extract unique colors across all loaded products dynamically
  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.variantesColor?.forEach((v) => {
        if (v.color && !map.has(v.color)) {
          map.set(v.color, v.colorHex);
        }
      });
    });
    return Array.from(map.entries()).map(([color, colorHex]) => ({ color, colorHex }));
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.variantesColor?.some(v => v.color.toLowerCase().includes(q));

      // Category filter
      const matchCategory =
        selectedCategory === 'Todos' || p.categoria.toLowerCase() === selectedCategory.toLowerCase();

      // Color filter
      const matchColor =
        selectedColor === 'Todos' ||
        p.variantesColor?.some(v => v.color.toLowerCase() === selectedColor.toLowerCase());

      return matchSearch && matchCategory && matchColor;
    }).sort((a, b) => {
      if (sortBy === 'destacados') {
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        return 0;
      }
      if (sortBy === 'precio-menor') {
        return (a.precio || 0) - (b.precio || 0);
      }
      if (sortBy === 'precio-mayor') {
        return (b.precio || 0) - (a.precio || 0);
      }
      if (sortBy === 'nombre') {
        return a.nombre.localeCompare(b.nombre);
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedColor, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'Todos' || selectedColor !== 'Todos';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedColor('Todos');
    setSortBy('destacados');
  };

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#FAF7F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8EF] text-[#8C3D65] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A8577F]" />
            Catálogo Oficial 2025
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Colección Antifluido & Ropa de Trabajo
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Explora nuestros modelos diseñados para el sector salud y dotaciones de empresas. 
            Haz clic en los swatches para ver la prenda en cada tono y consulta disponibilidad inmediata por WhatsApp.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-stone-200/80 mb-8 space-y-5">
          
          {/* Top row: Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, tela, categoría..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 focus:border-[#A8577F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F4B8CC]/50 text-xs sm:text-sm text-stone-800 transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Quick Counter */}
            <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
              <span className="text-xs font-semibold text-stone-500">
                Mostrando <strong className="text-stone-900">{filteredProducts.length}</strong> productos
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-stone-700 text-xs rounded-xl py-2 px-3 focus:outline-none focus:border-[#A8577F] cursor-pointer"
                >
                  <option value="destacados">Destacados</option>
                  <option value="precio-menor">Precio: Menor a Mayor</option>
                  <option value="precio-mayor">Precio: Mayor a Menor</option>
                  <option value="nombre">Nombre (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Middle row: Category Tabs */}
          <div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#A8577F] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom row: Color Swatches Filter */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1">
                Filtrar por color:
              </span>
              
              <button
                type="button"
                onClick={() => setSelectedColor('Todos')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedColor === 'Todos'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Todos
              </button>

              {availableColors.map(({ color, colorHex }) => {
                const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-[#A8577F] bg-[#FAF0F4] text-[#8C3D65] ring-1 ring-[#A8577F]'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                    title={color}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                      style={{ backgroundColor: colorHex }}
                    />
                    <span className="hidden sm:inline text-[11px]">{color}</span>
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#A8577F] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>

        </div>

        {/* Product Grid: 1 col mobile, 2-3 col tablet, 4 col desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF0F4] text-[#A8577F] flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">No encontramos productos con esos filtros</h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Prueba cambiando la búsqueda, seleccionando otra categoría o limpiando los filtros seleccionados.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#A8577F] text-white text-xs font-bold hover:bg-[#8C3D65] transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

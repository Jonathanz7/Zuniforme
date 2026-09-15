import React, { useState } from 'react';
import { Product, ColorVariant } from '../types';
import { CATEGORIES } from '../data/products';
import { 
  downloadProductsJSON, 
  generateProductsTypeScriptCode, 
  resetToDefaultProducts 
} from '../utils/productStorage';
import { 
  X, Plus, Trash2, Edit, Download, Copy, Check, Lock, 
  RotateCcw, Sparkles, Image as ImageIcon, Upload, Save, HelpCircle, Palette
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProducts,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [activeTab, setActiveTab] = useState<'lista' | 'editor' | 'github'>('lista');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password for store owner
    if (passwordInput.trim().toLowerCase() === 'zuniforme' || passwordInput.trim() === 'admin2025' || passwordInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta. (Prueba con "zuniforme")');
    }
  };

  const handleStartCreate = () => {
    const newProduct: Product = {
      id: `zu-${Date.now()}`,
      nombre: '',
      categoria: 'Uniformes Quirúrgicos',
      descripcion: '',
      precio: 125000,
      tallas: ['XS', 'S', 'M', 'L', 'XL'],
      genero: 'Femenino',
      destacado: false,
      tela: 'Antifluido Lafayette 4-Way Stretch',
      caracteristicas: [
        'Repelencia a salpicaduras y fluidos',
        'Secado ultra rápido y tela suave'
      ],
      variantesColor: [
        {
          color: 'Mauve ZUniforme',
          colorHex: '#A8577F',
          imagenes: [
            'https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop'
          ]
        }
      ]
    };
    setEditingProduct(newProduct);
    setActiveTab('editor');
  };

  const handleStartEdit = (p: Product) => {
    setEditingProduct(JSON.parse(JSON.stringify(p)));
    setActiveTab('editor');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('¿Estás segura de eliminar este producto del catálogo?')) {
      const updated = products.filter(p => p.id !== id);
      onSaveProducts(updated);
      showNotification('Producto eliminado del catálogo local');
    }
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.nombre.trim()) {
      alert('Por favor ingresa un nombre para el producto');
      return;
    }

    if (editingProduct.variantesColor.length === 0) {
      alert('Debes agregar al menos una variante de color');
      return;
    }

    const index = products.findIndex(p => p.id === editingProduct.id);
    let updatedList: Product[];
    if (index >= 0) {
      updatedList = [...products];
      updatedList[index] = editingProduct;
    } else {
      updatedList = [editingProduct, ...products];
    }

    onSaveProducts(updatedList);
    showNotification('¡Producto guardado exitosamente en el catálogo!');
    setActiveTab('lista');
    setEditingProduct(null);
  };

  // Color variant helpers inside editor
  const handleAddVariant = () => {
    if (!editingProduct) return;
    const newVariant: ColorVariant = {
      color: 'Nuevo Color',
      colorHex: '#F4B8CC',
      imagenes: [
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop'
      ]
    };
    setEditingProduct({
      ...editingProduct,
      variantesColor: [...editingProduct.variantesColor, newVariant]
    });
  };

  const handleRemoveVariant = (idx: number) => {
    if (!editingProduct) return;
    if (editingProduct.variantesColor.length <= 1) {
      alert('El producto debe tener al menos una variante de color');
      return;
    }
    const filtered = editingProduct.variantesColor.filter((_, i) => i !== idx);
    setEditingProduct({ ...editingProduct, variantesColor: filtered });
  };

  const handleVariantChange = (idx: number, field: keyof ColorVariant, value: any) => {
    if (!editingProduct) return;
    const updated = [...editingProduct.variantesColor];
    updated[idx] = { ...updated[idx], [field]: value };
    setEditingProduct({ ...editingProduct, variantesColor: updated });
  };

  const handleImageFileUpload = (variantIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && editingProduct) {
        const updated = [...editingProduct.variantesColor];
        updated[variantIndex].imagenes = [reader.result, ...updated[variantIndex].imagenes];
        setEditingProduct({ ...editingProduct, variantesColor: updated });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (window.confirm('¿Restablecer el catálogo a los productos originales de ZUniforme?')) {
      const reset = resetToDefaultProducts();
      onSaveProducts(reset);
      showNotification('Catálogo restablecido al estado original');
    }
  };

  const handleCopyCode = () => {
    const code = generateProductsTypeScriptCode(products);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
    showNotification('¡Código TypeScript copiado al portapapeles!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF7F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A8577F] text-white flex items-center justify-center font-bold">
              ZU
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                Gestor de Catálogo (Panel Administrador)
              </h2>
              <p className="text-xs text-stone-500">
                Agrega, edita o elimina prendas sin tocar código
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors"
            aria-label="Cerrar panel de administración"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications Toast */}
        {notification && (
          <div className="bg-[#25D366] text-white px-6 py-2 text-xs font-bold flex items-center justify-between">
            <span>{notification}</span>
            <button onClick={() => setNotification(null)}>✕</button>
          </div>
        )}

        {/* Password Protection Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FCE8EF] text-[#A8577F] flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-stone-900">Acceso Administrador</h3>
              <p className="text-xs text-stone-500 mt-1">
                Ingresa la clave para gestionar productos y fotos del catálogo.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Contraseña (ej. zuniforme)"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#A8577F] focus:outline-none text-center text-sm"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1.5">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white text-xs uppercase tracking-wider"
                style={{ background: '#A8577F' }}
              >
                Ingresar al Administrador
              </button>

              <p className="text-[11px] text-stone-400">
                Clave por defecto: <strong className="text-stone-600">zuniforme</strong>
              </p>
            </form>
          </div>
        ) : (
          <>
            {/* Nav Tabs */}
            <div className="flex items-center justify-between px-6 pt-3 border-b border-stone-200 bg-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('lista')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === 'lista'
                      ? 'border-[#A8577F] text-[#A8577F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Productos ({products.length})
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
                      activeTab === 'editor'
                        ? 'border-[#A8577F] text-[#A8577F]'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {editingProduct.id.startsWith('zu-') ? 'Editando Producto' : 'Nuevo Producto'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab('github')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'github'
                      ? 'border-[#A8577F] text-[#A8577F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Guardar Permanente en GitHub / Vercel</span>
                </button>
              </div>

              {activeTab === 'lista' && (
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#A8577F] hover:bg-[#8C3D65] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Producto</span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto flex-grow">
              
              {/* TAB 1: PRODUCT LIST */}
              {activeTab === 'lista' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                    <span>
                      Los cambios que realices se guardan inmediatamente en tu navegador y actualizan la vista del catálogo.
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[#A8577F] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Restablecer iniciales
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {products.map((prod) => {
                      const firstImg = prod.variantesColor[0]?.imagenes[0];
                      return (
                        <div
                          key={prod.id}
                          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F5] border border-stone-200 hover:border-stone-300 transition-all gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                              {firstImg ? (
                                <img
                                  src={firstImg}
                                  alt={prod.nombre}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <ImageIcon className="w-6 h-6 m-auto text-stone-400" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-stone-900">{prod.nombre}</h4>
                                {prod.destacado && (
                                  <span className="text-[10px] bg-[#A8577F] text-white px-2 py-0.5 rounded-full font-bold">
                                    Destacado
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500">
                                {prod.categoria} · {prod.variantesColor.length} colores · {prod.precio ? `$${prod.precio.toLocaleString('es-CO')} COP` : 'Sin precio'}
                              </p>
                              {/* Swatches preview */}
                              <div className="flex items-center gap-1 mt-1">
                                {prod.variantesColor.map((v, i) => (
                                  <span
                                    key={i}
                                    className="w-3 h-3 rounded-full border border-stone-300 inline-block"
                                    style={{ backgroundColor: v.colorHex }}
                                    title={v.color}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(prod)}
                              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                              title="Editar producto"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT EDITOR FORM */}
              {activeTab === 'editor' && editingProduct && (
                <form onSubmit={handleSaveProductForm} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Nombre del producto *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.nombre}
                        onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
                        placeholder="Ej: Conjunto Quirúrgico Aura"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#A8577F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Categoría *
                      </label>
                      <select
                        value={editingProduct.categoria}
                        onChange={(e) => setEditingProduct({ ...editingProduct, categoria: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#A8577F] focus:outline-none bg-white"
                      >
                        {CATEGORIES.filter(c => c !== 'Todos').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Precio en Pesos Colombianos (COP)
                      </label>
                      <input
                        type="number"
                        value={editingProduct.precio || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, precio: Number(e.target.value) || undefined })}
                        placeholder="Ej: 135000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#A8577F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        Tela / Composición
                      </label>
                      <input
                        type="text"
                        value={editingProduct.tela || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, tela: e.target.value })}
                        placeholder="Ej: Antifluido Lafayette 4-Way Stretch"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#A8577F] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Descripción del producto
                    </label>
                    <textarea
                      rows={3}
                      value={editingProduct.descripcion}
                      onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
                      placeholder="Describe la silueta, cuello, bolsillos y beneficios de la prenda..."
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-[#A8577F] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Options row */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                      <input
                        type="checkbox"
                        checked={editingProduct.destacado || false}
                        onChange={(e) => setEditingProduct({ ...editingProduct, destacado: e.target.checked })}
                        className="w-4 h-4 rounded text-[#A8577F] focus:ring-[#A8577F]"
                      />
                      <span>Destacar este producto en la parte superior</span>
                    </label>
                  </div>

                  {/* Color Variants Section */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">Variantes de Color & Fotografías</h4>
                        <p className="text-xs text-stone-500">Cada variante define el color, el swatch y las fotos que se muestran.</p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir Color</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editingProduct.variantesColor.map((variant, vIdx) => (
                        <div key={vIdx} className="p-4 rounded-2xl bg-[#FAF7F5] border border-stone-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-700">Color #{vIdx + 1}</span>
                            {editingProduct.variantesColor.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveVariant(vIdx)}
                                className="text-xs text-red-500 hover:underline flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Quitar color</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-600 mb-1">Nombre del Color</label>
                              <input
                                type="text"
                                value={variant.color}
                                onChange={(e) => handleVariantChange(vIdx, 'color', e.target.value)}
                                placeholder="Ej: Mauve ZUniforme"
                                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-stone-600 mb-1">Código Hex / Swatch</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={variant.colorHex}
                                  onChange={(e) => handleVariantChange(vIdx, 'colorHex', e.target.value)}
                                  className="w-8 h-8 rounded-lg border border-stone-300 cursor-pointer p-0.5"
                                />
                                <input
                                  type="text"
                                  value={variant.colorHex}
                                  onChange={(e) => handleVariantChange(vIdx, 'colorHex', e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white uppercase font-mono"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Image URLs or Upload */}
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                              URL de Fotografía principal o Subir imagen
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={variant.imagenes[0] || ''}
                                onChange={(e) => {
                                  const updatedImgs = [...variant.imagenes];
                                  updatedImgs[0] = e.target.value;
                                  handleVariantChange(vIdx, 'imagenes', updatedImgs);
                                }}
                                placeholder="https://ejemplo.com/foto-uniforme.jpg"
                                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                              />

                              <label className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Subir</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      handleImageFileUpload(vIdx, e.target.files[0]);
                                    }
                                  }}
                                />
                              </label>
                            </div>

                            {/* Image preview */}
                            {variant.imagenes[0] && (
                              <div className="mt-2 flex items-center gap-2">
                                <div className="w-12 h-14 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                                  <img
                                    src={variant.imagenes[0]}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <span className="text-[11px] text-stone-500">
                                  Vista previa de foto asignada a este color.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form buttons */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('lista')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#A8577F] hover:bg-[#8C3D65] transition-colors flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Cambios</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: GITHUB & VERCEL PERMANENT EXPORT INSTRUCTIONS */}
              {activeTab === 'github' && (
                <div className="space-y-6 text-stone-800">
                  <div className="bg-[#FAF0F4] p-5 rounded-2xl border border-[#F4B8CC]/60 space-y-2">
                    <h3 className="text-sm font-bold text-[#8C3D65] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#A8577F]" />
                      Cómo guardar los cambios de forma permanente en Vercel
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Como tu sitio no usa una base de datos de pago y se despliega gratis en Vercel, 
                      los cambios que editas aquí quedan guardados de forma inmediata en tu navegador. 
                      Para que los clientes de todo el mundo vean los productos nuevos, solo debes actualizar el archivo de datos en tu repositorio de GitHub:
                    </p>
                  </div>

                  {/* Step by step */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="w-6 h-6 rounded-full bg-[#A8577F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        1
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900">Descarga o copia los datos actualizados</h4>
                        <p className="text-stone-600 mt-0.5">
                          Usa los botones de abajo para descargar el archivo <code className="bg-stone-200 px-1 rounded">products.json</code> o copiar el código para <code className="bg-stone-200 px-1 rounded">src/data/products.ts</code>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="w-6 h-6 rounded-full bg-[#A8577F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        2
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900">Ve a tu repositorio en GitHub</h4>
                        <p className="text-stone-600 mt-0.5">
                          Abre tu GitHub, entra a la carpeta <code className="bg-stone-200 px-1 rounded">src/data/products.ts</code> (o <code className="bg-stone-200 px-1 rounded">src/data/products.json</code>) y dale clic al lápiz para editar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="w-6 h-6 rounded-full bg-[#A8577F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        3
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900">Pega el contenido y haz Commit</h4>
                        <p className="text-stone-600 mt-0.5">
                          Guarda el commit en la rama principal (main). Vercel reconstruirá tu sitio en 30 segundos automáticamente y los nuevos productos estarán en línea de inmediato.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => downloadProductsJSON(products)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar products.json</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#A8577F] text-white text-xs font-bold hover:bg-[#8C3D65] transition-colors flex items-center justify-center gap-2"
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode ? '¡Código Copiado!' : 'Copiar código para src/data/products.ts'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};

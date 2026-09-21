import React, { useState, useMemo } from 'react';
import { Product, ColorVariant } from '../types';
import { CATEGORIES } from '../data/products';
import { 
  downloadProductsJSON, 
  generateProductsTypeScriptCode, 
  resetToDefaultProducts 
} from '../utils/productStorage';
import { compressAndResizeImage, compressBase64Image } from '../utils/imageCompressor';
import { 
  X, Plus, Trash2, Edit, Download, Copy, Check, Lock, 
  RotateCcw, Sparkles, Image as ImageIcon, Upload, Save,
  AlertCircle, CheckCircle2, Loader2, ShieldCheck,
  ExternalLink, Server, CloudUpload
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
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [activeTab, setActiveTab] = useState<'lista' | 'editor' | 'respaldo'>('lista');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [uploadingVariantIdx, setUploadingVariantIdx] = useState<number | null>(null);
  const [uploadStatusText, setUploadStatusText] = useState<string>('');
  const [isMigratingBase64, setIsMigratingBase64] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState<{ current: number; total: number; percent: number } | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
    commitUrl?: string;
  } | null>(null);

  // Contar cuántas imágenes existen en formato base64 en todo el catálogo
  const base64ImagesCount = useMemo(() => {
    let count = 0;
    products.forEach((p) => {
      p.variantesColor?.forEach((v) => {
        v.imagenes?.forEach((img) => {
          if (typeof img === 'string' && img.startsWith('data:image')) {
            count++;
          }
        });
      });
    });
    return count;
  }, [products]);

  if (!isOpen) return null;

  const showNotification = (
    text: string, 
    type: 'success' | 'error' | 'info' = 'success',
    commitUrl?: string
  ) => {
    setNotification({ text, type, commitUrl });
    if (type !== 'error') {
      setTimeout(() => setNotification(null), 8000);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passwordInput.trim();
    if (!cleanPass) {
      setPasswordError('Por favor ingresa tu contraseña de administrador');
      return;
    }

    // Permitir acceso visual al panel y registrar la contraseña para enviarla a /api/update-catalog
    setAdminPassword(cleanPass);
    setIsAuthenticated(true);
    setPasswordError('');
  };

  /**
   * Envía el catálogo a la función serverless segura en Vercel (/api/update-catalog).
   * El token de GitHub NUNCA toca el navegador, vive exclusivamente en las variables de entorno de Vercel.
   */
  const publishToVercel = async (productsToPublish: Product[]): Promise<boolean> => {
    setIsPublishing(true);
    showNotification('Enviando catálogo al servidor seguro de Vercel...', 'info');

    try {
      const response = await fetch('/api/update-catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminPassword: adminPassword || passwordInput.trim(),
          products: productsToPublish,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        showNotification(
          data.message || '✅ Catálogo publicado, tu sitio se actualizará en menos de un minuto.',
          'success',
          data.commitUrl
        );
        return true;
      } else {
        const errorMsg = data.error || `Error HTTP ${response.status}: ${response.statusText}`;
        showNotification(
          `Guardado en tu navegador. Aviso de Vercel: ${errorMsg}`,
          'error'
        );
        return false;
      }
    } catch (err: any) {
      showNotification(
        `Guardado en tu navegador. No se pudo contactar la función serverless (/api/update-catalog): ${err?.message || 'Error de conexión'}. Si aún no has desplegado a Vercel, puedes usar la pestaña "Respaldo Manual".`,
        'error'
      );
      return false;
    } finally {
      setIsPublishing(false);
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

  const handleDeleteProduct = async (id: string) => {
    const prodToDelete = products.find(p => p.id === id);
    const prodName = prodToDelete?.nombre || 'prenda';

    if (window.confirm(`¿Estás segura de eliminar "${prodName}" del catálogo?`)) {
      const updated = products.filter(p => p.id !== id);
      onSaveProducts(updated);
      await publishToVercel(updated);
    }
  };

  const handleSaveProductForm = async (e: React.FormEvent) => {
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
    const isNew = index < 0;
    let updatedList: Product[];
    if (!isNew) {
      updatedList = [...products];
      updatedList[index] = editingProduct;
    } else {
      updatedList = [editingProduct, ...products];
    }

    // 1. Guardar de inmediato en memoria y localStorage del navegador
    onSaveProducts(updatedList);
    setActiveTab('lista');
    setEditingProduct(null);

    // 2. Publicar a través de la función serverless segura
    await publishToVercel(updatedList);
  };

  const handleManualSyncNow = async () => {
    await publishToVercel(products);
  };

  // Ayudantes para variantes de color
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

  /**
   * Sube una sola imagen a Vercel Blob usando api/upload-image.
   * Primero redimensiona y comprime la imagen a máx 1600px y calidad JPEG 0.8 en el navegador con canvas,
   * reduciendo drásticamente su tamaño y protegiendo la cuota y velocidad de Vercel.
   */
  const handleImageFileUpload = async (variantIndex: number, file: File) => {
    if (!editingProduct) return;

    const password = adminPassword || passwordInput.trim();
    if (!password) {
      showNotification('Ingresa tu contraseña de administrador para subir imágenes a Vercel Blob.', 'error');
      return;
    }

    setUploadingVariantIdx(variantIndex);
    setUploadStatusText('Comprimiendo imagen (máx 1600px)...');

    try {
      // 1. Comprimir en cliente con Canvas
      const compressed = await compressAndResizeImage(file, 1600, 0.8);
      
      const kbSize = Math.round(compressed.compressedSize / 1024);
      setUploadStatusText(`Subiendo a Vercel Blob (${kbSize} KB)...`);

      // 2. Subir imagen individual a api/upload-image
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminPassword: password,
          filename: file.name,
          image: compressed.dataUrl,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Error HTTP ${response.status}: ${response.statusText}`);
      }

      // 3. Asignar la URL permanente retornada por Vercel Blob
      const newImageUrl = data.url;
      const updated = [...editingProduct.variantesColor];
      // Asignar como imagen principal para este color
      const currentImgs = updated[variantIndex].imagenes || [];
      updated[variantIndex].imagenes = [newImageUrl, ...currentImgs.filter((u) => u !== newImageUrl)];
      setEditingProduct({ ...editingProduct, variantesColor: updated });

      showNotification(
        `✅ Foto optimizada (-${compressed.reductionPercentage}%) y subida a Vercel Blob.`,
        'success'
      );
    } catch (err: any) {
      showNotification(
        `Error al subir a Vercel Blob: ${err?.message || 'Error desconocido'}`,
        'error'
      );
    } finally {
      setUploadingVariantIdx(null);
      setUploadStatusText('');
    }
  };

  /**
   * Migración automática de todas las imágenes Base64 existentes a Vercel Blob.
   * Itera sobre cada imagen en base64, la sube a Vercel Blob y actualiza el catálogo con la URL resultante.
   */
  const handleMigrateBase64Images = async () => {
    const password = adminPassword || passwordInput.trim();
    if (!password) {
      showNotification('Ingresa tu contraseña de administrador para autorizar la migración a Vercel Blob.', 'error');
      return;
    }

    interface Base64Item {
      prodId: string;
      variantIdx: number;
      imgIdx: number;
      base64: string;
      prodName: string;
      colorName: string;
    }

    const itemsToMigrate: Base64Item[] = [];
    products.forEach((prod) => {
      prod.variantesColor?.forEach((variant, vIdx) => {
        variant.imagenes?.forEach((img, iIdx) => {
          if (typeof img === 'string' && img.startsWith('data:image')) {
            itemsToMigrate.push({
              prodId: prod.id,
              variantIdx: vIdx,
              imgIdx: iIdx,
              base64: img,
              prodName: prod.nombre,
              colorName: variant.color,
            });
          }
        });
      });
    });

    if (itemsToMigrate.length === 0) {
      showNotification('No hay imágenes en base64 para migrar en este momento.', 'info');
      return;
    }

    if (!window.confirm(`Se migrarán ${itemsToMigrate.length} foto(s) Base64 a Vercel Blob. ¿Deseas iniciar la migración?`)) {
      return;
    }

    setIsMigratingBase64(true);
    setMigrationProgress({ current: 0, total: itemsToMigrate.length, percent: 0 });

    try {
      const updatedProducts: Product[] = JSON.parse(JSON.stringify(products));

      for (let i = 0; i < itemsToMigrate.length; i++) {
        const item = itemsToMigrate[i];
        setMigrationProgress({
          current: i + 1,
          total: itemsToMigrate.length,
          percent: Math.round(((i + 1) / itemsToMigrate.length) * 100),
        });

        // Comprimir si es posible
        let payloadImage = item.base64;
        try {
          const comp = await compressBase64Image(item.base64, 1600, 0.8);
          payloadImage = comp.dataUrl;
        } catch {
          // Si falla compresión en canvas, usa el original
        }

        const safeColor = item.colorName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const filename = `${item.prodId}-${safeColor}.jpg`;

        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminPassword: password,
            filename,
            image: payloadImage,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success || !data.url) {
          throw new Error(
            `Fallo en imagen ${i + 1} (${item.prodName} - ${item.colorName}): ${data.error || 'Error de subida a Vercel Blob'}`
          );
        }

        // Reemplazar la URL base64 por la URL de Vercel Blob
        const targetProd = updatedProducts.find((p) => p.id === item.prodId);
        if (targetProd && targetProd.variantesColor[item.variantIdx]) {
          targetProd.variantesColor[item.variantIdx].imagenes[item.imgIdx] = data.url;
        }
      }

      // Guardar localmente
      onSaveProducts(updatedProducts);

      // Publicar de inmediato a GitHub/Vercel sin fotos pesadas
      showNotification('✅ Fotos migradas a Vercel Blob. Publicando catálogo optimizado...', 'info');
      await publishToVercel(updatedProducts);
      showNotification('🎉 ¡Migración completada exitosamente! Tu catálogo ya no tiene imágenes base64.', 'success');
    } catch (err: any) {
      showNotification(`Error en migración: ${err?.message || 'Error desconocido'}`, 'error');
    } finally {
      setIsMigratingBase64(false);
      setMigrationProgress(null);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Restablecer el catálogo a los productos originales de ZUniforme?')) {
      const reset = resetToDefaultProducts();
      onSaveProducts(reset);
      showNotification('Catálogo restablecido al estado original', 'info');
    }
  };

  const handleCopyCode = () => {
    const code = generateProductsTypeScriptCode(products);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
    showNotification('¡Código TypeScript copiado al portapapeles!', 'success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF7F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A8577F] text-white flex items-center justify-center font-bold">
              ZU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  Gestor de Catálogo ZUniforme
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Servidor Seguro Vercel
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Publicación directa a GitHub mediante función serverless protegida
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

        {/* Global Notifications Toast */}
        {notification && (
          <div className={`px-6 py-2.5 text-xs font-bold flex items-center justify-between transition-all ${
            notification.type === 'success' ? 'bg-[#25D366] text-white' :
            notification.type === 'error' ? 'bg-red-600 text-white' :
            'bg-[#A8577F] text-white'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              {notification.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
              {notification.type === 'info' && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
              <span>{notification.text}</span>
              {notification.commitUrl && (
                <a
                  href={notification.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-2 inline-flex items-center gap-1 hover:opacity-90"
                >
                  Ver commit en GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <button onClick={() => setNotification(null)} className="opacity-80 hover:opacity-100 ml-4">✕</button>
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
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Ingresa la contraseña configurada en tu variable <code>ADMIN_PASSWORD</code> de Vercel.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#A8577F] focus:outline-none text-center text-sm"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1.5">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                style={{ background: '#A8577F' }}
              >
                Ingresar al Administrador
              </button>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-[11px] text-left space-y-1">
                <p className="font-semibold text-stone-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Seguridad Máxima:
                </p>
                <p>
                  Esta contraseña se valida en el servidor de Vercel contra la variable <code>ADMIN_PASSWORD</code>. Los tokens de GitHub nunca se guardan en el navegador.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Nav Tabs */}
            <div className="flex items-center justify-between px-6 pt-3 border-b border-stone-200 bg-white overflow-x-auto">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('lista')}
                  className={`px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
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
                    className={`px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'editor'
                        ? 'border-[#A8577F] text-[#A8577F]'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {editingProduct.id.startsWith('zu-') ? 'Editando Prenda' : 'Nueva Prenda'}
                  </button>
                )}

                {/* TAB: Respaldo manual */}
                <button
                  type="button"
                  onClick={() => setActiveTab('respaldo')}
                  className={`px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'respaldo'
                      ? 'border-[#A8577F] text-[#A8577F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Respaldo Manual</span>
                </button>
              </div>

              {activeTab === 'lista' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleManualSyncNow}
                    disabled={isPublishing}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#8C3D65] bg-[#FCE8EF] hover:bg-[#F3AFC8]/40 transition-colors disabled:opacity-50 shrink-0"
                    title="Publica todo el catálogo actual a Vercel/GitHub"
                  >
                    {isPublishing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Server className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">Publicar Catálogo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartCreate}
                    disabled={isPublishing}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#A8577F] hover:bg-[#8C3D65] transition-colors shrink-0 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Producto</span>
                  </button>
                </div>
              )}
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto flex-grow">
              
              {/* TAB 1: LISTA DE PRODUCTOS */}
              {activeTab === 'lista' && (
                <div className="space-y-4">
                  {/* Banner de migración de imágenes si existen base64 */}
                  {base64ImagesCount > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                          <CloudUpload className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-amber-950">
                            Se detectaron {base64ImagesCount} imagen(es) en formato Base64
                          </h4>
                          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                            Las fotos en Base64 inflan el tamaño del catálogo y provocan el error 413 en Vercel. Migra las fotos a Vercel Blob para que el catálogo viaje liviano y se publique al instante.
                          </p>
                          {isMigratingBase64 && migrationProgress && (
                            <div className="mt-2 space-y-1">
                              <div className="flex justify-between text-[11px] font-semibold text-amber-900">
                                <span>Migrando foto {migrationProgress.current} de {migrationProgress.total}...</span>
                                <span>{migrationProgress.percent}%</span>
                              </div>
                              <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[#A8577F] transition-all duration-300 rounded-full"
                                  style={{ width: `${migrationProgress.percent}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleMigrateBase64Images}
                        disabled={isMigratingBase64 || isPublishing}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5 self-start sm:self-center"
                      >
                        {isMigratingBase64 ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        <span>Migrar {base64ImagesCount} fotos a Vercel Blob</span>
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 pb-2 border-b border-stone-100">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Al guardar o eliminar una prenda, se publica automáticamente a GitHub a través de Vercel.
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[#A8577F] hover:underline flex items-center gap-1 font-semibold shrink-0"
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
                          <div className="flex items-center gap-3 min-w-0">
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
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-stone-900 truncate">{prod.nombre}</h4>
                                {prod.destacado && (
                                  <span className="text-[10px] bg-[#A8577F] text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                                    Destacado
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-500 truncate">
                                {prod.categoria} · {prod.variantesColor.length} colores · {prod.precio ? `$${prod.precio.toLocaleString('es-CO')} COP` : 'Sin precio'}
                              </p>
                              {/* Swatches preview */}
                              <div className="flex items-center gap-1 mt-1">
                                {prod.variantesColor.map((v, i) => (
                                  <span
                                    key={i}
                                    className="w-3 h-3 rounded-full border border-stone-300 inline-block shrink-0"
                                    style={{ backgroundColor: v.colorHex }}
                                    title={v.color}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(prod)}
                              disabled={isPublishing}
                              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors disabled:opacity-50"
                              title="Editar producto"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.id)}
                              disabled={isPublishing}
                              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
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

              {/* TAB 2: EDITOR DE PRODUCTO */}
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

                          {/* Image URLs or Upload to Vercel Blob */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[11px] font-semibold text-stone-600">
                                Fotografía principal (URL o Vercel Blob)
                              </label>
                              {variant.imagenes[0]?.includes('blob.vercel-storage.com') ? (
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                                  ✓ Vercel Blob
                                </span>
                              ) : variant.imagenes[0]?.startsWith('data:image') ? (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                                  ⚠️ Base64 (sube a Vercel Blob)
                                </span>
                              ) : null}
                            </div>

                            <div 
                              className="relative"
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                  handleImageFileUpload(vIdx, e.dataTransfer.files[0]);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={variant.imagenes[0] || ''}
                                  onChange={(e) => {
                                    const updatedImgs = [...variant.imagenes];
                                    updatedImgs[0] = e.target.value;
                                    handleVariantChange(vIdx, 'imagenes', updatedImgs);
                                  }}
                                  placeholder="https://... o arrastra una foto aquí"
                                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                                />

                                <label className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1 transition-colors ${
                                  uploadingVariantIdx === vIdx
                                    ? 'bg-amber-100 border-amber-300 text-amber-800 opacity-60 cursor-not-allowed'
                                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                                }`}>
                                  {uploadingVariantIdx === vIdx ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                                  ) : (
                                    <Upload className="w-3.5 h-3.5" />
                                  )}
                                  <span>{uploadingVariantIdx === vIdx ? 'Subiendo...' : 'Subir'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    disabled={uploadingVariantIdx === vIdx}
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleImageFileUpload(vIdx, e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>

                              {/* Barra o aviso de Subiendo imagen... */}
                              {uploadingVariantIdx === vIdx && (
                                <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900 animate-pulse">
                                  <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-center text-[11px] font-semibold">
                                      <span>{uploadStatusText || 'Subiendo imagen a Vercel Blob...'}</span>
                                    </div>
                                    <div className="w-full bg-amber-200 h-1 rounded-full mt-1 overflow-hidden">
                                      <div className="bg-amber-600 h-full w-2/3 animate-[pulse_1s_infinite] rounded-full" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Image preview */}
                              {variant.imagenes[0] && (
                                <div className="mt-2 flex items-center gap-2.5">
                                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shrink-0 relative group">
                                    <img
                                      src={variant.imagenes[0]}
                                      alt="Vista previa"
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="text-[11px] text-stone-500 leading-tight">
                                    <p className="font-semibold text-stone-700">Vista previa asignada</p>
                                    <p className="text-[10px] text-stone-400 truncate max-w-xs mt-0.5">
                                      {variant.imagenes[0].startsWith('data:') 
                                        ? 'Imagen Base64 incrustada' 
                                        : variant.imagenes[0]}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form buttons */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={() => setActiveTab('lista')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={isPublishing}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#A8577F] hover:bg-[#8C3D65] transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Publicando a Vercel...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Guardar y Publicar a Vercel</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: RESPALDO MANUAL */}
              {activeTab === 'respaldo' && (
                <div className="space-y-6 text-stone-800">
                  <div className="bg-[#FAF0F4] p-5 rounded-2xl border border-[#F4B8CC]/60 space-y-2">
                    <h3 className="text-sm font-bold text-[#8C3D65] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#A8577F]" />
                      Respaldo Manual / Exportación de Archivos
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Si aún no has configurado las variables de entorno en Vercel o deseas tener una copia de seguridad física de tus productos, puedes descargar el archivo JSON o copiar el código fuente de TypeScript.
                    </p>
                  </div>

                  {/* Step by step */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="w-6 h-6 rounded-full bg-[#A8577F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        1
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900">Descarga o copia los datos</h4>
                        <p className="text-stone-600 mt-0.5">
                          Usa los botones de abajo para descargar <code className="bg-stone-200 px-1 rounded">products.json</code> o copiar el código de <code className="bg-stone-200 px-1 rounded">src/data/products.ts</code>.
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
                          Entra a <a href="https://github.com/Jonathanz7/Zuniforme" target="_blank" rel="noopener noreferrer" className="text-[#A8577F] underline font-semibold">Jonathanz7/Zuniforme</a>, abre el archivo <code className="bg-stone-200 px-1 rounded">src/data/products.ts</code> y haz clic en el icono del lápiz para editarlo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="w-6 h-6 rounded-full bg-[#A8577F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        3
                      </span>
                      <div>
                        <h4 className="font-bold text-stone-900">Pega el contenido y confirma el Commit</h4>
                        <p className="text-stone-600 mt-0.5">
                          Guarda el commit en la rama <code>main</code>. Vercel reconstruirá tu sitio automáticamente.
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

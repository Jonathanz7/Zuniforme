/**
 * Utilidad para comprimir y redimensionar imágenes en el navegador antes de subirlas.
 * Utiliza HTML5 Canvas para redimensionar a un ancho máximo de 1600px y comprimir a JPEG ~0.8.
 * Esto reduce imágenes de 5MB - 12MB tomadas con celular a ~100KB - 250KB,
 * acelerando la carga para el usuario y evitando límites de tamaño en Vercel.
 */

export interface CompressedImageResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
}

/**
 * Comprime y redimensiona un archivo de imagen (File o Blob).
 */
export async function compressAndResizeImage(
  file: File | Blob,
  maxWidth = 1600,
  quality = 0.8
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { naturalWidth: width, naturalHeight: height } = img;

      // Calcular dimensiones proporcionales si el ancho supera maxWidth
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = Math.round(height * ratio);
      }

      // Crear canvas para el redimensionamiento
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo obtener el contexto 2D del canvas'));
        return;
      }

      // Configurar suavizado de alta calidad
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Dibujar fondo blanco por si la imagen original es PNG con transparencias
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Dibujar la imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Exportar como JPEG con la calidad indicada
      const dataUrl = canvas.toDataURL('image/jpeg', quality);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Error al generar Blob comprimido desde el canvas'));
            return;
          }

          const compressedSize = blob.size;
          const reductionPercentage = Math.max(
            0,
            Math.round(((originalSize - compressedSize) / originalSize) * 100)
          );

          resolve({
            dataUrl,
            blob,
            width,
            height,
            originalSize,
            compressedSize,
            reductionPercentage,
          });
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('No se pudo cargar la imagen para redimensionar'));
    };

    img.src = objectUrl;
  });
}

/**
 * Comprime una imagen ya existente en formato base64 DataURL (útil para migración).
 */
export async function compressBase64Image(
  dataUrl: string,
  maxWidth = 1600,
  quality = 0.8
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const originalSize = Math.round((dataUrl.length * 3) / 4);
    const img = new Image();

    img.onload = () => {
      let { naturalWidth: width, naturalHeight: height } = img;

      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No se pudo obtener el contexto 2D'));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Error al generar Blob'));
            return;
          }

          const compressedSize = blob.size;
          const reductionPercentage = Math.max(
            0,
            Math.round(((originalSize - compressedSize) / originalSize) * 100)
          );

          resolve({
            dataUrl: compressedDataUrl,
            blob,
            width,
            height,
            originalSize,
            compressedSize,
            reductionPercentage,
          });
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('No se pudo cargar la imagen base64 para redimensionar'));
    };

    img.src = dataUrl;
  });
}

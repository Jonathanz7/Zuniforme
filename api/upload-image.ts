import { put } from '@vercel/blob';

interface UploadImageBody {
  adminPassword?: string;
  filename?: string;
  image?: string; // base64 o data:image/...
  contentType?: string;
}

/**
 * Parsea el cuerpo de la petición de manera compatible con Vercel Serverless
 * y con servidores HTTP de Node.js estándar.
 */
async function parseRequestBody(req: any): Promise<UploadImageBody> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

/**
 * Envía una respuesta JSON compatible con Vercel y Node.js estándar.
 */
function sendJsonResponse(res: any, statusCode: number, data: Record<string, any>) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Handler principal para subir una imagen a Vercel Blob.
 */
export default async function handler(req: any, res: any) {
  // 1. Permitir solo peticiones POST
  if (req.method !== 'POST') {
    return sendJsonResponse(res, 405, {
      success: false,
      error: `Método ${req.method} no permitido. Solo se aceptan peticiones POST.`,
    });
  }

  try {
    const body = await parseRequestBody(req);
    const { adminPassword, filename, image, contentType = 'image/jpeg' } = body;

    // 2. Validar contraseña de administrador
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedPassword) {
      return sendJsonResponse(res, 500, {
        success: false,
        error: 'La variable de entorno ADMIN_PASSWORD no está configurada en el servidor (Vercel).',
      });
    }

    if (!adminPassword || adminPassword !== expectedPassword) {
      return sendJsonResponse(res, 401, {
        success: false,
        error: 'Contraseña de administrador incorrecta.',
      });
    }

    // 3. Validar que la imagen fue proporcionada
    if (!image || typeof image !== 'string') {
      return sendJsonResponse(res, 400, {
        success: false,
        error: 'No se recibió ninguna imagen para subir.',
      });
    }

    // 4. Validar token de Vercel Blob
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return sendJsonResponse(res, 500, {
        success: false,
        error:
          'Falta la variable de entorno BLOB_READ_WRITE_TOKEN en Vercel. Ve al panel de tu proyecto en Vercel -> Storage -> Create Database -> Blob, y conecta la base de datos a este proyecto.',
      });
    }

    // 5. Convertir base64 o DataURL a Buffer binario
    let cleanBase64 = image;
    let detectedContentType = contentType;

    if (image.startsWith('data:')) {
      const match = image.match(/^data:([^;]+);base64,(.*)$/);
      if (match) {
        detectedContentType = match[1];
        cleanBase64 = match[2];
      }
    }

    const imageBuffer = Buffer.from(cleanBase64, 'base64');

    // 6. Sanitizar nombre de archivo y definir ruta en Vercel Blob
    const safeName = (filename || 'foto-producto.jpg')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');

    const extension = safeName.endsWith('.jpg') || safeName.endsWith('.jpeg') || safeName.endsWith('.png') || safeName.endsWith('.webp')
      ? ''
      : '.jpg';

    const pathname = `products/${Date.now()}-${safeName}${extension}`;

    // 7. Subir a Vercel Blob
    const blob = await put(pathname, imageBuffer, {
      access: 'public',
      token: blobToken,
      contentType: detectedContentType || 'image/jpeg',
    });

    return sendJsonResponse(res, 200, {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      size: imageBuffer.length,
      message: 'Imagen subida exitosamente a Vercel Blob.',
    });
  } catch (error: any) {
    return sendJsonResponse(res, 500, {
      success: false,
      error: `Error al subir imagen a Vercel Blob: ${error?.message || 'Error desconocido'}`,
    });
  }
}

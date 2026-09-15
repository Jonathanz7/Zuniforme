import type { IncomingMessage, ServerResponse } from 'http';

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio?: number;
  tallas: string[];
  genero: 'Femenino' | 'Masculino' | 'Unisex';
  destacado?: boolean;
  tela?: string;
  caracteristicas?: string[];
  variantesColor: {
    color: string;
    colorHex: string;
    imagenes: string[];
  }[];
}

interface UpdateCatalogBody {
  adminPassword?: string;
  products?: Product[];
}

/**
 * Parsea el cuerpo de la petición de manera compatible con Vercel Serverless
 * y con servidores HTTP de Node.js estándar.
 */
async function parseRequestBody(req: any): Promise<UpdateCatalogBody> {
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
 * Envía una respuesta JSON compatible tanto con los métodos de Vercel
 * (res.status().json()) como con ServerResponse estándar de Node.js.
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
 * Genera el código TypeScript para src/data/products.ts
 */
function generateProductsTypeScript(products: Product[]): string {
  return `import { Product } from '../types';

export const initialProducts: Product[] = ${JSON.stringify(products, null, 2)};

export const CATEGORIES = [
  'Todos',
  'Uniformes Quirúrgicos',
  'Chaquetas Antifluidos',
  'Pantalones Jogger',
  'Gorros Quirúrgicos',
  'Batas Médicas & Spa'
];
`;
}

/**
 * Handler principal de la función Serverless en Vercel
 */
export default async function handler(req: any, res: any) {
  // 1. Aceptar únicamente peticiones POST
  if (req.method !== 'POST') {
    return sendJsonResponse(res, 405, {
      success: false,
      error: `Método ${req.method} no permitido. Solo se aceptan peticiones POST.`,
    });
  }

  try {
    const body = await parseRequestBody(req);
    const { adminPassword, products } = body;

    // 2. Validar contraseña contra la variable de entorno ADMIN_PASSWORD
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

    // 3. Validar array de productos
    if (!products || !Array.isArray(products)) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: 'El cuerpo de la petición debe contener un array de productos válido.',
      });
    }

    // 4. Leer variables de entorno de GitHub
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return sendJsonResponse(res, 500, {
        success: false,
        error: 'La variable de entorno GITHUB_TOKEN no está configurada en Vercel.',
      });
    }

    const owner = process.env.GITHUB_OWNER || 'Jonathanz7';
    const repo = process.env.GITHUB_REPO || 'Zuniforme';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const filePath = process.env.GITHUB_FILE_PATH || 'src/data/products.ts';

    // 5. Generar código TypeScript y codificar en base64 de forma segura con Buffer
    const tsCode = generateProductsTypeScript(products);
    const contentBase64 = Buffer.from(tsCode, 'utf-8').toString('base64');

    const githubHeaders = {
      Authorization: `Bearer ${githubToken.trim()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ZUniforme-App',
    };

    // 6. Consultar SHA actual del archivo en GitHub
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    let currentSha: string | null = null;

    const getRes = await fetch(getFileUrl, {
      method: 'GET',
      headers: githubHeaders,
    });

    if (getRes.status === 200) {
      const fileData = await getRes.json();
      currentSha = fileData.sha || null;
    } else if (getRes.status === 404) {
      // El archivo aún no existe en esa ruta o rama, se creará nuevo
      currentSha = null;
    } else {
      const errData = await getRes.json().catch(() => ({}));
      return sendJsonResponse(res, getRes.status, {
        success: false,
        error: `Error al consultar repositorio en GitHub (${getRes.status}): ${errData.message || getRes.statusText}`,
      });
    }

    // 7. Enviar commit a GitHub mediante PUT
    const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const commitPayload: Record<string, any> = {
      message: `Actualiza catálogo de productos (${products.length} prendas)`,
      content: contentBase64,
      branch: branch,
    };

    if (currentSha) {
      commitPayload.sha = currentSha;
    }

    const putRes = await fetch(putFileUrl, {
      method: 'PUT',
      headers: {
        ...githubHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commitPayload),
    });

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      return sendJsonResponse(res, putRes.status, {
        success: false,
        error: `Error de GitHub al guardar cambios (${putRes.status}): ${errData.message || putRes.statusText}`,
      });
    }

    const putData = await putRes.json();
    const commitUrl = putData.commit?.html_url;

    // 8. Responder 200 con éxito
    return sendJsonResponse(res, 200, {
      success: true,
      message: '✅ Catálogo publicado, tu sitio se actualizará en menos de un minuto.',
      commitUrl,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return sendJsonResponse(res, 500, {
      success: false,
      error: `Error interno en el servidor: ${error instanceof Error ? error.message : 'Error desconocido'}`,
    });
  }
}

interface SiteConfig {
  nombreMarca: string;
  subtitulo: string;
  ciudad: string;
  departamento: string;
  pais: string;
  whatsappNumero: string;
  whatsappFormatoDisplay: string;
  instagramUsuario: string;
  instagramUrl: string;
  emailContacto: string;
  direccionLocal: string;
  horarioAtencion: string;
  imagenNuestraHistoria?: string;
  imagenHero?: string;
}

interface UpdateSiteContentBody {
  adminPassword?: string;
  siteConfig?: SiteConfig;
  _rawSize?: number;
}

const MAX_PAYLOAD_BYTES = 512 * 1024; // 512 KB límite seguro

/**
 * Parsea el cuerpo de la petición de manera compatible con Vercel Serverless
 * y con servidores HTTP de Node.js estándar.
 */
async function parseRequestBody(req: any): Promise<UpdateSiteContentBody> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        parsed._rawSize = Buffer.byteLength(req.body, 'utf8');
        return parsed;
      } catch {
        return { _rawSize: Buffer.byteLength(req.body, 'utf8') };
      }
    }
    return { ...req.body, _rawSize: Buffer.byteLength(JSON.stringify(req.body), 'utf8') };
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(raw);
        parsed._rawSize = Buffer.byteLength(raw, 'utf8');
        resolve(parsed);
      } catch {
        resolve({ _rawSize: Buffer.byteLength(raw, 'utf8') });
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
 * Genera el código TypeScript para src/data/siteConfig.ts
 */
function generateSiteConfigTypeScript(config: SiteConfig): string {
  return `import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = ${JSON.stringify(config, null, 2)};

export const BRAND_COLORS = {
  mauvePrimary: '#A8577F',
  mauveDark: '#8A3B63',
  mauveLight: '#C3799F',
  dustyRose: '#F4B8CC',
  dustyRoseLight: '#FBE8EF',
  dustyRoseSubtle: '#FFF5F8',
  warmNeutral: '#FAF7F5',
  warmWhite: '#FFFFFF',
  stoneText: '#2D2729',
  mutedText: '#6E6468',
};
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
    // 1.1 Validar tamaño del cuerpo de la petición
    const contentLength = Number(req.headers?.['content-length']) || 0;
    if (contentLength > MAX_PAYLOAD_BYTES) {
      return sendJsonResponse(res, 413, {
        success: false,
        error: 'El contenido excede el tamaño máximo permitido.',
      });
    }

    const body = await parseRequestBody(req);
    const { adminPassword, siteConfig, _rawSize } = body;

    if (_rawSize && _rawSize > MAX_PAYLOAD_BYTES) {
      return sendJsonResponse(res, 413, {
        success: false,
        error: 'El contenido excede el tamaño máximo permitido.',
      });
    }

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

    // 3. Validar objeto siteConfig
    if (!siteConfig || typeof siteConfig !== 'object') {
      return sendJsonResponse(res, 400, {
        success: false,
        error: 'El cuerpo de la petición debe contener la configuración siteConfig.',
      });
    }

    // 3.1 Validar que no se envíen fotos en Base64 incrustadas
    if (
      (siteConfig.imagenNuestraHistoria && siteConfig.imagenNuestraHistoria.startsWith('data:image')) ||
      (siteConfig.imagenHero && siteConfig.imagenHero.startsWith('data:image'))
    ) {
      return sendJsonResponse(res, 400, {
        success: false,
        error: 'Las imágenes no deben enviarse en Base64. Súbelas primero a Vercel Blob usando el botón correspondiente.',
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
    const filePath = 'src/data/siteConfig.ts';

    // 5. Generar código TypeScript y codificar en base64
    const tsCode = generateSiteConfigTypeScript(siteConfig);
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
      message: 'Actualiza imágenes y contenido de secciones del sitio (siteConfig.ts)',
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
      message: '✅ Contenido del sitio publicado en GitHub, tu web se actualizará en menos de un minuto.',
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

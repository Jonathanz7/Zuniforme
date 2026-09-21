import 'dotenv/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-serverless-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && (req.url === '/api/update-catalog' || req.url.startsWith('/api/update-catalog?'))) {
              try {
                const handlerMod = await server.ssrLoadModule('/api/update-catalog.ts');
                await handlerMod.default(req, res);
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  success: false, 
                  error: err?.message || 'Error en endpoint dev /api/update-catalog' 
                }));
              }
              return;
            }

            if (req.url && (req.url === '/api/upload-image' || req.url.startsWith('/api/upload-image?'))) {
              try {
                const handlerMod = await server.ssrLoadModule('/api/upload-image.ts');
                await handlerMod.default(req, res);
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  success: false, 
                  error: err?.message || 'Error en endpoint dev /api/upload-image' 
                }));
              }
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

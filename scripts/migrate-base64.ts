import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

/**
 * Script de migración para convertir imágenes Base64 de products.ts a Vercel Blob.
 * Uso:
 *   npx tsx scripts/migrate-base64.ts
 */
async function migrateProductsBase64() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('❌ Error: Falta la variable de entorno BLOB_READ_WRITE_TOKEN.');
    console.error('Configura BLOB_READ_WRITE_TOKEN en tu archivo .env o en el entorno para ejecutar este script.');
    process.exit(1);
  }

  const productsFilePath = path.resolve(process.cwd(), 'src/data/products.ts');
  if (!fs.existsSync(productsFilePath)) {
    console.error(`❌ No se encontró el archivo: ${productsFilePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(productsFilePath, 'utf8');
  console.log(`📂 Archivo leído: ${productsFilePath} (${Math.round(fileContent.length / 1024)} KB)`);

  // Encontrar todas las ocurrencias de base64
  const base64Regex = /"data:image\/([^;]+);base64,([^"]+)"/g;
  let match;
  const matches: { fullMatch: string; format: string; base64: string; index: number }[] = [];

  while ((match = base64Regex.exec(fileContent)) !== null) {
    matches.push({
      fullMatch: match[0],
      format: match[1],
      base64: match[2],
      index: match.index,
    });
  }

  if (matches.length === 0) {
    console.log('✅ No se encontraron imágenes base64 en src/data/products.ts. El archivo ya está limpio.');
    return;
  }

  console.log(`🔍 Se encontraron ${matches.length} imágenes base64 para migrar a Vercel Blob.`);

  let updatedContent = fileContent;

  for (let i = 0; i < matches.length; i++) {
    const item = matches[i];
    const imageNumber = i + 1;
    console.log(`⏳ [${imageNumber}/${matches.length}] Subiendo imagen (${item.format}, ~${Math.round(item.base64.length / 1024)} KB)...`);

    try {
      const buffer = Buffer.from(item.base64, 'base64');
      const ext = item.format === 'jpeg' ? 'jpg' : item.format;
      const pathname = `products/migrated-${Date.now()}-${imageNumber}.${ext}`;

      const blob = await put(pathname, buffer, {
        access: 'public',
        token,
        contentType: `image/${item.format}`,
      });

      console.log(`   ✅ Subida exitosa: ${blob.url}`);
      // Reemplazar la cadena en el contenido
      updatedContent = updatedContent.replace(item.fullMatch, `"${blob.url}"`);
    } catch (err: any) {
      console.error(`   ❌ Error subiendo imagen ${imageNumber}:`, err?.message || err);
    }
  }

  fs.writeFileSync(productsFilePath, updatedContent, 'utf8');
  const newSize = fs.statSync(productsFilePath).size;
  console.log(`🎉 Migración finalizada con éxito.`);
  console.log(`📦 Nuevo tamaño de src/data/products.ts: ${Math.round(newSize / 1024)} KB`);
}

migrateProductsBase64().catch((err) => {
  console.error('Error fatal en script de migración:', err);
  process.exit(1);
});

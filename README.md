# ZUniforme — Catálogo Web Oficial

Sitio web y catálogo digital moderno, femenino y profesional para **ZUniforme** (Neiva, Huila, Colombia), especializado en **uniformes antifluidos (scrubs) y ropa de trabajo** para el **sector salud** y **dotaciones empresariales**.

Diseñado con **React**, **Vite**, **Tailwind CSS** y **TypeScript**, optimizado para móviles (mobile-first), tablets y computadores.

---

## 🌸 Identidad de Marca
- **Color Primario (Mauve / Vino Rosado):** `#A8577F` / `#8C3D65`
- **Color Secundario (Rosa Empolvado / Pastel):** `#F4B8CC` / `#FBE8EF`
- **Tipografía:** 
  - Logo/Monograma: Script elegante (Alex Brush / Great Vibes).
  - Cuerpo e interfaz: Sans-serif moderna, limpia y legible (Plus Jakarta Sans).
- **Logo:** 
  - Monograma script **ZU** con la palabra **ZUNIFORME** con espaciado amplio.
  - Para usar tu propio archivo oficial de logo, simplemente copia tu archivo transparente en `public/logo.png` y el sitio lo tomará automáticamente.

---

## 📁 Estructura del Proyecto

```text
├── index.html                   # Entrada HTML, fuentes tipográficas y meta tags SEO
├── public/
│   └── logo.png                 # (Opcional) Coloca aquí tu archivo de logo oficial
├── src/
│   ├── types.ts                 # Tipos de TypeScript (Product, ColorVariant, etc.)
│   ├── data/
│   │   ├── products.ts          # ARCHIVO PRINCIPAL DE PRODUCTOS DEL CATÁLOGO
│   │   ├── products.json        # Versión JSON descargable del catálogo
│   │   └── siteConfig.ts        # Datos de contacto (WhatsApp, Instagram, dirección en Neiva)
│   ├── components/
│   │   ├── Navbar.tsx           # Menú sticky con botón WhatsApp y acceso admin
│   │   ├── Logo.tsx             # Componente de identidad visual de ZUniforme
│   │   ├── Hero.tsx             # Portada de alto impacto con llamada a la acción
│   │   ├── Catalog.tsx          # Catálogo con filtros por categoría, color y buscador
│   │   ├── ProductCard.tsx      # Tarjeta interactiva con swatches que cambian la foto
│   │   ├── ProductDetailModal.tsx # Modal de detalle con galería y botón WhatsApp
│   │   ├── SizeGuideModal.tsx   # Tabla de medidas en cm (busto, cintura, cadera)
│   │   ├── AboutSection.tsx     # Historia de la marca y taller en Neiva, Huila
│   │   ├── DotacionesBanner.tsx # Sección de ventas por mayor para clínicas y empresas
│   │   ├── FaqSection.tsx       # Preguntas frecuentes sobre telas y envíos
│   │   ├── ContactSection.tsx   # Formulario y canales de contacto directo
│   │   ├── Footer.tsx           # Pie de página y enlace al modo administrador
│   │   └── AdminModal.tsx       # Gestor visual de productos con exportador a GitHub
│   ├── utils/
│   │   ├── formatters.ts        # Formato de moneda colombiana COP y generador WhatsApp
│   │   └── productStorage.ts    # Persistencia local y descarga de datos
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Entrada de React
│   └── index.css                # Configuración de Tailwind CSS
├── package.json                 # Dependencias y scripts
├── README.md                    # Esta guía
└── vite.config.ts               # Configuración de Vite y Tailwind
```

---

## 🚀 Cómo correr el proyecto en tu computador local

### 1. Requisitos previos
- Tener instalado **Node.js** (versión 18 o superior): [Descargar Node.js](https://nodejs.org/)
- Tener **Git**: [Descargar Git](https://git-scm.com/)

### 2. Instalación y ejecución
Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo local
npm run dev
```

Abre tu navegador en `http://localhost:3000` (o la dirección que indique la terminal).

---

## 🛍️ Cómo gestionar productos (Agregar, Editar y Quitar)

Tienes **dos formas muy sencillas** de hacerlo sin pagar bases de datos:

### Método A: Publicación Automática Segura vía Función Serverless en Vercel (¡Recomendado!)
1. Despliega tu repositorio en **Vercel**.
2. En tu proyecto de Vercel, entra a **Settings** → **Environment Variables** y agrega las variables requeridas (ver listado más abajo).
3. Entra a tu sitio web y abre el panel de administración (icono de tuerca en la barra superior o en el enlace **"Modo Administrador"** en el pie de página).
4. Ingresa tu contraseña (la misma configurada en `ADMIN_PASSWORD`).
5. Cada vez que agregues, edites o elimines una prenda y presiones **"Guardar y Publicar a Vercel"**, la app llamará a la función serverless segura (`/api/update-catalog`), la cual se autentica en el servidor y crea el commit en GitHub.
6. Vercel detectará el commit y compilará la versión actualizada de tu tienda en menos de un minuto.
7. **Seguridad Total:** El token de GitHub vive **exclusivamente en Vercel**, jamás en el navegador ni en el código público.

### Variables de Entorno a Configurar en Vercel:
En tu panel de Vercel (**Project → Settings → Environment Variables**), agrega:
- `ADMIN_PASSWORD`: Tu contraseña secreta para acceder y publicar cambios (ej: tu propia clave).
- `GITHUB_TOKEN`: Tu Personal Access Token de GitHub (con permiso *Contents: Read and write* sobre el repo).
- `GITHUB_OWNER`: `Jonathanz7` (o tu usuario/organización de GitHub).
- `GITHUB_REPO`: `Zuniforme` (nombre exacto del repositorio).
- `GITHUB_BRANCH`: `main`
- `GITHUB_FILE_PATH`: `src/data/products.ts`

### Método B: Respaldo Manual (Descarga / Copia de Código)
Si aún no has configurado las variables en Vercel o quieres una copia de seguridad física, entra a la pestaña **"Respaldo Manual"** en el administrador para descargar `products.json` o copiar el código para `src/data/products.ts`.

### Método C: Editando directamente el archivo de código
Abre el archivo `src/data/products.ts` en cualquier editor de texto (como VS Code). Verás una lista de productos con esta estructura:

```typescript
{
  id: 'zu-mi-nuevo-uniforme',
  nombre: 'Conjunto Quirúrgico ZU Elegance',
  categoria: 'Uniformes Quirúrgicos',
  descripcion: 'Descripción de la prenda y detalles del corte...',
  precio: 140000, // En pesos colombianos (o déjalo sin precio)
  tallas: ['XS', 'S', 'M', 'L', 'XL'],
  genero: 'Femenino',
  destacado: true,
  tela: 'Antifluido Lafayette 4-Way Stretch',
  caracteristicas: [
    'Repelencia a salpicaduras',
    'Bolsillo especial para celular',
    'Pretina anatómica de alto confort'
  ],
  variantesColor: [
    {
      color: 'Mauve ZUniforme',
      colorHex: '#A8577F',
      imagenes: [
        'https://tuservidor.com/foto-mauve-1.jpg',
        'https://tuservidor.com/foto-mauve-2.jpg'
      ]
    },
    {
      color: 'Rosa Empolvado',
      colorHex: '#F4B8CC',
      imagenes: [
        'https://tuservidor.com/foto-rosa.jpg'
      ]
    }
  ]
}
```

---

## 📲 Cómo configurar tu número de WhatsApp y Redes

Para cambiar el número de WhatsApp al que llegan los pedidos, edita el archivo `src/data/siteConfig.ts`:

```typescript
export const siteConfig = {
  nombreMarca: 'ZUniforme',
  ciudad: 'Neiva',
  departamento: 'Huila',
  whatsappNumero: '573228539863',         // Código de Colombia 57 + tu celular sin espacios ni signos
  whatsappFormatoDisplay: '+57 322 853 9863',
  instagramUsuario: 'zuniforme',
  instagramUrl: 'https://instagram.com/zuniforme',
  direccionLocal: 'Carrera 5 # 14-32, Centro, Neiva - Huila, Colombia',
  // ...
};
```

---

## 🌐 Cómo subir a GitHub y Desplegar GRATIS en Vercel

### Paso 1: Subir tu código a GitHub
1. Inicia sesión en [GitHub](https://github.com/) y crea un nuevo repositorio (por ejemplo: `zuniforme-catalogo`).
2. En la terminal de tu computador, ejecuta:

```bash
git init
git add .
git commit -m "Primer commit: Catálogo oficial ZUniforme"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/zuniforme-catalogo.git
git push -u origin main
```

### Paso 2: Desplegar en Vercel (Cero Costo)
1. Entra a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en el botón **"Add New..."** → **"Project"**.
3. Selecciona tu repositorio `zuniforme-catalogo` y haz clic en **"Import"**.
4. Vercel detectará automáticamente que es un proyecto **Vite**. Deja las opciones por defecto:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Haz clic en el botón **"Deploy"**.
6. ¡Listo! En menos de 1 minuto tendrás tu sitio funcionando con un dominio gratuito como:
   `https://zuniforme-catalogo.vercel.app`

### Paso 3: ¿Cómo se actualizan los productos en el futuro?
Cada vez que edites `src/data/products.ts` y hagas `git push` a GitHub (o edites el archivo directamente desde la web de GitHub), **Vercel actualizará tu catálogo automáticamente sin que tengas que hacer nada más**.

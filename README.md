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

### Método A: Desde el Modo Administrador Visual en la propia web (Recomendado)
1. Entra a tu sitio web y haz clic en el icono de tuerca en la barra superior o en el enlace **"Modo Administrador"** en el pie de página (o agrega `#admin` al final de la URL, por ejemplo `tudominio.com/#admin`).
2. Ingresa la contraseña: **`zuniforme`**.
3. Desde allí podrás:
   - Crear nuevos uniformes con su nombre, tela, precio y descripción.
   - Añadir variantes de color con su código de color (swatch) y fotos.
   - Subir fotos desde tu computador o pegar enlaces de imágenes.
   - Guardar y ver el cambio en tu pantalla de inmediato.
4. Para que el cambio quede permanente para todos los visitantes en Internet:
   - Haz clic en la pestaña **"Guardar Permanente en GitHub / Vercel"**.
   - Haz clic en **"Descargar products.json"** o **"Copiar código para src/data/products.ts"**.
   - Sigue los 3 pasos que se explican abajo para actualizar tu repositorio en GitHub.

### Método B: Editando directamente el archivo de código
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
  whatsappNumero: '573167402891',         // Código de Colombia 57 + tu celular sin espacios ni signos
  whatsappFormatoDisplay: '+57 316 740 2891',
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

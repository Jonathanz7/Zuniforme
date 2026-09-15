export interface ColorVariant {
  color: string;
  colorHex: string;
  imagenes: string[];
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Ajustable';

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio?: number; // Optional as requested (in COP)
  tallas: string[];
  variantesColor: ColorVariant[];
  destacado?: boolean;
  caracteristicas?: string[];
  tela?: string;
  genero?: 'Femenino' | 'Masculino' | 'Unisex';
}

export interface SiteConfig {
  nombreMarca: string;
  subtitulo: string;
  ciudad: string;
  departamento: string;
  pais: string;
  whatsappNumero: string; // E.g. '573123456789'
  whatsappFormatoDisplay: string; // E.g. '+57 312 345 6789'
  instagramUsuario: string; // E.g. 'zuniforme'
  instagramUrl: string;
  emailContacto: string;
  direccionLocal: string;
  horarioAtencion: string;
}

export interface FilterState {
  busqueda: string;
  categoria: string;
  color: string;
  orden: 'destacados' | 'precio-menor' | 'precio-mayor' | 'nombre-az';
}

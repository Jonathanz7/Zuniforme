import { Product } from '../types';
import { siteConfig } from '../data/siteConfig';

export function formatCOP(amount?: number): string {
  if (amount === undefined || amount === null) return 'Consultar precio';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount) + ' COP';
}

export function createWhatsAppLink(message: string, customPhone?: string): string {
  const phone = customPhone || siteConfig.whatsappNumero;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function createProductWhatsAppMessage(
  product: Product,
  selectedColor?: string,
  selectedSize?: string
): string {
  let msg = `¡Hola ZUniforme! Me comunico desde su catálogo web.\n\n`;
  msg += `Estoy interesada(o) en el siguiente producto:\n`;
  msg += `• *Producto:* ${product.nombre}\n`;
  msg += `• *Categoría:* ${product.categoria}\n`;
  if (selectedColor) {
    msg += `• *Color:* ${selectedColor}\n`;
  }
  if (selectedSize) {
    msg += `• *Talla:* ${selectedSize}\n`;
  }
  if (product.precio) {
    msg += `• *Precio catálogo:* ${formatCOP(product.precio)}\n`;
  }
  msg += `\n¿Tienen disponibilidad y cómo puedo gestionar mi pedido? ¡Muchas gracias!`;
  return msg;
}

export function createGeneralWhatsAppMessage(): string {
  return `¡Hola ZUniforme! Me comunico desde su sitio web. Deseo más información sobre sus uniformes antifluidos y opciones de dotaciones personalizadas en Neiva y para envíos nacionales.`;
}

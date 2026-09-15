import { Product } from '../types';
import { initialProducts } from '../data/products';

const STORAGE_KEY = 'zuniforme_catalog_products_v1';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return initialProducts;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProducts;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialProducts;
  } catch (error) {
    console.error('Error loading stored products:', error);
    return initialProducts;
  }
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
}

export function resetToDefaultProducts(): Product[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return initialProducts;
}

export function downloadProductsJSON(products: Product[]): void {
  const jsonStr = JSON.stringify(products, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateProductsTypeScriptCode(products: Product[]): string {
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

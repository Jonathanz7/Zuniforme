import { SiteConfig } from '../types';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig';

const STORAGE_KEY = 'zuniforme_site_config_v2';

export function getStoredSiteConfig(): SiteConfig {
  if (typeof window === 'undefined') return defaultSiteConfig;
  try {
    // Clear legacy v1 key so new default contacts take effect
    try {
      localStorage.removeItem('zuniforme_site_config_v1');
    } catch {
      // ignore
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteConfig;
    const parsed = JSON.parse(raw);

    // Safeguard against old contact info cached in browser
    if (parsed.whatsappNumero === '573228539863') {
      parsed.whatsappNumero = defaultSiteConfig.whatsappNumero;
      parsed.whatsappFormatoDisplay = defaultSiteConfig.whatsappFormatoDisplay;
    }
    if (parsed.direccionLocal && parsed.direccionLocal.includes('Carrera 5')) {
      parsed.direccionLocal = defaultSiteConfig.direccionLocal;
    }

    return {
      ...defaultSiteConfig,
      ...parsed,
    };
  } catch (error) {
    console.error('Error loading stored siteConfig:', error);
    return defaultSiteConfig;
  }
}

export function saveStoredSiteConfig(config: SiteConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error saving siteConfig to localStorage:', error);
  }
}

export function resetToDefaultSiteConfig(): SiteConfig {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultSiteConfig;
}

export function generateSiteConfigTypeScriptCode(config: SiteConfig): string {
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

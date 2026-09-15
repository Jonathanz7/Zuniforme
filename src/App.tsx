import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { getStoredProducts, saveStoredProducts } from './utils/productStorage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { AboutSection } from './components/AboutSection';
import { DotacionesBanner } from './components/DotacionesBanner';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminModal } from './components/AdminModal';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink, createGeneralWhatsAppMessage } from './utils/formatters';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColorName, setSelectedColorName] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize products on load from localStorage or default dataset
  useEffect(() => {
    const loaded = getStoredProducts();
    setProducts(loaded);

    // Check if URL hash is #admin to open admin directly
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
  }, []);

  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);
  };

  const handleSelectProduct = (product: Product, initialColorName?: string) => {
    setSelectedProduct(product);
    setSelectedColorName(initialColorName);
  };

  const floatingWaUrl = createWhatsAppLink(createGeneralWhatsAppMessage());

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-[#F4B8CC] selection:text-[#5E2242]">
      {/* Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        productsCount={products.length}
      />

      <main className="flex-grow">
        {/* Hero Showcase */}
        <Hero
          featuredProduct={products.find((p) => p.destacado) || products[0]}
          onSelectProduct={handleSelectProduct}
        />

        {/* Catalog Section */}
        <Catalog
          products={products}
          onSelectProduct={handleSelectProduct}
        />

        {/* Brand Story & Craftsmanship */}
        <AboutSection />

        {/* Corporate & Clinic Dotations Solutions */}
        <DotacionesBanner />

        {/* FAQ Section */}
        <FaqSection />

        {/* Contact Information & Interactive Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        initialColorName={selectedColorName}
        onClose={() => {
          setSelectedProduct(null);
          setSelectedColorName(undefined);
        }}
      />

      {/* Admin Catalog Manager Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onSaveProducts={handleSaveProducts}
      />

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Contacto flotante" className="fixed bottom-6 right-6 z-30">
        <a
          href={floatingWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-full text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          }}
          aria-label="Abrir WhatsApp para consultas directas"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="hidden sm:inline text-xs font-bold whitespace-nowrap">
            ¿Deseas asesoría? Escríbenos
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </a>
      </aside>
    </div>
  );
}

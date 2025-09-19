import ProductDetailClient from './ProductDetailClient';

// Server component wrapper for static export
export default function ProductDetailPage() {
  return <ProductDetailClient />;
}

// For static export: generate all productId params
export async function generateStaticParams() {
  // You should fetch or import your products data here. For demo, hardcode a few:
  const products = [
    { id: 'product-1' },
    { id: 'product-2' },
    // Add all your real product IDs here, or import from your data source
  ];
  return products.map(product => ({ productId: product.id }));
}
'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  brand: string;
  category: string;
  color: string;
  sizes: string[];
  description: string;
  season: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, size: product.sizes[0] || 'M' } 
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop';
            }}
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {discount}% OFF
            </Badge>
          )}
          <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
        </div>
        
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-red-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-red-500">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600">Sizes:</span>
          {product.sizes.slice(0, 3).map((size) => (
            <Badge key={size} variant="outline" className="text-xs">
              {size}
            </Badge>
          ))}
          {product.sizes.length > 3 && (
            <span className="text-xs text-gray-500">+{product.sizes.length - 3} more</span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full btn-primary ripple"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
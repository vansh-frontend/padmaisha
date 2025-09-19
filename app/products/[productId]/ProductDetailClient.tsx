"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

const ProductDetailClient = () => {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productsReady, setProductsReady] = useState(false);

  useEffect(() => {
    if (state.products && state.products.length > 0) {
      setProductsReady(true);
    }
  }, [state.products]);

  const productId = params.productId as string;
  const product = state.products.find(p => p.id === productId);

  if (!productsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-500 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const relatedProducts = state.products
    .filter(p => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { product, size: selectedSize } 
      });
    }
    
    toast.success(`${product.name} (${quantity}) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-sm p-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={600}
                className="w-full h-96 lg:h-[600px] object-cover hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop';
                }}
                priority
                unoptimized
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-2">
                  {discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.brand}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-red-500">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <Badge className="bg-green-100 text-green-800">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>
              {state.user?.isRegistered && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 font-medium">
                    🎉 Extra 12% discount applied for registered retailers!
                  </p>
                  <p className="text-green-600 text-sm">
                    Final price: ₹{Math.round(product.price * 0.88).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,10,20,50].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full btn-primary text-white py-3 text-lg ripple"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 py-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Free shipping on orders above ₹2000</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">30-day return policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-gray-600">Quality guaranteed</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm"><span className="font-medium">Category:</span> {product.category}</p>
                <p className="text-sm"><span className="font-medium">Color:</span> {product.color}</p>
                <p className="text-sm"><span className="font-medium">Season:</span> {product.season}</p>
                <p className="text-sm"><span className="font-medium">Available Sizes:</span> {product.sizes.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More from {product.brand}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailClient;

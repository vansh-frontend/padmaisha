'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { useEffect, useState } from 'react';

const BrandsPage = () => {
  const { state } = useApp();
  const [brandsReady, setBrandsReady] = useState(false);

  useEffect(() => {
    if (state.brands && state.brands.length > 0) {
      setBrandsReady(true);
    }
  }, [state.brands]);

  if (!brandsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-500 animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Brands</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our exclusive collection of fashion brands, carefully curated for retailers who demand quality and style.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.brands.map((brand) => (
            <Card 
              key={brand.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Brand Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{brand.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {brand.seasons.map((season: string) => (
                        <Badge key={season} className="bg-white/20 text-white border-white/30">
                          {season}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Available Collections</p>
                      <p className="font-semibold">{brand.seasons.join(' • ')}</p>
                    </div>
                    {/* Remove Math.random for SSR consistency */}
                    <div>
                      <p className="text-gray-600 text-sm">Products</p>
                      <p className="font-semibold">Many+</p>
                    </div>
                  </div>

                  <Link href={`/brands/${brand.id}`}>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Brands?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each brand in our collection is carefully selected based on quality, design, and market demand to ensure your retail success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Every brand meets our strict quality standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Tested</h3>
              <p className="text-gray-600">Proven success in retail markets across India</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">Best wholesale prices for maximum profit margins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
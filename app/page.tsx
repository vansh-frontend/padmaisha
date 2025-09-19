'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Star, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MarqueeText from '@/components/MarqueeText';

const RegistrationModal = dynamic(() => import('@/components/RegistrationModal'), {
  ssr: false
});

const HomePage = () => {
  const { state } = useApp();

  const scrollToBrands = () => {
    document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">  
      <RegistrationModal />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Fashion Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                UNLEASH YOUR
                <span className="block text-red-500">RETAIL STYLE</span>
                WITH PADMAISHA
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Premium B2B Clothing for Retailers – Exclusive Brands, Affordable Prices
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={scrollToBrands}
                  size="lg"
                   className="btn-primary px-8 py-4 text-lg ripple"
                >
                  Browse Brands
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                   className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg ripple"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            
            <div className="lg:justify-self-end animate-in slide-in-from-right duration-1000">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop"
                alt="Fashion Model"
                className="rounded-lg shadow-2xl max-w-md mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-gray-300">Products</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">20+</div>
            <div className="text-sm text-gray-300">Brands</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm text-gray-300">Retailers</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Padmaisha?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the best B2B fashion solutions for retailers with premium quality and competitive prices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">High-quality fashion from trusted brands</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Competitive Prices</h3>
                <p className="text-gray-600">Best wholesale prices for retailers</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">B2B Focused</h3>
                <p className="text-gray-600">Designed specifically for retailers</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trusted by 1000+</h3>
                <p className="text-gray-600">Retailers across the country</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Brands</h2>
            <p className="text-xl text-gray-600">
              Discover exclusive fashion brands for every season
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {state.brands.map((brand, index) => (
              <Card 
                key={brand.id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-0">
                  <Link href={`/brands/${brand.id}`} className="block">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        style={{ height: 'auto' }}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{brand.name}</h3>
                        <div className="flex gap-1 mt-1">
                          {brand.seasons.map((season: string) => (
                            <span key={season} className="text-xs bg-white/20 px-2 py-1 rounded">
                              {season}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white" asChild>
                        <span className="w-full btn-primary ripple">Explore Collection</span>
                      </Button>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Fashion Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful retailers who trust Padmaisha for their fashion needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100 px-8 py-4 text-lg ripple">
              Start Shopping Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-500 px-8 py-4 text-lg ripple">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Marquee */}
        <div className="bg-red-500 text-white py-2">
          <MarqueeText text="★ New Arrivals ★ 20% Discount ★ Best of the Week ★ Free Shipping" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Padmaisha</h3>
              <p className="text-gray-400 mb-4">
                Premium B2B fashion solutions for retailers across India.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="/gdpr" className="hover:text-white transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Padmaisha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
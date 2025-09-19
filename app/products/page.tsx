'use client';
import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ProductsPage = () => {
  const { state } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
    priceRange: { min: 0, max: 10000 },
    sizes: [] as string[],
    discount: [] as string[]
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...state.products];

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => filters.colors.includes(p.color));
    }
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(size => filters.sizes.includes(size)));
    }
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // popularity - random for demo
        break;
    }

    return filtered;
  }, [state.products, filters, sortBy]);

  const categories = Array.from(new Set(state.products.map(p => p.category)));
  const brands = Array.from(new Set(state.products.map(p => p.brand)));
  const colors = Array.from(new Set(state.products.map(p => p.color)));
  const sizes = Array.from(new Set(state.products.flatMap(p => p.sizes)));

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [type]: checked 
        ? [...(prev[type as keyof typeof prev] as string[]), value]
        : (prev[type as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      colors: [],
      priceRange: { min: 0, max: 10000 },
      sizes: [],
      discount: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
            <p className="text-xl text-gray-600">Discover our complete collection of premium B2B fashion</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white rounded-lg shadow-sm p-6 h-fit`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                CLEAR ALL
              </Button>
            </div>

            {/* Categories Filter */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
                <span className="font-medium">Categories</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="py-3 space-y-3">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => 
                        handleFilterChange('categories', category, checked as boolean)
                      }
                    />
                    <label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Brands Filter */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
                <span className="font-medium">Brands</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="py-3 space-y-3">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => 
                        handleFilterChange('brands', brand, checked as boolean)
                      }
                    />
                    <label htmlFor={brand} className="text-sm cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Colors Filter */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
                <span className="font-medium">Colors</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="py-3 space-y-3">
                {colors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={color}
                      checked={filters.colors.includes(color)}
                      onCheckedChange={(checked) => 
                        handleFilterChange('colors', color, checked as boolean)
                      }
                    />
                    <label htmlFor={color} className="text-sm cursor-pointer">
                      {color}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Sizes Filter */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
                <span className="font-medium">Sizes</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="py-3 space-y-3">
                {sizes.map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={filters.sizes.includes(size)}
                      onCheckedChange={(checked) => 
                        handleFilterChange('sizes', size, checked as boolean)
                      }
                    />
                    <label htmlFor={size} className="text-sm cursor-pointer">
                      {size}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-gray-600">
                  Showing {filteredAndSortedProducts.length} of {state.products.length} products
                </span>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <Button onClick={clearAllFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, MapPin, Tag } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CartPage = () => {
  const { state, dispatch } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link href="/brands">
            <Button className="bg-red-500 hover:bg-red-600">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      toast.success('Item removed from cart');
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    toast.success('Item removed from cart');
  };

  const applyCoupon = () => {
    const validCoupons = {
      'WELCOME12': 12,
      'FLAT20': 20,
      'SAVE15': 15
    };

    if (validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
      });
      toast.success(`Coupon applied! ${validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]}% discount`);
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  // Calculate totals
  const subtotal = state.cart.reduce((sum, item) => {
    const price = state.user?.isRegistered ? Math.round(item.price * 0.88) : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const originalTotal = state.cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  
  const couponDiscount = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount / 100) : 0;
  const platformFee = 20;
  const deliveryCharges = subtotal > 2000 ? 0 : 50;
  const finalTotal = subtotal - couponDiscount + platformFee + deliveryCharges;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => {
              const itemId = `${item.id}-${item.selectedSize}`;
              const itemPrice = state.user?.isRegistered ? Math.round(item.price * 0.88) : item.price;
              
              return (
                <Card key={itemId} className="p-4">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop';
                        }}
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{item.selectedSize}</Badge>
                              <Badge variant="outline" className="text-xs">{item.color}</Badge>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(itemId)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-lg">₹{(itemPrice * item.quantity).toLocaleString()}</div>
                            {item.originalPrice > item.price && (
                              <div className="text-sm text-gray-500 line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString()}
                              </div>
                            )}
                            {state.user?.isRegistered && (
                              <div className="text-xs text-green-600">12% discount applied</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Section */}
            <Card className="p-4">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Apply Coupon
                </h3>
                
                {appliedCoupon && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">{appliedCoupon.code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-green-600 text-sm">
                      {appliedCoupon.discount}% discount applied
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1"
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    Apply
                  </Button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Try: WELCOME12, FLAT20, SAVE15
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card className="p-4">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">Price Details</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total MRP</span>
                    <span>₹{originalTotal.toLocaleString()}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount on MRP</span>
                      <span>-₹{savings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {state.user?.isRegistered && (
                    <div className="flex justify-between text-green-600">
                      <span>Registration Discount (12%)</span>
                      <span>Included above</span>
                    </div>
                  )}
                  
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className={deliveryCharges === 0 ? "text-green-600" : ""}>
                      {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                    </span>
                  </div>
                  
                  <hr className="my-2" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Section */}
            <Card className="p-4">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Deliver to
                </h3>
                
                {state.addresses.length > 0 ? (
                  <div className="space-y-2">
                    {state.addresses.filter(addr => addr.isDefault)[0] && (
                      <div className="border rounded-lg p-3">
                        <div className="font-medium">{state.addresses.filter(addr => addr.isDefault)[0].name}</div>
                        <div className="text-sm text-gray-600">
                          {state.addresses.filter(addr => addr.isDefault)[0].address}
                        </div>
                        <div className="text-sm text-gray-600">
                          GST: {state.addresses.filter(addr => addr.isDefault)[0].gst}
                        </div>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      Change Address
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full">
                    Add Delivery Address
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Link href="/checkout">
              <Button className="w-full btn-primary text-white py-3 text-lg ripple">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
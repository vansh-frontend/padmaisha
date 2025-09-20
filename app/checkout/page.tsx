"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import RegistrationModal from '@/components/RegistrationModal';

const CheckoutPage = () => {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: state.user?.name || '',
    phone: state.user?.phone || '',
    address: state.user?.address || '',
    gst: state.user?.gst || ''
  });

  // Require login to access checkout page
  if (!state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to checkout</h1>
          <p className="text-gray-600 mb-6">You must be logged in to proceed with checkout.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect to cart page
  if (state.cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.address || !addressForm.gst) {
      toast.error('Please fill in all address details');
      return;
    }

    setLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    dispatch({ type: 'CLEAR_CART' });
    setOrderPlaced(true);
    setLoading(false);
    
    toast.success('Order placed successfully!');
  };

  // Calculate totals
  const subtotal = state.cart.reduce((sum, item) => {
    const price = state.user?.isRegistered ? Math.round(item.price * 0.88) : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const platformFee = 20;
  const deliveryCharges = subtotal > 2000 ? 0 : 50;
  const finalTotal = subtotal + platformFee + deliveryCharges;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <div className="space-y-2 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Order Total</p>
                <p className="text-xl font-bold">₹{finalTotal.toLocaleString()}</p>
              </div>
            </div>
            <Button 
              onClick={() => router.push('/')}
              className="w-full btn-primary ripple"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.cart.map((item) => {
                const itemPrice = state.user?.isRegistered ? Math.round(item.price * 0.88) : item.price;
                return (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{item.selectedSize}</Badge>
                        <Badge variant="outline" className="text-xs">Qty: {item.quantity}</Badge>
                      </div>
                      <div className="mt-1">
                        <span className="font-semibold">₹{(itemPrice * item.quantity).toLocaleString()}</span>
                        {state.user?.isRegistered && (
                          <span className="text-xs text-green-600 ml-2">(12% off applied)</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
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
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address & Payment */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Full Name"
                    value={addressForm.name}
                    onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Phone Number"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Complete Address"
                    value={addressForm.address}
                    onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Input
                    placeholder="GST Number (Required for B2B)"
                    value={addressForm.gst}
                    onChange={(e) => setAddressForm({...addressForm, gst: e.target.value.toUpperCase()})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium mb-2">Cash on Delivery (COD)</p>
                  <p className="text-blue-600 text-sm">
                    Pay when you receive your order. Additional COD charges may apply.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
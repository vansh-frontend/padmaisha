'use client';
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: 0,
      description: 'Perfect for small retailers getting started',
      features: [
        'Access to 5 brands',
        'Up to 50 products',
        'Basic customer support',
        'Standard shipping',
        '30-day return policy'
      ],
      popular: false,
      buttonText: 'Get Started Free'
    },
    {
      name: 'Professional',
      price: 2999,
      description: 'Ideal for growing retail businesses',
      features: [
        'Access to all 20+ brands',
        'Unlimited products',
        'Priority customer support',
        'Free shipping on orders above ₹1000',
        '45-day return policy',
        'Bulk order discounts up to 15%',
        'Dedicated account manager',
        'Monthly trend reports'
      ],
      popular: true,
      buttonText: 'Start Professional'
    },
    {
      name: 'Enterprise',
      price: 4999,
      description: 'For large retailers and chains',
      features: [
        'Everything in Professional',
        'Custom payment terms',
        'White-label packaging options',
        'Exclusive product lines',
        'Advanced analytics dashboard',
        'API access for integration',
        '24/7 phone support',
        'Quarterly business reviews'
      ],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your retail business. All plans include our premium B2B features with no hidden costs.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Badge className="bg-green-100 text-green-800">
                ✨ Special Launch Offer: 20% off first 3 months
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'ring-2 ring-red-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                  {plan.price > 0 && <span className="text-gray-600 ml-1">/month</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-900 hover:bg-gray-800'}`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Padmaisha?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide more than just products - we're your complete B2B fashion partner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Your business data is safe with enterprise-grade security</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it from our dedicated support team</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
              <p className="text-gray-600">Access to tools and insights to help scale your retail business</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Is there a minimum order requirement?</h3>
              <p className="text-gray-600">Starter plan has a minimum order of ₹5,000. Professional and Enterprise plans have no minimum order requirements.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, bank transfers, and UPI. Enterprise customers can also set up custom payment terms.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer custom solutions?</h3>
              <p className="text-gray-600">Yes, our Enterprise plan includes custom solutions. Contact our sales team to discuss your specific requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
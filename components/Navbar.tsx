'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useEffect, useState as useReactState } from 'react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './firebase/Login';
import Signup from './firebase/Signup';

const Navbar = () => {

  const { state } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useReactState(false);
  const [showSignup, setShowSignup] = useReactState(false);
  const [firebaseUser, setFirebaseUser] = useReactState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
    // setFirebaseUser is stable from useState, safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">Padmaisha</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/brands" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Brands
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Products
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Link>


            {/* Auth Buttons */}
            {firebaseUser ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium truncate max-w-[120px]" title={firebaseUser.displayName || firebaseUser.email}>
                    <User className="inline h-5 w-5 mr-1 text-gray-500" />
                    {firebaseUser.displayName || firebaseUser.email}
                  </span>
                  <Button
                    variant="ghost"
                    className="p-2 text-gray-700 hover:text-gray-900 flex items-center"
                    onClick={() => signOut(auth)}
                    title="Logout"
                  >
                    <LogOut className="h-6 w-6 mr-1" /> Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="p-2 text-gray-700 hover:text-gray-900 flex items-center"
                  onClick={() => setShowLogin(true)}
                  title="Login"
                >
                  <User className="h-6 w-6 mr-1" /> Login
                </Button>
                <Button
                  variant="ghost"
                  className="p-2 text-gray-700 hover:text-gray-900 flex items-center"
                  onClick={() => setShowSignup(true)}
                  title="Signup"
                >
                  <User className="h-6 w-6 mr-1" /> Signup
                </Button>
              </>
            )}
      {/* Login/Signup Modals */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowLogin(false)}>
              <X className="h-5 w-5" />
            </button>
            <Login onSuccess={() => setShowLogin(false)} />
            <div className="text-center mt-2">
              <span className="text-sm">Don&apos;t have an account?{' '}
                <button className="text-blue-600 underline" onClick={() => { setShowLogin(false); setShowSignup(true); }}>
                  Sign up
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowSignup(false)}>
              <X className="h-5 w-5" />
            </button>
            <Signup onSuccess={() => setShowSignup(false)} />
            <div className="text-center mt-2">
              <span className="text-sm">Already have an account?{' '}
                <button className="text-blue-600 underline" onClick={() => { setShowSignup(false); setShowLogin(true); }}>
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link href="/brands" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Brands
              </Link>
              <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Products
              </Link>
              <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </div>
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
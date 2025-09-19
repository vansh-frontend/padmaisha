'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  gst: string;
  address: string;
  isRegistered: boolean;
  discount: number;
}

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

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  gst: string;
  isDefault: boolean;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  addresses: Address[];
  products: Product[];
  brands: any[];
  showRegistrationModal: boolean;
  isAdminLoggedIn: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'TOGGLE_REGISTRATION_MODAL'; payload?: boolean }
  | { type: 'SET_ADMIN_LOGIN'; payload: boolean }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  cart: [],
  addresses: [],
  products: [],
  brands: [
    { id: 'urja-wacchi', name: 'Urja & WACCHI', seasons: ['Summer', 'Winter'], image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
    { id: 'lasoon', name: 'Lasoon', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400' },
    { id: 'radhika', name: 'Radhika', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400' },
    { id: 'jsur', name: 'Jsur', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400' },
    { id: 'avangard', name: 'Avangard', seasons: ['Winter', 'Summer'], image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
    { id: 'b-52', name: 'B-52', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400' },
    { id: 'oakberry', name: 'Oakberry', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400' },
    { id: 'domex-club', name: 'Domex Club', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
    { id: 'e-zinna', name: 'E Zinna', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },
    { id: 'belly-11', name: 'Belly-11', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400' },
    { id: 'miss-eney', name: 'Miss Eney', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400' },
    { id: 'princy', name: 'Princy', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400' },
    { id: 'pampara', name: 'Pampara', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
    { id: '5-rivers', name: '5 Rivers', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400' },
    { id: 'yushiika', name: 'Yushiika', seasons: ['Summer', 'Winter'], image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400' },
    { id: 'amba-jee', name: 'Amba Jee', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
    { id: 'anika', name: 'Anika', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=400' },
    { id: 'soulwin', name: 'Soulwin', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400' },
    { id: 'cute-souls', name: 'Cute Souls', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
    { id: 'yuvika-fashion', name: 'Yuvika Fashion', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400' },
    { id: 'lady-zone', name: 'Lady Zone', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400' },
    { id: 'sweet-sister', name: 'Sweet Sister', seasons: ['Winter'], image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400' },
  ],
  showRegistrationModal: false,
  isAdminLoggedIn: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.id === action.payload.product.id && item.selectedSize === action.payload.size
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.product.id && item.selectedSize === action.payload.size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload.product, quantity: 1, selectedSize: action.payload.size }]
      };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => `${item.id}-${item.selectedSize}` !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          `${item.id}-${item.selectedSize}` === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.payload] };
    case 'TOGGLE_REGISTRATION_MODAL':
      return { ...state, showRegistrationModal: action.payload ?? !state.showRegistrationModal };
    case 'SET_ADMIN_LOGIN':
      return { ...state, isAdminLoggedIn: action.payload };
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from localStorage
    const savedUser = localStorage.getItem('padmaisha_user');
    const savedCart = localStorage.getItem('padmaisha_cart');
    const savedAddresses = localStorage.getItem('padmaisha_addresses');
    const savedAdmin = localStorage.getItem('padmaisha_admin');

    const loadedData: Partial<AppState> = {};

    if (savedUser) {
      loadedData.user = JSON.parse(savedUser);
    }
    if (savedCart) {
      loadedData.cart = JSON.parse(savedCart);
    }
    if (savedAddresses) {
      loadedData.addresses = JSON.parse(savedAddresses);
    }
    if (savedAdmin) {
      loadedData.isAdminLoggedIn = JSON.parse(savedAdmin);
    }

    // Set products
    loadedData.products = generateMockProducts();

    dispatch({ type: 'LOAD_FROM_STORAGE', payload: loadedData });

    // Show registration modal after 2 seconds if not registered
    setTimeout(() => {
      if (!savedUser) {
        dispatch({ type: 'TOGGLE_REGISTRATION_MODAL', payload: true });
      }
    }, 2000);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever state changes
    if (state.user) {
      localStorage.setItem('padmaisha_user', JSON.stringify(state.user));
    }
    localStorage.setItem('padmaisha_cart', JSON.stringify(state.cart));
    localStorage.setItem('padmaisha_addresses', JSON.stringify(state.addresses));
    localStorage.setItem('padmaisha_admin', JSON.stringify(state.isAdminLoggedIn));
  }, [state.user, state.cart, state.addresses, state.isAdminLoggedIn]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const generateMockProducts = (): Product[] => {
  const categories = ['Kurtis', 'Tunics', 'Tops', 'Shirts', 'T-Shirts', 'Jeans', 'Jackets', 'Dresses', 'Blazers', 'Sweaters', 'Trousers'];
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Beige', 'Red', 'Blue'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const brands = [
    'Urja & WACCHI', 'Lasoon', 'Radhika', 'Jsur', 'Avangard', 'B-52', 'Oakberry', 'Domex Club',
    'E Zinna', 'Belly-11', 'Miss Eney', 'Princy', 'Pampara', '5 Rivers', 'Yushiika', 'Amba Jee',
    'Anika', 'Soulwin', 'Cute Souls', 'Yuvika Fashion', 'Lady Zone', 'Sweet Sister'
  ];
  
  const products: Product[] = [];
  
  brands.forEach((brand, brandIndex) => {
    for (let i = 0; i < 12; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const originalPrice = Math.floor(Math.random() * 2000) + 1000;
      const discount = Math.floor(Math.random() * 40) + 10;
      const price = Math.floor(originalPrice * (1 - discount / 100));
      
      products.push({
        id: `${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        name: `${brand} ${category} - ${color}`,
        price,
        originalPrice,
        image: `https://images.unsplash.com/photo-${1556905055 + brandIndex * 100 + i * 10}?w=400&h=500&fit=crop&crop=center`,
        brand,
        category,
        color,
        sizes: sizes.slice(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) + 4),
        description: `Premium quality ${category.toLowerCase()} from ${brand}. Perfect for retailers looking for high-quality fashion pieces.`,
        season: Math.random() > 0.5 ? 'Winter' : 'Summer'
      });
    }
  });
  
  return products;
};
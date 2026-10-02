import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getMaxQty, type Product } from '@/data/catalog';

export interface CartItem {
  product: Product;
  packSize: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, packSize: string, quantity?: number) => void;
  removeItem: (productId: string, packSize: string) => void;
  updateQuantity: (productId: string, packSize: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'kisan-mitra-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as CartItem[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, packSize: string, quantity = 1) => {
    const maxQty = getMaxQty(product.id);
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.packSize === packSize);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.packSize === packSize
            ? { ...i, quantity: Math.min(maxQty, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { product, packSize, quantity: Math.min(maxQty, quantity) }];
    });
  }, []);

  const removeItem = useCallback((productId: string, packSize: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.packSize === packSize)));
  }, []);

  const updateQuantity = useCallback((productId: string, packSize: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.product.id === productId && i.packSize === packSize)));
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.packSize === packSize
          ? { ...i, quantity: Math.min(getMaxQty(i.product.id), quantity) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

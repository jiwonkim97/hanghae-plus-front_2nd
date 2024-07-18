// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from './utils/cartUtils';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const _findIndex = (productId: string) => {
    return cart.findIndex(item => item.product.id === productId)
  }

  const addToCart = (product: Product) => {
    const targetId = _findIndex(product.id)
    if(targetId === -1){
      setCart(cur => [...cur, {product, quantity:1}])
    }else{
      setCart((cur) => {
        const newCart = [...cur];
        newCart[targetId].quantity += 1;
        return newCart;
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((cur) => updateCartItemQuantity(cur, productId, 0))
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((cur) => updateCartItemQuantity(cur, productId, newQuantity))
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};

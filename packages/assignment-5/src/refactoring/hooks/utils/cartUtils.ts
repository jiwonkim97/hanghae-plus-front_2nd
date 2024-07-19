import { CartItem, Coupon } from "../../../types";

export const calculateItemTotal = (item: CartItem) => {
  const topDiscountRate = getMaxApplicableDiscount(item)

  return (1 - topDiscountRate) * item.quantity * item.product.price
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const discounts = [...item.product.discounts]
  let topDiscountRate = 0
  
  discounts.forEach(discount => discount.quantity <= item.quantity ? topDiscountRate = discount.rate : null)

  return topDiscountRate;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((prev, cur) => prev + cur.quantity * cur.product.price, 0)
  const amountDiscount = cart.map(item => getMaxApplicableDiscount(item) * item.quantity * item.product.price).reduce((prev, cur) => prev + cur, 0)
  const couponDiscount = _calculateCouponDiscount(totalBeforeDiscount - amountDiscount, selectedCoupon)
  const totalDiscount = amountDiscount + couponDiscount
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const _calculateCouponDiscount = (totalAfterDiscount: number, selectedCoupon: Coupon | null) => {
  if(selectedCoupon === null){
    return 0
  }
  switch(selectedCoupon.discountType){
    case 'amount':
      return selectedCoupon.discountValue
    case 'percentage':
      return (selectedCoupon.discountValue / 100) * totalAfterDiscount
    default :
      return 0
  }
}

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  const targetId = cart.findIndex(item => item.product.id === productId)
  if(targetId === -1){
    return cart
  }
  const newCart = [...cart];

  // delete
  if(newQuantity === 0){
    return newCart.filter(item => item.product.id !== productId)
  }

  // update
  newCart[targetId].quantity = Math.min(newQuantity, newCart[targetId].product.stock);

  return newCart
};

import { useState } from "react";
import { Coupon } from "../../types";

export const useAdmin = () => {
  const [coupon, setCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0
  });
  
  const updateNewCoupon = (newCoupon: Coupon) => {
    setCoupon(newCoupon)
  }

  const addCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
    onCouponAdd(coupon);
    setCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0
    });
  };

  return {newCoupon: coupon, updateNewCoupon, addCoupon}
}
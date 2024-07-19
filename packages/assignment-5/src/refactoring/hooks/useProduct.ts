import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const updateProduct = (product: Product) => {
    setProducts(cur => {
      const newProducts = [...cur]
      const targetIndex = newProducts.findIndex(p => p.id === product.id)
      newProducts[targetIndex] = product

      return newProducts
    })
  }

  const addProduct = (product: Product) => {
    setProducts(cur => {
      const newProducts = [...cur]
      newProducts.push(product)

      return newProducts
    })
  }
  
  return { products, updateProduct, addProduct };
};

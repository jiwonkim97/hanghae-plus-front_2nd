export const createShoppingCart = () => {
  /**
   * [{ 
   *    product : { 
   *      id: 'p1', 
   *      name: '상품1', 
   *      price: 10000 ,
   *      discount: [[10, 0.1]]
   *    }, 
   *    quantity: 2 
   *  }
   *  ...]
   * 의 형태로 저장
   */
  const items = {};

  /**
   * id에 해당하는 item 수량을 늘립니다.
   * quantity로 받는 값이 있을 때, 해당 수량만큼 늘려줍니다.
   * @param {*} product 
   * @param {*} quantity 
   * @returns 
   */
  const addItem = (product, quantity = 1) => items[product.id] = {product, quantity: (items[product.id]?.quantity ?? 0) + quantity};

  /**
   * id에 해당하는 item 수량을 줄입니다.
   * quantity로 받는 값이 있을 때, 해당 수량만큼 줄여줍니다.
   * @param {*} id 
   * @param {*} quantity 
   * @returns 
   */
  const removeItem = (id, quantity = 1) => items[id] = {...items[id], quantity: (items[id]?.quantity ?? 0) - quantity};

  /**
   * id에 해당하는 item의 수량을 quantity로 변경합니다.
   * @param {*} id 
   * @param {*} quantity 
   * @returns 
   */
  const updateQuantity = (id, quantity) => items[id] = {...items[id], quantity};

  /**
   * 현재 items의 상태를 리턴합니다.
   * @returns 
   */
  const getItems = () => Object.keys(items).filter(key => items[key]?.quantity > 0).map(key => items[key]);

  // 최종 할인율을 계산합니다
  const calculateDiscount = () => {
    const totalQuantity = getTotalQuantity()
    // 전체 수량이 30개 이상일때 25% 할인 적용
    if(totalQuantity >= 30){
      return 0.25
    }
    
    // 정가와 총 할인금액을 기반으로 최종 할인 비율을 계산합니다
    const {totalPrice, totalDiscount} = Object.keys(items).map(key => {
      const targetItem = items[key];
      const price = targetItem.quantity * targetItem.product.price
      const isDiscountable = targetItem.quantity >= (targetItem.product.discount ?? [[0,0]])[0][0];
      const discountRate = isDiscountable ? (targetItem.product.discount ?? [[0,0]])[0][1] : 0
      
      return {totalPrice: price, totalDiscount: price * discountRate}
    }).reduce((prev, {totalPrice, totalDiscount}) => ({totalPrice: prev.totalPrice + totalPrice, totalDiscount: prev.totalDiscount + totalDiscount}), {totalPrice: 0, totalDiscount: 0})

    return Math.round((totalDiscount / totalPrice) * 100) / 100;
  };

  // 전체 수량을 계산합니다
  const getTotalQuantity = () => Object.keys(items).reduce((prev, key) => prev + items[key].quantity, 0);

  // 최종 금액과 최종 할인율을 반환합니다
  const getTotal = () => ({
    total: Math.round(Object.keys(items).reduce((prev, key) => prev + items[key].product.price * items[key].quantity, 0) * (1 - calculateDiscount())),
    discountRate: calculateDiscount()
  });

  return { addItem, removeItem, updateQuantity, getItems, getTotal };
};

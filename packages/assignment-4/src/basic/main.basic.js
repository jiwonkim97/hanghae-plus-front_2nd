function main() {
  var productList = [
    { id: 'p1', name: '상품1', price: 10000 },
    { id: 'p2', name: '상품2', price: 20000 },
    { id: 'p3', name: '상품3', price: 30000 }
  ];

  var root = document.getElementById('app');
  var cartContainer = document.createElement('div');
  var cart = document.createElement('div');
  var cartTitle = document.createElement('h1');
  var cartItems = document.createElement('div');
  var cartTotal = document.createElement('div');
  var productSelect = document.createElement('select');
  var addButton = document.createElement('button');

  /**
   * Init root
   */
  root.appendChild(cartContainer);

  /**
   * Init cartContainer
   */
  cartContainer.className = 'bg-gray-100 p-8';
  cartContainer.appendChild(cart);

  /**
   * Init cart
   */
  cart.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  cart.appendChild(cartTitle);
  cart.appendChild(cartItems);
  cart.appendChild(cartTotal);
  cart.appendChild(productSelect);
  cart.appendChild(addButton);

  /**
   * Init cartTitle
   */
  cartTitle.className = 'text-2xl font-bold mb-4';
  cartTitle.textContent = '장바구니';

  /**
   * Init cartItems
   */
  cartItems.id = 'cart-items';

  /**
   * Init cartTotal
   */
  cartTotal.id = 'cart-total';
  cartTotal.className = 'text-xl font-bold my-4';

  /**
   * Init productSelect
   */
  productSelect.id = 'product-select';
  productSelect.className = 'border rounded p-2 mr-2';
  for (var i = 0; i < productList.length; i++) {
    var option = document.createElement('option');
    option.value = productList[i].id;
    option.textContent = productList[i].name + ' - ' + productList[i].price + '원';
    productSelect.appendChild(option);
  }

  /**
   * Init addButton
   */
  addButton.id = 'add-to-cart';
  addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addButton.textContent = '추가';

  function updateCart() {
    var finalPrice = 0;
    var totalQuantity = 0;
    var items = cartItems.children;
    var totalItemsPrice = 0;

    for (var i = 0; i < items.length; i++) {
      var item;
      for (var j = 0; j < productList.length; j++) {
        if (productList[j].id === items[i].id) {
          item = productList[j];
          break;
        }
      }
      var quantity = parseInt(items[i].querySelector('span').textContent.split('x ')[1]);
      var totalItemPrice = item.price * quantity;
      var discount = 0;

      totalQuantity += quantity;
      totalItemsPrice += totalItemPrice;
      if (quantity >= 10) {
        if (item.id === 'p1') discount = 0.1;
        else if (item.id === 'p2') discount = 0.15;
        else if (item.id === 'p3') discount = 0.2;
      }
      finalPrice += totalItemPrice * (1 - discount);
    }

    var discountRate = 0;
    if (totalQuantity >= 30) {
      var bulkDiscount = finalPrice * 0.25;
      var individualDiscount = totalItemsPrice - finalPrice;
      if (bulkDiscount > individualDiscount) {
        finalPrice = totalItemsPrice * 0.75;
        discountRate = 0.25;
      } else {
        discountRate = (totalItemsPrice - finalPrice) / totalItemsPrice;
      }
    } else {
      discountRate = (totalItemsPrice - finalPrice) / totalItemsPrice;
    }

    cartTotal.textContent = '총액: ' + Math.round(finalPrice) + '원';
    if (discountRate > 0) {
      var discountText = document.createElement('span');
      discountText.className = 'text-green-500 ml-2';
      discountText.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
      cartTotal.appendChild(discountText);
    }
  }

  addButton.onclick = function () {
    var selectedProductId = productSelect.value;
    var selectedProduct;
    for (var k = 0; k < productList.length; k++) {
      if (productList[k].id === selectedProductId) {
        selectedProduct = productList[k];
        break;
      }
    }
    if (selectedProduct) {
      var targetElement = document.getElementById(selectedProduct.id);
      if (targetElement) {
        var quantity = parseInt(targetElement.querySelector('span').textContent.split('x ')[1]) + 1;
        targetElement.querySelector('span').textContent = selectedProduct.name + ' - ' + selectedProduct.price + '원 x ' + quantity;
      } else {
        var productContainer = document.createElement('div');
        var productDetail = document.createElement('span');
        var buttonsContainer = document.createElement('div');
        var minusButton =document.createElement('button');
        var plusButton = document.createElement('button');
        var removeButton = document.createElement('button');

        productContainer.id = selectedProduct.id;
        productContainer.className ='flex justify-between items-center mb-2';
        productDetail.textContent = selectedProduct.name + ' - ' + selectedProduct.price + '원 x 1';

        minusButton.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        minusButton.textContent = '-';
        minusButton.dataset.productId = selectedProduct.id;
        minusButton.dataset.change = '-1';

        plusButton.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        plusButton.textContent = '+';
        plusButton.dataset.productId = selectedProduct.id;
        plusButton.dataset.change = '1';

        removeButton.className = 'remove-item bg-red-500 text-white px-2 py-1 rounded';
        removeButton.textContent = '삭제';
        removeButton.dataset.productId = selectedProduct.id;

        buttonsContainer.appendChild(minusButton);
        buttonsContainer.appendChild(plusButton);
        buttonsContainer.appendChild(removeButton);

        productContainer.appendChild(productDetail);
        productContainer.appendChild(buttonsContainer);

        cartItems.appendChild(productContainer);
      }
      updateCart();
    }
  };

  cartItems.onclick = function (event) {
    var target = event.target;
    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
      var productId = target.dataset.productId;
      var item = document.getElementById(productId);
      if (target.classList.contains('quantity-change')) {
        var change = parseInt(target.dataset.change);
        var quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + change;
        if (quantity > 0) {
          item.querySelector('span').textContent = item.querySelector('span').textContent.split('x ')[0] + 'x ' + quantity;
        } else {
          item.remove();
        }
      } else if (target.classList.contains('remove-item')) {
        item.remove();
      }
      updateCart();
    }
  };
}

main();

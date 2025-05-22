class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
    console.log(this);
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        deliveryOptionId: '1',
        quantity: 2
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        deliveryOptionId: '2',
        quantity: 1
      }
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    // || 1 is for testing to have value
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`) || '1';
    const quantity = Number(quantitySelector.value) || 1;
    //console.log(quantity);

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
      //console.log(matchingItem.quantity);
    }
    else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    //console.log(cart);
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity = cartQuantity + cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.updateCartQuantity();
    this.saveToStorage();
  }

  updateCartQuantity() {
    const cartQuantity = this.calculateCartQuantity();

    document.querySelector('.js-return-to-home-link').innerText = `${cartQuantity} items`;
  }

  handleUpdateQuantity(productId, quantityInput) {
    const newQuantity = Number(quantityInput.value);
    //console.log(newQuantity);
    if (newQuantity >= 0 && newQuantity < 1000) {
      updateQuantity(productId, newQuantity);

      document.querySelector(`.js-quantity-label-${productId}`).innerText = newQuantity;
    }

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.updateCartQuantity();
    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(businessCart instanceof Cart);
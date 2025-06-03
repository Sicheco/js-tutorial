export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
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

export function addToCart(productId) {
  let matchingItem;
  // || 1 is for testing to have value
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`) || '1';
  const quantity = Number(quantitySelector.value) || 1;
  //console.log(quantity);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
    //console.log(matchingItem.quantity);
  }
  else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  
  //console.log(cart);
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity = cartQuantity + cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });

  updateCartQuantity();
  saveToStorage();
}

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link').innerText = `${cartQuantity} items`;
}

export function updateOrdersCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerText = `${cartQuantity}`;
}

export function handleUpdateQuantity(productId, quantityInput) {
  const newQuantity = Number(quantityInput.value);
  //console.log(newQuantity);
  if (newQuantity >= 0 && newQuantity < 1000) {
    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-quantity-label-${productId}`).innerText = newQuantity;
  }

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  updateCartQuantity();
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();

  console.log(text);
  return text;
}
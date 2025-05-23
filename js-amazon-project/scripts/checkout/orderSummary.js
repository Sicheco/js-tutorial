import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateCartQuantity, handleUpdateQuantity, updateDeliveryOption, saveToStorage } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { isWeekend } from '../utils/date.js'
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption); 

    cartHTML += `
    <div class="cart-item-container js-cart-item-container
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      //console.log(dateString);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHTML += `<div class="delivery-option js-delivery-option" 
    data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`
    });

    return deliveryHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton.dataset.productId;
      removeFromCart(productId);
      //console.log(cart);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-quantity-link').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const productId = updateButton.dataset.productId;
      //console.log(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((saveButton) => {
    const productId = saveButton.dataset.productId;
    //console.log(productId);
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

    saveButton.addEventListener('click', () => {
      handleUpdateQuantity(productId, quantityInput);
    });

    quantityInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleUpdateQuantity(productId, quantityInput);
      }
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId, deliveryOptionId } = link.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
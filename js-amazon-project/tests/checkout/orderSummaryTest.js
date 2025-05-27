import { loadFromStorage } from '../../data/cart.js';
import { loadProductsFetch } from '../../data/products.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    //comment code below for view
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('display cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
  });
});
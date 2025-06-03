export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  savetoStorage();
}

function savetoStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (orderId === order.id) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}
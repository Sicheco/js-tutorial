import { formatCurrency } from "../../scripts/utils/money.js";

const money = [2000.5, 1082, -2983, 0, 398, 1092.9, NaN, 5 + 2, 2000.4, -500];

let testItem;
money.forEach((item) => {
  testItem = formatCurrency(item);
  console.log(`Item: ${item}, testItem: ${testItem}`);
});
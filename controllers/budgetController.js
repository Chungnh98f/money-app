"use strict";

import { data, storageKey } from "./../app.js";

function addNewData(type, description, value) {
  const newItem = { type: type, description: description, value: value };
  if (type === "income") {
    data.allItems.inc.push(newItem);
  } else {
    data.allItems.exp.push(newItem);
  }
  updateData();
}

function updateData() {
  data.totals.inc = 0;
  data.totals.exp = 0;
  for (const item of data.allItems.inc) {
    data.totals.inc += item.value;
  }

  for (const item of data.allItems.exp) {
    data.totals.exp += item.value;
  }

  data.budget = data.totals.inc - data.totals.exp;

  data.percentage = (data.totals.exp / data.totals.inc) * 100;
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export { addNewData, updateData };

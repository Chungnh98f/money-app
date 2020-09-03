import { data } from "./../../app.js";
import { updateData, addNewData } from "../../controllers/budgetController.js";

class MainScreen extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("budget-app").content.cloneNode(true)
    );
    this.$budget = this._shadowRoot.querySelector(".budget__value");
    this.$totalIncome = this._shadowRoot.querySelector(
      ".budget__income--value"
    );
    this.$totalExpense = this._shadowRoot.querySelector(
      ".budget__expenses--value"
    );
    this.$expensePercent = this._shadowRoot.querySelector(
      ".budget__expenses--percentage"
    );
    this.$incomeList = this._shadowRoot.querySelector(".income__list");
    this.$expenseList = this._shadowRoot.querySelector(".expenses__list");

    this.$form = this._shadowRoot.querySelector("form");
    this.$type = this._shadowRoot.querySelector("select");
    this.$description = this._shadowRoot.querySelector(
      "input.add__description"
    );
    this.$value = this._shadowRoot.querySelector("input.add__value");

    this.$form.addEventListener("submit", this.addItem.bind(this));
  }

  render() {
    this.$budget.innerHTML = `+ ${data.budget}`;
    this.$totalIncome.innerHTML = `+ ${data.totals.inc}`;
    this.$totalExpense.innerHTML = `- ${data.totals.exp}`;
    this.$expensePercent.innerHTML = `${data.percentage.toFixed(2)}%`;

    this.$incomeList.innerHTML = "";
    this.$expenseList.innerHTML = "";

    data.allItems.inc.forEach((item, index) => {
      const $incomeItem = document.createElement("income-item");
      $incomeItem.index = index;
      $incomeItem.description = item.description;
      $incomeItem.value = item.value;
      $incomeItem.addEventListener("onRemove", this.removeIncItem.bind(this));
      this.$incomeList.appendChild($incomeItem);
    });

    data.allItems.exp.forEach((item, index) => {
      const $expenseItem = document.createElement("expense-item");
      $expenseItem.index = index;
      $expenseItem.description = item.description;
      $expenseItem.value = item.value;
      $expenseItem.totalIncome = data.totals.inc;
      $expenseItem.addEventListener("onRemove", this.removeExpItem.bind(this));
      this.$expenseList.appendChild($expenseItem);
    });
    this.$description.focus();
  }

  removeIncItem(e) {
    data.allItems.inc.splice(e.detail, 1);
    updateData();
    this.render();
  }

  removeExpItem(e) {
    data.allItems.exp.splice(e.detail, 1);
    updateData();
    this.render();
  }

  addItem(e) {
    e.preventDefault();
    addNewData(
      this.$type.value,
      this.$description.value,
      Number(this.$value.value)
    );
    this.render();
    this.$description.value = "";
    this.$value.value = "";
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("main-screen", MainScreen);

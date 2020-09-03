"use strict";

class ExpenseItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("expense-item").content.cloneNode(true)
    );
    this.$description = this._shadowRoot.querySelector(".item__description");
    this.$value = this._shadowRoot.querySelector(".item__value");
    this.$percentage = this._shadowRoot.querySelector(".item__percentage");
    this.$removeBtn = this._shadowRoot.querySelector("button");

    this.$removeBtn.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.index }));
    });
  }
  static get observedAttributes() {
    return ["index", "description", "value", "totalIncome"];
  }

  set index(newVal) {
    this.setAttribute("index", newVal);
  }
  get index() {
    return this.getAttribute("index");
  }
  set value(newVal) {
    this.setAttribute("value", newVal);
  }
  get value() {
    return this.getAttribute("value");
  }
  set description(newVal) {
    this.setAttribute("description", newVal);
  }
  get description() {
    return this.getAttribute("description");
  }
  set totalIncome(newVal) {
    this.setAttribute("totalIncome", newVal);
  }
  get totalIncome() {
    return this.getAttribute("totalIncome");
  }
  render() {
    this.$description.innerHTML = this.description;
    this.$value.innerHTML = this.value;
    this.$percentage.innerHTML = ` ${(
      (this.value / this.totalIncome) *
      100
    ).toFixed(2)}%`;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("expense-item", ExpenseItem);

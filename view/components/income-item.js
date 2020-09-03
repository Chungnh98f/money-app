"use strict";

class IncomeItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(
      document.getElementById("income-item").content.cloneNode(true)
    );
    this.$description = this._shadowRoot.querySelector(".item__description");
    this.$value = this._shadowRoot.querySelector(".item__value");
    this.$removeBtn = this._shadowRoot.querySelector("button");
    this.$removeBtn.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.index }));
    });
  }
  static get observedAttributes() {
    return ["index", "description", "value"];
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

  renderItem() {
    this.$description.innerHTML = this.description;
    this.$value.innerHTML = this.value;
  }

  connectedCallback() {
    this.renderItem();
  }
}

customElements.define("income-item", IncomeItem);

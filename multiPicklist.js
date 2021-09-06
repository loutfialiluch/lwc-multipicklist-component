import { api, LightningElement } from "lwc";

const options = ["JavaScript", "HTML", "CSS", "ReactJS", "ExpressJS", "NodeJS"];
export default class MultiPicklist extends LightningElement {
  @api
  options = options;

  outputValue = "Nothing is selected";

  isOpen = false;
  selectedItems = [];

  handleSelection(event) {
    const selectedEl = event.target;
    const value = event.target.innerText;
    if (selectedEl.classList?.contains("selected")) {
      this.removeItem(value);
      selectedEl.classList.remove("selected");
    } else {
      this.addItem(value);
      selectedEl.classList.add("selected");
    }
    this.setOutputValue();
  }

  toggleMenu() {
    this.template
      .querySelector(".multi-picklist__output")
      .classList.toggle("drop-down-open");
    this.isOpen = !this.isOpen;
  }

  addItem(item) {
    this.selectedItems = [...this.selectedItems, item];
  }

  removeItem(item) {
    this.selectedItems = this.selectedItems.filter(
      (element) => element !== item
    );
  }

  setOutputValue() {
    if (this.selectedItems.length === 0) {
      this.outputValue = "Nothing is selected";
      return;
    }
    if (this.selectedItems.length === options.length) {
      this.outputValue = "All items are selected";
    } else if (this.selectedItems.length > 3) {
      this.outputValue = `${this.selectedItems.length} items selected`;
    } else {
      const outputValue = this.selectedItems.join(", ");
      this.outputValue = outputValue;
    }
  }
}

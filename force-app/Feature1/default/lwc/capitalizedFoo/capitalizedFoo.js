import { LightningElement, wire } from "lwc";
import getFooStr from "@salesforce/apex/Utils.getFooStr";

export default class CapitalizedFoo extends LightningElement {
  fooStr;

  /**
   * @type {string}
   */
  @wire(getFooStr) wiredFooStr({ error, data }) {
    if (data) {
      this.fooStr = data;
    } else if (error) {
      console.error(error);
    }
  }

  get capitalizedFoo() {
    if (!this.fooStr) {
      return "";
    }
    return this.fooStr.toUpperCase();
  }
}

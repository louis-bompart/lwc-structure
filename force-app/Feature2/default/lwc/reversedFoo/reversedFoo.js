import { LightningElement, wire } from "lwc";
import getFooStr from "@salesforce/apex/Utils.getFooStr";

export default class ReversedFoo extends LightningElement {
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

  get reversedFoo() {
    if (!this.fooStr) {
      return "";
    }
    return this.fooStr.split("").reverse().join("");
  }
}

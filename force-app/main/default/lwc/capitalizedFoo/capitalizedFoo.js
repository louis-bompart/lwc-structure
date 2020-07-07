import { LightningElement, wire } from 'lwc';
import getFooStr from "@salesforce/apex/Utils.getFooStr";
export default class CapitalizedFoo extends LightningElement {
    /**
     * @type {string}
     */
    @wire(getFooStr) fooStr;

    get capitalizedFoo() {
        return this.fooStr.toUpperCase();
    }
}
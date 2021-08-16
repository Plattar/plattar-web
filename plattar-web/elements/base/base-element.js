const ElementController = require("../controllers/element-controller");

class BaseElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._controller = new ElementController(this);
    }

    set onready(callback) {
        if (this._controller) {
            this._controller.onload = callback;

            return;
        }

        throw new Error("set BaseElement.onready - cannot use as element not connected");
    }

    get messenger() {
        return this._controller ? this._controller.messenger : undefined;
    }

    get context() {
        return this._controller ? this._controller.context : undefined;
    }

    get element() {
        return this._controller;
    }

    get ready() {
        return this._controller ? true : false;
    }

    get allowDragDrop() {
        return this._controller ? this._controller.controller.allowDragDrop : false;
    }

    set allowDragDrop(value) {
        if (this._controller) {
            this._controller.controller.allowDragDrop = value;

            return;
        }

        throw new Error("set BaseElement.allowDragDrop - cannot use as element not connected");
    }

    get permissions() {
        return [];
    }

    get elementType() {
        return "none";
    }
}

module.exports = BaseElement;
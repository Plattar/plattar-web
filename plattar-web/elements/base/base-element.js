const ElementController = require("../controllers/element-controller");

class BaseElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._controller = new ElementController(this);
    }

    get messenger() {
        return this._controller ? this._controller.messenger : undefined;
    }

    get ready() {
        return this._controller ? true : false;
    }

    get allowDragging() {
        return this._controller ? this._controller.controller.allowDragging : false;
    }

    set allowDragging(value) {
        if (this._controller) {
            this._controller.controller.allowDragging = value;
        }
    }

    get permissions() {
        return [];
    }

    get elementType() {
        return "none";
    }
}

module.exports = BaseElement;
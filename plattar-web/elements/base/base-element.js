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

    get permissions() {
        return [];
    }

    get elementType() {
        return "none";
    }
}

module.exports = BaseElement;
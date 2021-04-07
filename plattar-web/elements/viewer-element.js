const BaseElement = require("./base/base-element.js");

class ViewerElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "viewer";
    }
}

module.exports = ViewerElement;
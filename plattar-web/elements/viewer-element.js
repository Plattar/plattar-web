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

    get optionalAttributes() {
        return [{
            key: "variation-id",
            map: "variationId"
        }, {
            key: "product-id",
            map: "productId"
        }, {
            key: "show-ar",
            map: "show_ar"
        }];
    }
}

module.exports = ViewerElement;
const BaseElement = require("./base/base-element.js");

class ProductElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "product";
    }

    get coreAttributes() {
        return [{
            key: "product-id",
            map: "product_id"
        }];
    }

    get optionalAttributes() {
        return [{
            key: "variation-id",
            map: "variation_id"
        }, {
            key: "show-ar",
            map: "show_ar"
        }];
    }
}

module.exports = ProductElement;
const BaseElement = require("./base/base-element.js");

class FaceARElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay"];
    }

    get elementType() {
        return "facear";
    }

    get optionalAttributes() {
        return [{
            key: "variation-id",
            map: "variationId"
        }, {
            key: "product-id",
            map: "productId"
        }];
    }
}

module.exports = FaceARElement;
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
            key: "variation-sku",
            map: "variationSku"
        }, {
            key: "product-id",
            map: "productId"
        }, {
            key: "config-state",
            map: "config_state"
        }, {
            key: "show-ar",
            map: "show_ar"
        }];
    }
}

module.exports = FaceARElement;
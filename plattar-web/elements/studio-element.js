const BaseElement = require("./base/base-element.js");

class StudioElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "studio";
    }

    get optionalAttributes() {
        return [{
            key: "variation-id",
            map: "variationId"
        }, {
            key: "variation-sku",
            map: "variationSku"
        }];
    }
}

module.exports = StudioElement;
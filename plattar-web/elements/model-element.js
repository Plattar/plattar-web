const BaseElement = require("./base/base-element.js");

class ModelElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "model";
    }

    get coreAttributes() {
        return [{
            key: "model-id",
            map: "model_id"
        }];
    }
}

module.exports = ModelElement;
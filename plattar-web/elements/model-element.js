const BaseElement = require("./base/base-element.js");

class ModelElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay"];
    }

    get elementType() {
        return "model";
    }

    get coreAttributes() {
        return [];
    }

    get optionalAttributes() {
        return [{
            key: "mode",
            map: "mode"
        }, {
            key: "capture-id",
            map: "capture_id"
        }, {
            key: "model-id",
            map: "model_id"
        }];
    }
}

module.exports = ModelElement;
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
}

module.exports = FaceARElement;
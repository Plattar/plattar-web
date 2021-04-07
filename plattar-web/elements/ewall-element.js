const BaseElement = require("./base/base-element.js");

class EWallElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking"];
    }

    get elementType() {
        return "ewall";
    }
}

module.exports = EWallElement;
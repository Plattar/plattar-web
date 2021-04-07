const BaseElement = require("./base/base-element.js");

class WebXRElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking"];
    }

    get elementType() {
        return "webxr";
    }
}

module.exports = WebXRElement;
const PlattarSceneElement = require("./plattar-scene-element.js");

class WebXRElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking"];
    }

    connectedCallback() {
        this._setup("webxr");
    }
}

module.exports = WebXRElement;
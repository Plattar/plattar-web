const PlattarSceneElement = require("./plattar-scene-element.js");

class EWallElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking"];
    }

    connectedCallback() {
        this._setup("ewall");
    }
}

module.exports = EWallElement;
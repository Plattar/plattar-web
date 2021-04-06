const PlattarSceneElement = require("./plattar-scene-element.js");

class FaceARElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay"];
    }

    connectedCallback() {
        this._setup("facear");
    }
}

module.exports = FaceARElement;
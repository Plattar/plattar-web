const PlattarSceneElement = require("./plattar-scene-element.js");

class ViewerElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    connectedCallback() {
        this._setup("viewer");
    }
}

module.exports = ViewerElement;
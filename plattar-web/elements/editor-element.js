const PlattarSceneElement = require("./plattar-scene-element.js");

class EditorElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    connectedCallback() {
        this._setup("editor");
    }
}

module.exports = EditorElement;
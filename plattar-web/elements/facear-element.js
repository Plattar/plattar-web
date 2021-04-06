const PlattarSceneElement = require("./plattar-scene-element.js");

class FaceARElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const iframe = this._setup("facear");
        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("allow", "camera; autoplay");

        shadow.append(iframe);
    }
}

module.exports = FaceARElement;
const PlattarSceneElement = require("./plattar-scene-element.js");

class EWallElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const iframe = this._setup("ewall");
        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("allow", "camera; autoplay; xr-spatial-tracking");

        shadow.append(iframe);
    }
}

module.exports = EWallElement;
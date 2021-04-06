const PlattarSceneElement = require("./plattar-scene-element.js");

class WebXRElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const iframe = this._setup("webxr");
        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("allow", "camera; autoplay; xr-spatial-tracking");

        shadow.append(iframe);
    }
}

module.exports = WebXRElement;
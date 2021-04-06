const PlattarSceneElement = require("./plattar-scene-element.js");

class ViewerElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const iframe = this._setup("viewer");
        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("allow", "autoplay");

        shadow.append(iframe);
    }
}

module.exports = ViewerElement;
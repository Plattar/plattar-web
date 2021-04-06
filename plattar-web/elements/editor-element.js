const PlattarSceneElement = require("./plattar-scene-element.js");

class EditorElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const iframe = this._setup("editor");
        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("allow", "autoplay");

        shadow.append(iframe);
    }
}

module.exports = EditorElement;
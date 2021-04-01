const PlattarSceneElement = require("./plattar-scene-element.js");

class EWallElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "ewall.html?scene_id=" + nodes.sceneID);

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = EWallElement;
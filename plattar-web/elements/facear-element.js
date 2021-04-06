const PlattarSceneElement = require("./plattar-scene-element.js");

class FaceARElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "facear.html?scene_id=" + nodes.sceneID);
        iframe.setAttribute("allow", "camera *");

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = FaceARElement;
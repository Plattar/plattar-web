const Util = require("../util/util.js");

class ViewerElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

        if (sceneID === undefined) {
            throw new Error("ViewerElement - required attribute \"scene-id\" is missing");
        }

        const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

        const serverLocation = Util.getServerLocation(server);

        if (serverLocation === undefined) {
            throw new Error("ViewerElement - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        // clear to proceed
        const iframe = document.createElement("iframe");

        iframe.setAttribute("width", this.hasAttribute("width") ? this.getAttribute("width") : "400");
        iframe.setAttribute("height", this.hasAttribute("height") ? this.getAttribute("height") : "400");
        iframe.setAttribute("src", serverLocation + "/viewer.html?scene_id=" + sceneID);

        shadow.append(iframe);
    }
}

module.exports = ViewerElement;
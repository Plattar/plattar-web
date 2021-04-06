const Util = require("../util/util.js");

class PlattarSceneElement extends HTMLElement {
    constructor() {
        super();
    }

    _setup(elementType) {
        const sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

        if (sceneID === undefined) {
            throw new Error("PlattarSceneElement - required attribute \"scene-id\" is missing");
        }

        const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

        this.__internal__sceneID = sceneID;
        this.__internal__server = server;
        this.__internal__type = elementType;

        const serverLocation = this.location;

        if (serverLocation === undefined) {
            throw new Error("PlattarSceneElement - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        const embedLocation = Util.getElementLocation(elementType);

        if (embedLocation === undefined) {
            throw new Error("PlattarSceneElement - element named \"" + elementType + "\" is invalid");
        }

        // clear to proceed
        const iframe = document.createElement("iframe");

        this.__internal__iframe = iframe;

        iframe.setAttribute("width", this.hasAttribute("width") ? this.getAttribute("width") : "500px");
        iframe.setAttribute("height", this.hasAttribute("height") ? this.getAttribute("height") : "500px");
        iframe.setAttribute("src", serverLocation + embedLocation + "?scene_id=" + sceneID);
        iframe.setAttribute("frameBorder", "0");

        if (!this.hasAttribute("fullscreen")) {
            return iframe;
        }

        const style = document.createElement('style');

        style.textContent = `
            ._PlattarFullScreen {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        `;

        iframe.className = "_PlattarFullScreen";

        return iframe;
    }

    get sceneID() {
        return this.__internal__sceneID;
    }

    get server() {
        return this.__internal__server;
    }

    get elementType() {
        return this.__internal__type;
    }

    get location() {
        return Util.getServerLocation(this.server);
    }

    get width() {
        return this.__internal__iframe.getAttribute("width");
    }

    set width(value) {
        this.__internal__iframe.setAttribute("width", value);
    }

    get height() {
        return this.__internal__iframe.getAttribute("height");
    }

    set height(value) {
        this.__internal__iframe.setAttribute("height", value);
    }
}

module.exports = PlattarSceneElement;
const Util = require("../../util/util.js");
const Messenger = require("@plattar/context-messenger");
const IFrameController = require("./iframe-controller.js");

class ElementController {
    constructor(element) {
        this._element = element;

        this._sceneID = element.hasAttribute("scene-id") ? element.getAttribute("scene-id") : undefined;

        if (this._sceneID === undefined) {
            throw new Error("ElementController - required attribute \"scene-id\" is missing");
        }

        this._server = element.hasAttribute("server") ? element.getAttribute("server") : "production";

        const serverLocation = Util.getServerLocation(this._server);

        if (serverLocation === undefined) {
            throw new Error("ElementController - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        const embedLocation = Util.getElementLocation(element.elementType);

        if (embedLocation === undefined) {
            throw new Error("ElementController - element named \"" + elementType + "\" is invalid");
        }

        const source = serverLocation + embedLocation + "?scene_id=" + this._sceneID;

        this._controller = new IFrameController(element, source, this._sceneID);
    }

    get messenger() {
        return Messenger.messenger[this._sceneID];
    }
}

module.exports = ElementController;
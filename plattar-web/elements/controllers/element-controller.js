const Util = require("../../util/util.js");
const Messenger = require("@plattar/context-messenger");
const IFrameController = require("./iframe-controller.js");

class ElementController {
    constructor(element) {
        this._element = element;

        // observe the changes in scene-id
        const callback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'scene-id') {
                    this._load();
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(this._element, { attributes: true });

        // load initially if scene-id is set
        if (element.hasAttribute("scene-id")) {
            this._load();
        }
    }

    _load() {
        if (this._controller) {
            this._controller._destroy();
            this._controller = undefined;
        }

        const element = this._element;

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

        // ensure iframe ID is randomly generated as we could have multiple iframes
        // with same Scene ID - such as viewer and editor running on same page
        this._messengerID = "element_" + Util.id();

        this._controller = new IFrameController(element, source, this._messengerID);
    }

    get messenger() {
        return Messenger.messenger[this._messengerID];
    }

    get controller() {
        return this._controller;
    }
}

module.exports = ElementController;
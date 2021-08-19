const Util = require("../../util/util.js");
const { messenger } = require("@plattar/context-messenger");
const IFrameController = require("./iframe-controller.js");

class ElementController {
    constructor(element) {
        this._element = element;

        // observe the changes in scene-id
        const callback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && element.usesCoreAttribute(mutation.attributeName)) {
                    if (element.hasAllCoreAttributes) {
                        this._load();
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(this._element, { attributes: true });

        // load initially if all core attributes are set
        if (element.hasAllCoreAttributes) {
            this._load();
        }
    }

    _load() {
        if (this._controller) {
            this._controller._destroy();
            this._controller = undefined;
        }

        const element = this._element;

        this._server = element.hasAttribute("server") ? element.getAttribute("server") : "production";

        const serverLocation = Util.getServerLocation(this._server);

        if (serverLocation === undefined) {
            throw new Error("ElementController - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        const embedLocation = Util.getElementLocation(element.elementType);

        if (embedLocation === undefined) {
            throw new Error("ElementController - element named \"" + elementType + "\" is invalid");
        }

        const source = serverLocation + embedLocation + element.allMappedAttributesQuery;

        // ensure iframe ID is randomly generated as we could have multiple iframes
        // with same Scene ID - such as viewer and editor running on same page
        this._messengerID = "element_" + Util.id();

        this._controller = new IFrameController(element, source, this._messengerID, (node) => {
            // for cross-origin messenger setup, we need to setup manually
            // this might require additional iterations
            messenger.addChild(node);
        });
    }

    set onload(callback) {
        if (!callback) {
            return;
        }

        if (this.messenger) {
            callback();
        }
        else {
            messenger.onload(this._messengerID, () => {
                callback();
            });
        }
    }

    get messenger() {
        return messenger[this._messengerID];
    }

    get context() {
        return messenger.self;
    }

    get controller() {
        return this._controller;
    }
}

module.exports = ElementController;
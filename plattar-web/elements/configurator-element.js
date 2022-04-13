const BaseElement = require("./base/base-element.js");

class ConfiguratorElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "configurator";
    }

    get elementLocation() {
        if (this.hasAttribute("show-ui")) {
            const state = this.getAttribute("show-ui");

            return state === "true" ? "configurator/dist/index.html" : super.elementLocation;
        }

        return super.elementLocation;
    }

    get optionalAttributes() {
        return [{
            key: "config-state",
            map: "config_state"
        }, {
            key: "show-ar",
            map: "show_ar"
        }];
    }
}

module.exports = ConfiguratorElement;
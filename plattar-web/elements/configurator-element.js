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
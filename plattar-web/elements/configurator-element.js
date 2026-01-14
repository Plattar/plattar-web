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

    get elementFullLocation() {
        if (this.hasAttribute("show-ui")) {
            const state = this.getAttribute("show-ui");

            if (state === "true") {
                const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

                switch (server) {
                    case "production": return `https://configurator.plattar.com/index.html${this.allMappedAttributesQuery}`;
                    case "staging": return `https://configurator-staging.plattar.com/index.html${this.allMappedAttributesQuery}`;
                    case "review": return `https://configurator-review.plattar.com/index.html${this.allMappedAttributesQuery}`;
                    case "dev": return `https://localhost/configurator/dist/index.html${this.allMappedAttributesQuery}`;
                    default: throw new Error(`ConfiguratorElement.elementFullLocation - attribute "server" must be one of "production", "staging", "review" or "dev" but was "${server}"`);
                }
            }
        }

        return super.elementFullLocation;
    }

    get optionalAttributes() {
        return [
            {
                key: "config-state",
                map: "config_state"
            },
            {
                key: "show-ar",
                map: "show_ar"
            },
            {
                key: "scene-graph-id",
                map: "scene_graph_id"
            }
        ];
    }
}

module.exports = ConfiguratorElement;
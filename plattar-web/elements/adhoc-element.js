const BaseElement = require("./base/base-element.js");

class AdhocElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "adhoc";
    }

    get elementFullLocation() {
        if (this.hasAttribute("type")) {
            const type = this.getAttribute("type");
            const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

            switch (server) {
                case "production": return `https://renderer.plattar.com/${type}.html${this.allMappedAttributesQuery}`;
                case "staging": return `https://renderer-staging.plattar.com/${type}.html${this.allMappedAttributesQuery}`;
                case "review": return `https://renderer-review.plattar.com/${type}.html${this.allMappedAttributesQuery}`;
                case "dev": return `https://localhost/renderer/${type}.html${this.allMappedAttributesQuery}`;
                default: throw new Error(`AdhocElement.elementFullLocation - attribute "server" must be one of "production", "staging", "review" or "dev" but was "${server}"`);
            }
        }

        throw new Error(`AdhocElement.elementFullLocation - attribute "type" is required`);
    }

    get optionalAttributes() {
        if (this.hasAttribute("properties")) {
            const properties = this.getAttribute("properties");

            if (properties) {
                const splitProperties = properties.split(",");

                const props = [];

                splitProperties.forEach((prop) => {
                    props.push({
                        key: prop,
                        map: prop.replaceAll('-', '_')
                    });
                });

                return props;
            }
        }

        return [];
    }

    get coreAttributes() {
        return [];
    }
}

module.exports = AdhocElement;
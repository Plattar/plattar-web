const BaseElement = require("./base/base-element.js");

class StudioElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "studio";
    }
}

module.exports = StudioElement;
const BaseElement = require("./base/base-element.js");

class EditorElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "editor";
    }
}

module.exports = EditorElement;
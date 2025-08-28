const BaseElement = require("./base/base-element.js");

class GalleryElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "gallery";
    }

    get optionalAttributes() {
        return [];
    }
}

module.exports = GalleryElement;
const BaseElement = require("./base/base-element.js");

class EWallElement extends BaseElement {
    constructor() {
        super();

        const tag = document.createElement("script");
        tag.src = "https://cdn.8thwall.com/web/iframe/iframe.js";
        tag.defer = true;
    }

    connectedCallback() {
        super.connectedCallback();

        // this is the iframe ID
        const id = this.element.controller.id;

        const onLoad = () => {
            if (window.XRIFrame) {
                window.XRIFrame.registerXRIFrame(id);
            }
        }

        window.addEventListener('load', onLoad, false)
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking", "gyroscope", "accelerometer"];
    }

    get elementType() {
        return "ewall";
    }
}

module.exports = EWallElement;
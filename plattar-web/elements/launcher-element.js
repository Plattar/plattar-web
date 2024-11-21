const BaseElement = require("./base/base-element.js");

class LauncherElement extends BaseElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    get elementType() {
        return "launcher";
    }

    get optionalAttributes() {
        return [
            {
                key: "config-state",
                map: "config_state"
            },
            {
                key: "qr-options",
                map: "qr_options"
            },
            {
                key: "embed-type",
                map: "embed_type"
            },
            {
                key: "product-id",
                map: "product_id"
            },
            {
                key: "scene-product-id",
                map: "scene_product_id"
            },
            {
                key: "variation-id",
                map: "variation_id"
            },
            {
                key: "variation-sku",
                map: "variation_sku"
            },
            {
                key: "ar-mode",
                map: "ar_mode"
            },
            {
                key: "show-ar-banner",
                map: "show_ar_banner"
            }
        ];
    }
}

module.exports = LauncherElement;
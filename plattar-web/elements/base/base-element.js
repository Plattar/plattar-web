const Util = require("../../util/util");
const ElementController = require("../controllers/element-controller");

class BaseElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._controller = new ElementController(this);
    }

    set onready(callback) {
        if (this._controller) {
            this._controller.onload = callback;

            return;
        }

        throw new Error("set BaseElement.onready - cannot use as element not connected");
    }

    get messenger() {
        return this._controller ? this._controller.messenger : undefined;
    }

    get context() {
        return this._controller ? this._controller.context : undefined;
    }

    get element() {
        return this._controller;
    }

    get ready() {
        return this._controller ? true : false;
    }

    get allowDragDrop() {
        return this._controller ? this._controller.controller.allowDragDrop : false;
    }

    set allowDragDrop(value) {
        if (this._controller) {
            this._controller.controller.allowDragDrop = value;

            return;
        }

        throw new Error("set BaseElement.allowDragDrop - cannot use as element not connected");
    }

    get permissions() {
        return [];
    }

    get coreAttributes() {
        return [{
            key: "scene-id",
            map: "scene_id"
        }];
    }

    usesCoreAttribute(key) {
        const attr = this.coreAttributes;

        const length = attr.length;

        for (let i = 0; i < length; i++) {
            if (attr[i].key === key) {
                return true;
            }
        }

        return false;
    }

    get optionalAttributes() {
        return [];
    }

    get hasAllCoreAttributes() {
        const attr = this.coreAttributes;

        const length = attr.length;

        for (let i = 0; i < length; i++) {
            if (!this.hasAttribute(attr[i].key)) {
                return false;
            }
        }

        return true;
    }

    get allMappedAttributes() {
        const map = new Map();

        const coreAttr = this.coreAttributes;
        const optAttr = this.optionalAttributes;

        coreAttr.forEach((ele) => {
            if (this.hasAttribute(ele.key)) {
                map.set(ele.map, this.getAttribute(ele.key));
            }
        });

        optAttr.forEach((ele) => {
            if (this.hasAttribute(ele.key)) {
                map.set(ele.map, this.getAttribute(ele.key));
            }
        });

        return map;
    }

    get allMappedAttributesQuery() {
        const attr = this.allMappedAttributes;

        let queryStr = "";
        let first = true;

        for (const [key, value] of attr.entries()) {
            queryStr += (first ? ("?" + key + "=" + value) : ("&" + key + "=" + value));

            first = false;
        }

        return queryStr;
    }

    get elementType() {
        return "none";
    }

    get elementLocation() {
        return Util.getElementLocation(this.elementType);
    }
}

module.exports = BaseElement;
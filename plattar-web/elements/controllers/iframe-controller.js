const Util = require("../../util/util.js");

class IFrameController {
    constructor(element, src, id) {
        this._iframe = document.createElement("iframe");
        this._isDraggable = false;

        this._iframe.setAttribute("id", id);
        this._iframe.setAttribute("width", element.hasAttribute("width") ? element.getAttribute("width") : "500px");
        this._iframe.setAttribute("height", element.hasAttribute("height") ? element.getAttribute("height") : "500px");
        this._iframe.setAttribute("src", src);
        this._iframe.setAttribute("frameBorder", "0");

        const permissions = Util.getPermissionString(element.permissions);

        if (permissions) {
            this._iframe.setAttribute("allow", permissions);
        }

        const shadow = element.attachShadow({ mode: 'open' });

        this.allowDragging = false;

        shadow.append(this._iframe);

        if (element.hasAttribute("fullscreen")) {
            const style = document.createElement('style');

            style.textContent = `
                ._PlattarFullScreen {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            `;

            this._iframe.className = "_PlattarFullScreen";

            shadow.append(style);
        }
    }

    set allowDragDrop(value) {
        if (value) {
            this._isDraggable = true;
            this._iframe.style.pointerEvents = "none";
        }
        else {
            this._isDraggable = false;
            this._iframe.style.pointerEvents = "auto";
        }
    }

    get allowDragDrop() {
        return this._isDraggable;
    }

    get width() {
        return this._iframe.getAttribute("width");
    }

    set width(value) {
        this._iframe.setAttribute("width", value);
    }

    get height() {
        return this._iframe.getAttribute("height");
    }

    set height(value) {
        this._iframe.setAttribute("height", value);
    }
}

module.exports = IFrameController;
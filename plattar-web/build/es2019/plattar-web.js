(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Plattar = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class EditorElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "editor.html?scene_id=" + nodes.sceneID);

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = EditorElement;
},{"./plattar-scene-element.js":4}],2:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class EWallElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "ewall.html?scene_id=" + nodes.sceneID);

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = EWallElement;
},{"./plattar-scene-element.js":4}],3:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class FaceARElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "facear.html?scene_id=" + nodes.sceneID);
        iframe.setAttribute("allow", "camera *");

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = FaceARElement;
},{"./plattar-scene-element.js":4}],4:[function(require,module,exports){
const Util = require("../util/util.js");

class PlattarSceneElement extends HTMLElement {
    constructor() {
        super();
    }

    _setup() {
        const sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

        if (sceneID === undefined) {
            throw new Error("PlattarSceneElement - required attribute \"scene-id\" is missing");
        }

        const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

        const serverLocation = Util.getServerLocation(server);

        if (serverLocation === undefined) {
            throw new Error("PlattarSceneElement - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        // clear to proceed
        const iframe = document.createElement("iframe");

        iframe.setAttribute("width", this.hasAttribute("width") ? this.getAttribute("width") : "400");
        iframe.setAttribute("height", this.hasAttribute("height") ? this.getAttribute("height") : "400");
        iframe.setAttribute("src", serverLocation);

        if (!this.hasAttribute("fullscreen")) {
            return { iframe: iframe, sceneID: sceneID, style: undefined };
        }

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

        iframe.className = "_PlattarFullScreen";

        return { iframe: iframe, sceneID: sceneID, style: style };
    }
}

module.exports = PlattarSceneElement;
},{"../util/util.js":8}],5:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class ViewerElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "viewer.html?scene_id=" + nodes.sceneID);

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = ViewerElement;
},{"./plattar-scene-element.js":4}],6:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class WebXRElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const nodes = this._setup();
        const iframe = nodes.iframe;
        const style = nodes.style;

        const shadow = this.attachShadow({ mode: 'open' });

        iframe.setAttribute("src", iframe.getAttribute("src") + "webxr.html?scene_id=" + nodes.sceneID);

        if (style) {
            shadow.append(style);
        }

        shadow.append(iframe);
    }
}

module.exports = WebXRElement;
},{"./plattar-scene-element.js":4}],7:[function(require,module,exports){
"use strict";
const WebXRElement = require("./elements/webxr-element.js");
const ViewerElement = require("./elements/viewer-element.js");
const EWallElement = require("./elements/ewall-element.js");
const FaceARElement = require("./elements/facear-element.js");
const EditorElement = require("./elements/editor-element.js");

customElements.define("plattar-webxr", WebXRElement);
customElements.define("plattar-viewer", ViewerElement);
customElements.define("plattar-editor", EditorElement);
customElements.define("plattar-facear", FaceARElement);
customElements.define("plattar-8wall", EWallElement);
},{"./elements/editor-element.js":1,"./elements/ewall-element.js":2,"./elements/facear-element.js":3,"./elements/viewer-element.js":5,"./elements/webxr-element.js":6}],8:[function(require,module,exports){
class Util {
    static getServerLocation(server) {
        switch (server) {
            case "production": return "https://app.plattar.com/renderer/";
            case "staging": return "https://staging.plattar.space/renderer/";
            case "dev": return "https://localhost/renderer/";
        }

        return undefined;
    }
}

module.exports = Util;
},{}]},{},[7])(7)
});

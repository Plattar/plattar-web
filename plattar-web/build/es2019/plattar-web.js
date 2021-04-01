(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Plattar = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
const WebXRElement = require("./webxr/webxr-element.js");

customElements.define("plattar-webxr", WebXRElement);
},{"./webxr/webxr-element.js":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
const Util = require("../util/util.js");

class WebXRElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

        if (sceneID === undefined) {
            throw new Error("WebXRElement - required attribute \"scene-id\" is missing");
        }

        const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

        const serverLocation = Util.getServerLocation(server);

        if (serverLocation === undefined) {
            throw new Error("WebXRElement - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        // clear to proceed
        const iframe = document.createElement("iframe");

        if (this.hasAttribute("id")) {
            iframe.setAttribute("id", this.getAttribute("id"));
        }

        iframe.setAttribute("width", this.hasAttribute("width") ? this.getAttribute("width") : "400");
        iframe.setAttribute("height", this.hasAttribute("height") ? this.getAttribute("height") : "400");
        iframe.setAttribute("src", serverLocation + "/webxr.html?scene_id=" + sceneID);

        this.shadowRoot.append(iframe);
    }
}

module.exports = WebXRElement;
},{"../util/util.js":2}]},{},[1])(1)
});

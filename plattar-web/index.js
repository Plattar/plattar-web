"use strict";
const WebXRElement = require("./elements/webxr-element.js");
const ViewerElement = require("./elements/viewer-element.js");

customElements.define("plattar-webxr", WebXRElement);
customElements.define("plattar-viewer", ViewerElement);
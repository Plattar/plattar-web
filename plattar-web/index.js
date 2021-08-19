"use strict";
const WebXRElement = require("./elements/webxr-element.js");
const ViewerElement = require("./elements/viewer-element.js");
const ProductElement = require("./elements/product-element.js");
const EWallElement = require("./elements/ewall-element.js");
const FaceARElement = require("./elements/facear-element.js");
const EditorElement = require("./elements/editor-element.js");
const StudioElement = require("./elements/studio-element.js");
const Version = require("./version");

customElements.define("plattar-webxr", WebXRElement);
customElements.define("plattar-viewer", ViewerElement);
customElements.define("plattar-product", ProductElement);
customElements.define("plattar-editor", EditorElement);
customElements.define("plattar-facear", FaceARElement);
customElements.define("plattar-8wall", EWallElement);
customElements.define("plattar-studio", StudioElement);

console.log("using @plattar/plattar-web v" + Version);

module.exports = {
    version: Version
};
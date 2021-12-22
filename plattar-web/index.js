"use strict";
const WebXRElement = require("./elements/webxr-element.js");
const ViewerElement = require("./elements/viewer-element.js");
const ProductElement = require("./elements/product-element.js");
const EWallElement = require("./elements/ewall-element.js");
const FaceARElement = require("./elements/facear-element.js");
const EditorElement = require("./elements/editor-element.js");
const StudioElement = require("./elements/studio-element.js");
const ModelElement = require("./elements/model-element.js");
const Version = require("./version");

if (customElements.get("plattar-webxr") === undefined) {
    customElements.define("plattar-webxr", WebXRElement);
}

if (customElements.get("plattar-viewer") === undefined) {
    customElements.define("plattar-viewer", ViewerElement);
}

if (customElements.get("plattar-product") === undefined) {
    customElements.define("plattar-product", ProductElement);
}

if (customElements.get("plattar-editor") === undefined) {
    customElements.define("plattar-editor", EditorElement);
}

if (customElements.get("plattar-facear") === undefined) {
    customElements.define("plattar-facear", FaceARElement);
}

if (customElements.get("plattar-8wall") === undefined) {
    customElements.define("plattar-8wall", EWallElement);
}

if (customElements.get("plattar-studio") === undefined) {
    customElements.define("plattar-studio", StudioElement);
}

if (customElements.get("plattar-model") === undefined) {
    customElements.define("plattar-model", ModelElement);
}

console.log("using @plattar/plattar-web v" + Version);

module.exports = {
    version: Version
};
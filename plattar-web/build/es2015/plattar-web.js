"use strict";

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.Plattar = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
        o(t[i]);
      }

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      var PlattarSceneElement = require("./plattar-scene-element.js");

      var EditorElement = /*#__PURE__*/function (_PlattarSceneElement) {
        _inherits(EditorElement, _PlattarSceneElement);

        var _super = _createSuper(EditorElement);

        function EditorElement() {
          _classCallCheck(this, EditorElement);

          return _super.call(this);
        }

        _createClass(EditorElement, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            var nodes = this._setup();

            var iframe = nodes.iframe;
            var style = nodes.style;
            var shadow = this.attachShadow({
              mode: 'open'
            });
            iframe.setAttribute("src", iframe.getAttribute("src") + "editor.html?scene_id=" + nodes.sceneID);

            if (style) {
              shadow.append(style);
            }

            shadow.append(iframe);
          }
        }]);

        return EditorElement;
      }(PlattarSceneElement);

      module.exports = EditorElement;
    }, {
      "./plattar-scene-element.js": 4
    }],
    2: [function (require, module, exports) {
      var PlattarSceneElement = require("./plattar-scene-element.js");

      var EWallElement = /*#__PURE__*/function (_PlattarSceneElement2) {
        _inherits(EWallElement, _PlattarSceneElement2);

        var _super2 = _createSuper(EWallElement);

        function EWallElement() {
          _classCallCheck(this, EWallElement);

          return _super2.call(this);
        }

        _createClass(EWallElement, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            var nodes = this._setup();

            var iframe = nodes.iframe;
            var style = nodes.style;
            var shadow = this.attachShadow({
              mode: 'open'
            });
            iframe.setAttribute("src", iframe.getAttribute("src") + "ewall.html?scene_id=" + nodes.sceneID);

            if (style) {
              shadow.append(style);
            }

            shadow.append(iframe);
          }
        }]);

        return EWallElement;
      }(PlattarSceneElement);

      module.exports = EWallElement;
    }, {
      "./plattar-scene-element.js": 4
    }],
    3: [function (require, module, exports) {
      var PlattarSceneElement = require("./plattar-scene-element.js");

      var FaceARElement = /*#__PURE__*/function (_PlattarSceneElement3) {
        _inherits(FaceARElement, _PlattarSceneElement3);

        var _super3 = _createSuper(FaceARElement);

        function FaceARElement() {
          _classCallCheck(this, FaceARElement);

          return _super3.call(this);
        }

        _createClass(FaceARElement, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            var nodes = this._setup();

            var iframe = nodes.iframe;
            var style = nodes.style;
            var shadow = this.attachShadow({
              mode: 'open'
            });
            iframe.setAttribute("src", iframe.getAttribute("src") + "facear.html?scene_id=" + nodes.sceneID);
            iframe.setAttribute("allow", "camera *");

            if (style) {
              shadow.append(style);
            }

            shadow.append(iframe);
          }
        }]);

        return FaceARElement;
      }(PlattarSceneElement);

      module.exports = FaceARElement;
    }, {
      "./plattar-scene-element.js": 4
    }],
    4: [function (require, module, exports) {
      var Util = require("../util/util.js");

      var PlattarSceneElement = /*#__PURE__*/function (_HTMLElement) {
        _inherits(PlattarSceneElement, _HTMLElement);

        var _super4 = _createSuper(PlattarSceneElement);

        function PlattarSceneElement() {
          _classCallCheck(this, PlattarSceneElement);

          return _super4.call(this);
        }

        _createClass(PlattarSceneElement, [{
          key: "_setup",
          value: function _setup() {
            var sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

            if (sceneID === undefined) {
              throw new Error("PlattarSceneElement - required attribute \"scene-id\" is missing");
            }

            var server = this.hasAttribute("server") ? this.getAttribute("server") : "production";
            var serverLocation = Util.getServerLocation(server);

            if (serverLocation === undefined) {
              throw new Error("PlattarSceneElement - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
            } // clear to proceed


            var iframe = document.createElement("iframe");
            iframe.setAttribute("width", this.hasAttribute("width") ? this.getAttribute("width") : "400");
            iframe.setAttribute("height", this.hasAttribute("height") ? this.getAttribute("height") : "400");
            iframe.setAttribute("src", serverLocation);

            if (!this.hasAttribute("fullscreen")) {
              return {
                iframe: iframe,
                sceneID: sceneID,
                style: undefined
              };
            }

            var style = document.createElement('style');
            style.textContent = "\n            ._PlattarFullScreen {\n                width: 100%;\n                height: 100%;\n                position: absolute;\n                top: 0;\n                left: 0;\n            }\n        ";
            iframe.className = "_PlattarFullScreen";
            return {
              iframe: iframe,
              sceneID: sceneID,
              style: style
            };
          }
        }]);

        return PlattarSceneElement;
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

      module.exports = PlattarSceneElement;
    }, {
      "../util/util.js": 8
    }],
    5: [function (require, module, exports) {
      var PlattarSceneElement = require("./plattar-scene-element.js");

      var ViewerElement = /*#__PURE__*/function (_PlattarSceneElement4) {
        _inherits(ViewerElement, _PlattarSceneElement4);

        var _super5 = _createSuper(ViewerElement);

        function ViewerElement() {
          _classCallCheck(this, ViewerElement);

          return _super5.call(this);
        }

        _createClass(ViewerElement, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            var nodes = this._setup();

            var iframe = nodes.iframe;
            var style = nodes.style;
            var shadow = this.attachShadow({
              mode: 'open'
            });
            iframe.setAttribute("src", iframe.getAttribute("src") + "viewer.html?scene_id=" + nodes.sceneID);

            if (style) {
              shadow.append(style);
            }

            shadow.append(iframe);
          }
        }]);

        return ViewerElement;
      }(PlattarSceneElement);

      module.exports = ViewerElement;
    }, {
      "./plattar-scene-element.js": 4
    }],
    6: [function (require, module, exports) {
      var PlattarSceneElement = require("./plattar-scene-element.js");

      var WebXRElement = /*#__PURE__*/function (_PlattarSceneElement5) {
        _inherits(WebXRElement, _PlattarSceneElement5);

        var _super6 = _createSuper(WebXRElement);

        function WebXRElement() {
          _classCallCheck(this, WebXRElement);

          return _super6.call(this);
        }

        _createClass(WebXRElement, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            var nodes = this._setup();

            var iframe = nodes.iframe;
            var style = nodes.style;
            var shadow = this.attachShadow({
              mode: 'open'
            });
            iframe.setAttribute("src", iframe.getAttribute("src") + "webxr.html?scene_id=" + nodes.sceneID);

            if (style) {
              shadow.append(style);
            }

            shadow.append(iframe);
          }
        }]);

        return WebXRElement;
      }(PlattarSceneElement);

      module.exports = WebXRElement;
    }, {
      "./plattar-scene-element.js": 4
    }],
    7: [function (require, module, exports) {
      "use strict";

      var WebXRElement = require("./elements/webxr-element.js");

      var ViewerElement = require("./elements/viewer-element.js");

      var EWallElement = require("./elements/ewall-element.js");

      var FaceARElement = require("./elements/facear-element.js");

      var EditorElement = require("./elements/editor-element.js");

      customElements.define("plattar-webxr", WebXRElement);
      customElements.define("plattar-viewer", ViewerElement);
      customElements.define("plattar-editor", EditorElement);
      customElements.define("plattar-facear", FaceARElement);
      customElements.define("plattar-8wall", EWallElement);
    }, {
      "./elements/editor-element.js": 1,
      "./elements/ewall-element.js": 2,
      "./elements/facear-element.js": 3,
      "./elements/viewer-element.js": 5,
      "./elements/webxr-element.js": 6
    }],
    8: [function (require, module, exports) {
      var Util = /*#__PURE__*/function () {
        function Util() {
          _classCallCheck(this, Util);
        }

        _createClass(Util, null, [{
          key: "getServerLocation",
          value: function getServerLocation(server) {
            switch (server) {
              case "production":
                return "https://app.plattar.com/renderer/";

              case "staging":
                return "https://staging.plattar.space/renderer/";

              case "dev":
                return "https://localhost/renderer/";
            }

            return undefined;
          }
        }]);

        return Util;
      }();

      module.exports = Util;
    }, {}]
  }, {}, [7])(7);
});


(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Plattar = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class EditorElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    connectedCallback() {
        this._setup("editor");
    }
}

module.exports = EditorElement;
},{"./plattar-scene-element.js":4}],2:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class EWallElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking"];
    }

    connectedCallback() {
        this._setup("ewall");
    }
}

module.exports = EWallElement;
},{"./plattar-scene-element.js":4}],3:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class FaceARElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay"];
    }

    connectedCallback() {
        this._setup("facear");
    }
}

module.exports = FaceARElement;
},{"./plattar-scene-element.js":4}],4:[function(require,module,exports){
const Util = require("../util/util.js");
const Messenger = require("@plattar/context-messenger");

class PlattarSceneElement extends HTMLElement {
    constructor() {
        super();
    }

    _setup(elementType) {
        const sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

        if (sceneID === undefined) {
            throw new Error("PlattarSceneElement - required attribute \"scene-id\" is missing");
        }

        const server = this.hasAttribute("server") ? this.getAttribute("server") : "production";

        this.__internal__sceneID = sceneID;
        this.__internal__server = server;
        this.__internal__type = elementType;

        const serverLocation = this.location;

        if (serverLocation === undefined) {
            throw new Error("PlattarSceneElement - attribute \"server\" must be one of \"production\", \"staging\" or \"dev\"");
        }

        const embedLocation = Util.getElementLocation(elementType);

        if (embedLocation === undefined) {
            throw new Error("PlattarSceneElement - element named \"" + elementType + "\" is invalid");
        }

        // clear to proceed
        const iframe = document.createElement("iframe");

        this.__internal__iframe = iframe;

        iframe.setAttribute("id", sceneID);
        iframe.setAttribute("width", this.hasAttribute("width") ? this.getAttribute("width") : "500px");
        iframe.setAttribute("height", this.hasAttribute("height") ? this.getAttribute("height") : "500px");
        iframe.setAttribute("src", serverLocation + embedLocation + "?scene_id=" + sceneID);
        iframe.setAttribute("frameBorder", "0");

        const permissions = Util.getPermissionString(this.permissions);

        if (permissions) {
            iframe.setAttribute("allow", permissions);
        }

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.append(iframe);

        if (!this.hasAttribute("fullscreen")) {
            return iframe;
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

        shadow.append(style);

        return iframe;
    }

    get messenger() {
        return Messenger.messenger[this.sceneID];
    }

    get sceneID() {
        return this.__internal__sceneID;
    }

    set sceneID(value) {
        this.__internal__sceneID = value;

        this.setAttribute("scene-id", value);

        const iframe = this.__internal__iframe;

        const serverLocation = this.location;
        const embedLocation = Util.getElementLocation(this.elementType);
        const sceneID = this.hasAttribute("scene-id") ? this.getAttribute("scene-id") : undefined;

        iframe.setAttribute("src", serverLocation + embedLocation + "?scene_id=" + sceneID);
    }

    get server() {
        return this.__internal__server;
    }

    get elementType() {
        return this.__internal__type;
    }

    get location() {
        return Util.getServerLocation(this.server);
    }

    get width() {
        return this.__internal__iframe.getAttribute("width");
    }

    set width(value) {
        this.__internal__iframe.setAttribute("width", value);
    }

    get height() {
        return this.__internal__iframe.getAttribute("height");
    }

    set height(value) {
        this.__internal__iframe.setAttribute("height", value);
    }

    get permissions() {
        return [];
    }
}

module.exports = PlattarSceneElement;
},{"../util/util.js":22,"@plattar/context-messenger":8}],5:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class ViewerElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["autoplay"];
    }

    connectedCallback() {
        this._setup("viewer");
    }
}

module.exports = ViewerElement;
},{"./plattar-scene-element.js":4}],6:[function(require,module,exports){
const PlattarSceneElement = require("./plattar-scene-element.js");

class WebXRElement extends PlattarSceneElement {
    constructor() {
        super();
    }

    get permissions() {
        return ["camera", "autoplay", "xr-spatial-tracking"];
    }

    connectedCallback() {
        this._setup("webxr");
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
"use strict";
const Messenger = require("./messenger/messenger.js");
const Memory = require("./memory/memory.js");
const GlobalEventHandler = require("./messenger/global-event-handler.js");

// create our instances which we only need one each
const messengerInstance = new Messenger();

// memory requires the messenger interface to function correctly
const memoryInstance = new Memory(messengerInstance);

GlobalEventHandler.instance().messengerInstance = messengerInstance;
GlobalEventHandler.instance().memoryInstance = memoryInstance;

module.exports = {
    messenger: messengerInstance,
    memory: memoryInstance
}
},{"./memory/memory.js":9,"./messenger/global-event-handler.js":16,"./messenger/messenger.js":17}],9:[function(require,module,exports){
const PermanentMemory = require("./permanent-memory");
const TemporaryMemory = require("./temporary-memory");

/**
 * Memory is a singleton that allows setting variables from multiple
 * iframe contexts
 */
class Memory {
    constructor(messengerInstance) {
        this._messenger = messengerInstance;

        this._tempMemory = new TemporaryMemory(messengerInstance);
        this._permMemory = new PermanentMemory(messengerInstance);

        this._messenger.self.__memory__set_temp_var = (name, data) => {
            this._tempMemory[name] = data;
        };

        this._messenger.self.__memory__set_perm_var = (name, data) => {
            this._permMemory[name] = data;
        };
    }

    get temp() {
        return this._tempMemory;
    }

    get perm() {
        return this._permMemory;
    }
}

module.exports = Memory;
},{"./permanent-memory":10,"./temporary-memory":11}],10:[function(require,module,exports){
const WrappedValue = require("./wrapped-value");

class PermanentMemory {
    constructor(messengerInstance) {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                // sets the watcher callback
                if (prop === "watch") {
                    return (variable, callback) => {
                        if (!target[variable]) {
                            target[variable] = new WrappedValue(variable, true, messengerInstance);
                        }

                        target[variable].watch = callback;
                    };
                }

                // clears everything, including specific items
                if (prop === "clear") {
                    return () => {
                        for (const pitem of Object.getOwnPropertyNames(target)) {
                            delete target[pitem];

                            localStorage.removeItem(pitem);
                        }
                    };
                }

                // clears everything, including from storage
                if (prop === "purge") {
                    return () => {
                        localStorage.clear();

                        for (const pitem of Object.getOwnPropertyNames(target)) {
                            delete target[pitem];
                        }
                    };
                }

                if (prop === "refresh") {
                    return () => {
                        for (const val of Object.getOwnPropertyNames(target)) {
                            target[val].refresh();
                        }
                    };
                }

                // on first access, we create a WrappedValue type
                if (!target[prop]) {
                    target[prop] = new WrappedValue(prop, true, messengerInstance);
                }

                return target[prop].value;
            },
            set: (target, prop, value) => {
                if (!target[prop]) {
                    target[prop] = new WrappedValue(prop, true, messengerInstance);
                }

                target[prop].value = value;

                return true;
            }
        });
    }
}

module.exports = PermanentMemory;
},{"./wrapped-value":12}],11:[function(require,module,exports){
const WrappedValue = require("./wrapped-value");

class TemporaryMemory {
    constructor(messengerInstance) {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                // sets the watcher callback
                if (prop === "watch") {
                    return (variable, callback) => {
                        if (!target[variable]) {
                            target[variable] = new WrappedValue(variable, false, messengerInstance);
                        }

                        target[variable].watch = callback;
                    };
                }

                // clears everything
                // purge is the same thing for all temporary variables
                if (prop === "clear" || prop === "purge") {
                    return () => {
                        for (const val of Object.getOwnPropertyNames(target)) {
                            delete target[val];
                        }
                    };
                }

                if (prop === "refresh") {
                    return () => {
                        for (const val of Object.getOwnPropertyNames(target)) {
                            target[val].refresh();
                        }
                    };
                }

                // on first access, we create a WrappedValue type
                if (!target[prop]) {
                    target[prop] = new WrappedValue(prop, false, messengerInstance);
                }

                return target[prop].value;
            },
            set: (target, prop, value) => {
                if (!target[prop]) {
                    target[prop] = new WrappedValue(prop, false, messengerInstance);
                }

                target[prop].value = value;

                return true;
            }
        });
    }
}

module.exports = TemporaryMemory;
},{"./wrapped-value":12}],12:[function(require,module,exports){
/**
 * WrappedValue represents a generic value type with a callback function
 * for when the value has changed
 */
class WrappedValue {
    constructor(varName, isPermanent, messengerInstance) {
        this._value = undefined;
        this._callback = undefined;
        this._isPermanent = isPermanent;
        this._varName = varName;
        this._messenger = messengerInstance;

        if (this._isPermanent) {
            this._value = JSON.parse(localStorage.getItem(this._varName));
        }
    }

    /**
     * Refresh the memory value across all memory instances recursively
     */
    refresh() {
        if (this._isPermanent) {
            // broadcast variable to all children
            this._messenger.broadcast.__memory__set_perm_var(this._varName, this._value);

            // send variable to the parent
            if (this._messenger.parent) {
                this._messenger.parent.__memory__set_perm_var(this._varName, this._value);
            }
        }
        else {
            // broadcast variable to all children
            this._messenger.broadcast.__memory__set_temp_var(this._varName, this._value);

            // send variable to the parent
            if (this._messenger.parent) {
                this._messenger.parent.__memory__set_temp_var(this._varName, this._value);
            }
        }
    }

    /**
     * Refresh this memory for a specific callable interface
     */
    refreshFor(callable) {
        // invalid interface check
        if (!this._messenger[callable]) {
            return;
        }

        if (this._isPermanent) {
            // set the variable for the specific callable
            this._messenger[callable].__memory__set_perm_var(this._varName, this._value);
        }
        else {
            // set the variable for the specific callable
            this._messenger[callable].__memory__set_temp_var(this._varName, this._value);
        }
    }

    get value() {
        if (this._isPermanent && this._value == undefined) {
            this._value = JSON.parse(localStorage.getItem(this._varName));
        }

        return this._value;
    }

    set value(newValue) {
        if (typeof newValue === "function") {
            throw new TypeError("WrappedValue.value cannot be set to a function type");
        }

        const oldValue = this._value;

        this._value = newValue;

        // for permanent variables, set the variable type
        if (this._isPermanent) {
            localStorage.setItem(this._varName, JSON.stringify(this._value));
        }

        // do not fire callback if the old and new values do not match
        if (this._callback && oldValue !== newValue) {
            // recursively update this variable across all memory
            this.refresh();

            // perform the callback that the value has just changed
            this._callback(oldValue, this._value);
        }
    }

    /**
     * Watches for any change in the current variable
     */
    set watch(newValue) {
        if (typeof newValue === "function") {
            if (newValue.length == 2) {
                this._callback = newValue;
            }
            else {
                throw new RangeError("WrappedValue.watch callback must accept exactly 2 variables. Try using WrappedValue.watch = (oldVal, newVal) => {}");
            }
        }
        else {
            throw new TypeError("WrappedValue.watch must be a type of function. Try using WrappedValue.watch = (oldVal, newVal) => {}");
        }
    }
}

module.exports = WrappedValue;
},{}],13:[function(require,module,exports){
/**
 * Broadcaster is used to call functions in multiple contexts at the
 * same time. This can be useful without having to handle complex logic
 * in the application side.
 * 
 * See Plattar.messenger.broadcast
 */
class Broadcaster {
    constructor(messengerInstance) {
        this._messengerInstance = messengerInstance;
        this._interfaces = [];

        return new Proxy(this, {
            get: (target, prop, receiver) => {
                switch (prop) {
                    case "_push":
                    case "_interfaces": return target[prop];
                    default:
                        break;
                }

                // execute the desired function on all available stacks
                return (...args) => {
                    const interfaces = target._interfaces;
                    const promises = [];

                    interfaces.forEach((callable) => {
                        promises.push(target._messengerInstance[callable][prop](...args));
                    });

                    return Promise.allSettled(promises);
                };
            }
        });
    }

    /**
     * Adds a new callable interface ID to the list of callables
     */
    _push(interfaceID) {
        this._interfaces.push(interfaceID);
    }
}

module.exports = Broadcaster;
},{}],14:[function(require,module,exports){
const WrappedFunction = require("./wrapped-local-function");

class CurrentFunctionList {
    constructor() {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                // sets the watcher callback
                if (prop === "watch") {
                    return (variable, callback) => {
                        if (!target[variable]) {
                            target[variable] = new WrappedFunction(variable);
                        }

                        target[variable].watch = callback;
                    };
                }

                // clears everything, including specific items
                if (prop === "clear" || prop === "purge") {
                    return () => {
                        for (const pitem of Object.getOwnPropertyNames(target)) {
                            delete target[pitem];
                        }
                    };
                }

                // on first access, we create a WrappedValue type
                if (!target[prop]) {
                    target[prop] = new WrappedFunction(prop);
                }

                // return an anonymous function that executes for this variable
                return (...args) => {
                    return target[prop].exec(...args);
                };
            },
            set: (target, prop, value) => {
                if (!target[prop]) {
                    target[prop] = new WrappedFunction(prop);
                }

                target[prop].value = value;

                return true;
            }
        });
    }
}

module.exports = CurrentFunctionList;
},{"./wrapped-local-function":15}],15:[function(require,module,exports){
const Util = require("../util/util.js");

/**
 * WrappedLocalFunction represents a container that holds and maintains a specific function
 * that was defined in the current web context. It can also be executed by other web contexts
 * using the Messenger framework.
 */
class WrappedLocalFunction {
    constructor(funcName) {
        this._value = undefined;
        this._callback = undefined;
        this._funcName = funcName;
    }

    /**
     * executes the internally stored function with the provided arguments
     */
    _execute(...args) {
        const rData = this._value(...args);

        if (this._callback) {
            this._callback(rData, ...args);
        }

        return rData;
    }

    /**
     * Executes the internal function in a Promise chain. Results of the execution
     * will be evaluated in the promise chain itself
     */
    exec(...args) {
        return new Promise((accept, reject) => {
            if (!this._value) {
                return reject(new Error("WrappedLocalFunction.exec() function with name " + this._funcName + "() is not defined"));
            }

            try {
                // otherwise execute the function
                const rObject = this._execute(...args);

                // we need to check if the returned object is a Promise, if so, handle it
                // differently. This can happen if the function wants to execute asyn
                if (Util.isPromise(rObject)) {
                    rObject.then((res) => {
                        return accept(res);
                    }).catch((err) => {
                        return reject(err);
                    });
                }
                else {
                    // otherwise, its a non async object so just execute and return the results
                    return accept(rObject);
                }
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    /**
     * Stores a function for later execution
     */
    set value(newValue) {
        if (typeof newValue !== "function") {
            throw new TypeError("WrappedLocalFunction.value must be a function. To store values use Plattar.memory");
        }

        this._value = newValue;
    }

    /**
     * Watches for when this function is executed by some context
     */
    set watch(newValue) {
        if (typeof newValue === "function") {
            this._callback = newValue;
        }
        else {
            throw new TypeError("WrappedLocalFunction.watch must be a type of function. Try using WrappedLocalFunction.watch = (rData, ...args) => {}");
        }
    }
}

module.exports = WrappedLocalFunction;
},{"../util/util.js":21}],16:[function(require,module,exports){
const RemoteInterface = require("./remote-interface.js");

/**
 * This is a singleton class that handles events on a global basis. Allows
 * registering local event listeners etc..
 */
class GlobalEventHandler {
    constructor() {
        this._eventListeners = {};

        // global handler that forwards events to their respectful places
        // throughout the framework
        window.addEventListener("message", (evt) => {
            const data = evt.data;
            let jsonData = undefined;

            try {
                jsonData = JSON.parse(data);
            }
            catch (e) {
                // catch does nothing
                // this event might not be what we are looking for
                jsonData = undefined;
            }

            // make sure the event is properly formatted
            if (jsonData && jsonData.event && jsonData.data) {
                // see if there are any listeners for this
                if (this._eventListeners[jsonData.event]) {
                    const remoteInterface = new RemoteInterface(evt.source, evt.origin);

                    // loop through and call all the event handlers
                    this._eventListeners[jsonData.event].forEach((callback) => {
                        try {
                            callback(remoteInterface, jsonData.data);
                        }
                        catch (e) {
                            console.error("GlobalEventHandler.message() error occured during callback ");
                            console.error(e);
                        }
                    });
                }
            }
        });
    }

    set messengerInstance(value) {
        this._messenger = value;
    }

    set memoryInstance(value) {
        this._memory = value;
    }

    get messengerInstance() {
        return this._messenger;
    }

    get memoryInstance() {
        return this._memory;
    }

    listen(event, callback) {
        if (typeof callback !== "function") {
            throw new TypeError("GlobalEventHandler.listen(event, callback) callback must be a type of function.");
        }

        if (!this._eventListeners[event]) {
            this._eventListeners[event] = [];
        }

        this._eventListeners[event].push(callback);
    }
}

GlobalEventHandler.instance = () => {
    if (!GlobalEventHandler._default) {
        GlobalEventHandler._default = new GlobalEventHandler();
    }

    return GlobalEventHandler._default;
};

module.exports = GlobalEventHandler;
},{"./remote-interface.js":18}],17:[function(require,module,exports){
const CurrentFunctionList = require("./current/current-function-list");
const RemoteInterface = require("./remote-interface");
const RemoteFunctionList = require("./remote/remote-function-list");
const Util = require("./util/util.js");
const GlobalEventHandler = require("./global-event-handler.js");
const Broadcaster = require("./broadcaster.js");

/**
 * Messenger is a singleton that allows calling functions in multiple
 * contexts
 */
class Messenger {
    constructor() {
        // generate a unique id for this instance of the messenger
        this._id = Util.id();

        // ensure the parent stack does not target itself
        this._parentStack = RemoteInterface.default();

        // allow adding local functions immedietly
        this._currentFunctionList = new CurrentFunctionList();

        // allows calling functions on everything
        this._broadcaster = new Broadcaster(this);

        // we still need to confirm if a parent exists and has the messenger
        // framework added.. see _setup() function
        this._parentFunctionList = undefined;

        // these are the pre-registered available child objects
        this._callableList = [];

        this._setup();

        return new Proxy(this, {
            get: (target, prop, receiver) => {
                // sets the watcher callback
                if (prop === "onload") {
                    return (variable, callback) => {
                        if (variable === "self" || variable === "id") {
                            return callback();
                        }

                        if (!target[variable]) {
                            target[variable] = new RemoteFunctionList(variable);
                        }

                        target[variable].onload(callback);
                    };
                }

                switch (prop) {
                    case "id": return target._id;
                    case "self": return target._currentFunctionList;
                    case "broadcast": return target._broadcaster;
                    case "_setup":
                    case "_registerListeners":
                    case "_id":
                    case "_broadcaster":
                    case "_parentStack": return target[prop];
                    default:
                        break;
                }

                const targetVar = target[prop];

                // return undefined if target variable doesn't exist
                // or it has not been verified yet
                if (!targetVar || !targetVar.isValid()) {
                    return undefined;
                }

                return target[prop];
            }
        });
    }

    /**
     * Internal function call to initialise the messenger framework
     */
    _setup() {
        this._registerListeners();

        // if a parent exists, send a message calling for an initialisation
        if (this._parentStack) {
            this._parentStack.send("__messenger__child_init");
        }
        else {
            console.warn("Messenger[" + this._id + "] does not have a parent. Plattar.messenger.parent will be undefined. This warning can be ignored for the parent page.");
        }
    }

    /**
     * Register all critical listener interfaces so the framework can function correctly
     */
    _registerListeners() {
        GlobalEventHandler.instance().listen("__messenger__child_init", (src, data) => {
            const iframeID = src.id;

            // check reserved key list
            switch (iframeID) {
                case undefined: throw new Error("Messenger[" + this._id + "].setup() Component ID cannot be undefined");
                case "self": throw new Error("Messenger[" + this._id + "].setup() Component ID of \"self\" cannot be used as the keyword is reserved");
                case "parent": throw new Error("Messenger[" + this._id + "].setup() Component ID of \"parent\" cannot be used as the keyword is reserved");
                case "id": throw new Error("Messenger[" + this._id + "].setup() Component ID of \"id\" cannot be used as the keyword is reserved");
                case "onload": throw new Error("Messenger[" + this._id + "].setup() Component ID of \"onload\" cannot be used as the keyword is reserved");
                default:
                    break;
            }

            // initialise the child iframe as a messenger pipe
            if (!this[iframeID]) {
                this[iframeID] = new RemoteFunctionList(iframeID);
            }

            this[iframeID].setup(new RemoteInterface(src.source, src.origin));

            // add the interface to the broadcaster
            this._broadcaster._push(iframeID);

            src.send("__messenger__parent_init");
        });

        GlobalEventHandler.instance().listen("__messenger__parent_init", (src, data) => {
            if (!this["parent"]) {
                this["parent"] = new RemoteFunctionList("parent");
            }

            this["parent"].setup(new RemoteInterface(src.source, src.origin));
        });

        // this listener will fire remotely to execute a function in the current
        // context
        GlobalEventHandler.instance().listen("__messenger__exec_fnc", (src, data) => {
            const instanceID = data.instance_id;
            const args = data.function_args;
            const fname = data.function_name;

            // using JS reflection, execute the local function
            GlobalEventHandler.instance().messengerInstance.self[fname](...args).then((res) => {
                src.send("__messenger__exec_fnc_result", {
                    function_status: "success",
                    function_name: fname,
                    function_args: res,
                    instance_id: instanceID
                });
            }).catch((err) => {
                src.send("__messenger__exec_fnc_result", {
                    function_status: "error",
                    function_name: fname,
                    function_args: err.message,
                    instance_id: instanceID
                });
            });
        });
    }
}

module.exports = Messenger;
},{"./broadcaster.js":13,"./current/current-function-list":14,"./global-event-handler.js":16,"./remote-interface":18,"./remote/remote-function-list":19,"./util/util.js":21}],18:[function(require,module,exports){
/**
 * Provides a single useful interface for performing remote function calls
 */
class RemoteInterface {
    constructor(source, origin) {
        this._source = source;
        this._origin = origin;

        if (typeof this._source.postMessage !== 'function') {
            throw new Error("RemoteInterface() provided source is invalid");
        }
    }

    get source() {
        return this._source;
    }

    get origin() {
        return this._origin;
    }

    /**
     * Returns the frameElement ID, or undefined if no frameElement exists in the source
     */
    get id() {
        return this.source.frameElement ? this.source.frameElement.id : undefined;
    }

    /**
     * Use the registered source to send data upstream/downstream
     */
    send(event, data) {
        const sendData = {
            event: event,
            data: (data || {})
        };

        this.source.postMessage(JSON.stringify(sendData), this.origin);
    }

    /**
     * Creates and returns a default RemoteInterface for the parent stack
     */
    static default() {
        const parentStack = window.parent ? ((window.frameElement && window.frameElement.nodeName == "IFRAME") ? window.parent : undefined) : undefined;

        if (parentStack) {
            return new RemoteInterface(parentStack, "*");
        }

        return undefined;
    }
}

module.exports = RemoteInterface;
},{}],19:[function(require,module,exports){
const WrappedFunction = require("./wrapped-remote-function");

class RemoteFunctionList {
    constructor(remoteName) {

        this._remoteInterface = undefined;
        this._callback = undefined;

        this._remoteName = remoteName;

        return new Proxy(this, {
            get: (target, prop, receiver) => {
                // sets the watcher callback
                if (prop === "watch") {
                    throw new Error("RemoteFunctionList.watch cannot watch execution of remote functions from current context. Did you mean to use Plattar.messenger.self instead?");
                }

                // clears everything, including specific items
                if (prop === "clear") {
                    throw new Error("RemoteFunctionList.clear cannot clear/remove remote functions from current context. Did you mean to use Plattar.messenger.self.clear() instead?");
                }

                // clears everything, including specific items
                if (prop === "purge") {
                    throw new Error("RemoteFunctionList.purge cannot clear/remove remote functions from current context. Did you mean to use Plattar.messenger.self.purge() instead?");
                }

                // pre-defined functions for this object. Don't block access to these.
                switch (prop) {
                    case "setup":
                    case "isValid":
                    case "onload":
                    case "_remoteInterface":
                    case "_callback":
                    case "name":
                    case "_remoteName":
                        return target[prop];
                    default:
                        break;
                }

                // on first access, we create a WrappedValue type
                if (!target[prop]) {
                    target[prop] = new WrappedFunction(prop, target._remoteInterface);
                }

                // return an anonymous function that executes for this variable
                return (...args) => {
                    return target[prop].exec(...args);
                };
            },
            set: (target, prop, value) => {
                if (prop === "_remoteInterface" || prop === "_callback") {
                    target[prop] = value;

                    return true;
                }

                throw new Error("RemoteFunctionList.set cannot add a remote function from current context. Use Plattar.messenger.self instead");
            }
        });
    }

    setup(remoteInterface) {
        if (typeof remoteInterface.send !== 'function') {
            throw new Error("RemoteFunctionList.setup() provided invalid interface");
        }

        this._remoteInterface = remoteInterface;

        if (this._callback) {
            this._callback();
        }
    }

    get name() {
        return this._remoteName;
    }

    isValid() {
        return this._remoteInterface != undefined;
    }

    onload(callback) {
        this._callback = callback;

        if (this.isValid()) {
            this._callback();
        }
    }
}

module.exports = RemoteFunctionList;
},{"./wrapped-remote-function":20}],20:[function(require,module,exports){
const Util = require("../util/util.js");
const GlobalEventHandler = require("../global-event-handler.js");

/**
 * WrappedRemoteFunction represents a container that holds and maintains a specific function
 * that can be called by any context. This particular container executes and handles remote 
 * function calls.
 */
class WrappedRemoteFunction {
    constructor(funcName, remoteInterface) {
        this._funcName = funcName;
        this._remoteInterface = remoteInterface;

        this._callInstances = {};

        // listen for function execution results
        GlobalEventHandler.instance().listen("__messenger__exec_fnc_result", (src, data) => {
            const instanceID = data.instance_id;

            // the function name must match
            if (data.function_name !== this._funcName) {
                return;
            }

            // the instance ID must be found, otherwise this is a rogue execution
            // that can be ignored (should not happen)
            if (!this._callInstances[instanceID]) {
                return;
            }

            const promise = this._callInstances[instanceID];

            // remove the old instance
            delete this._callInstances[instanceID];

            // perform the promise callbacks
            if (data.function_status === "success") {
                promise.accept(data.function_args);
            }
            else {
                promise.reject(new Error(data.function_args));
            }
        });
    }

    /**
     * Executes a remote function that lays outside of the current context
     */
    exec(...args) {
        const instanceID = Util.id();

        // ensure this instance ID has not been added previously
        // NOTE: This should not ever be executed as all instance ID's are unique
        // If this executes then the PRNG scheme needs to be swapped
        if (this._callInstances[instanceID]) {
            return new Promise((accept, reject) => {
                return reject(new Error("WrappedRemoteFunction.exec() cannot execute function. System generated duplicate Instance ID. PRNG needs checking"));
            });
        }

        // add this call as a unique instance and save the Promise
        // to be executed later
        return new Promise((accept, reject) => {
            // save this promise to be executed later
            this._callInstances[instanceID] = {
                accept: accept,
                reject: reject
            };

            // execute this event in another context
            this._remoteInterface.send("__messenger__exec_fnc", {
                instance_id: instanceID,
                function_name: this._funcName,
                function_args: args
            });
        });
    }
}

module.exports = WrappedRemoteFunction;
},{"../global-event-handler.js":16,"../util/util.js":21}],21:[function(require,module,exports){
class Util {

    /**
     * generate a quick, random ID thats useful for message digests and class checks
     */
    static id() {
        return Math.abs(Math.floor(Math.random() * 10000000000000));
    }

    /**
     * checks if the provided object is a type of Promise object
     */
    static isPromise(obj) {
        return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
    }
}

module.exports = Util;
},{}],22:[function(require,module,exports){
class Util {
    static getServerLocation(server) {
        switch (server) {
            case "production": return "https://app.plattar.com/renderer/";
            case "staging": return "https://staging.plattar.space/renderer/";
            case "dev": return "https://localhost/renderer/";
            default: return undefined;
        }
    }

    static getElementLocation(etype) {
        switch (etype) {
            case "viewer": return "viewer.html";
            case "editor": return "editor.html";
            case "ewall": return "ewall.html";
            case "facear": return "facear.html";
            case "webxr": return "webxr.html";
            default: return undefined;
        }
    }

    static getPermissionString(permissions) {
        if (permissions && permissions.length > 0) {

            let permissionString = permissions[0];

            for (let i = 1; i < permissions.length; i++) {
                permissionString += "; " + permissions[i];
            }

            return permissionString;
        }

        return undefined;
    }
}

module.exports = Util;
},{}]},{},[7])(7)
});

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
        const isValid = Util.isValidType(etype);

        if (isValid) {
            return etype + ".html";
        }

        return undefined;
    }

    static getElementBundleLocation(etype, server) {
        const location = Util.getServerLocation(server);

        if (!location) {
            return undefined;
        }

        const isValid = Util.isValidType(etype);

        if (isValid) {
            const isMinified = location === "dev" ? false : true;

            return isMinified ? (etype + "-bundle.min.js") : (etype + "-bundle.js");
        }

        return undefined;
    }

    static isValidType(etype) {
        switch (etype) {
            case "viewer":
            case "editor":
            case "ewall":
            case "facear":
            case "studio":
            case "product":
            case "webxr": return true;
            default: return false;
        }
    }

    static id() {
        return Math.abs(Math.floor(Math.random() * 10000000000000));
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
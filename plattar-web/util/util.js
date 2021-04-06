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
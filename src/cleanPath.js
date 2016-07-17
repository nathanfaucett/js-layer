var isString = require("@nathanfaucett/is_string"),
    urlPath = require("@nathanfaucett/url_path");


module.exports = cleanPath;


function cleanPath(path) {
    if (!isString(path) || !path || path === "/") {
        return "/";
    } else {
        if (path.charAt(0) !== "/") {
            path = "/" + path;
        }
        if (path.charAt(path.length - 1) === "/") {
            path = path.slice(0, -1);
        }

        return urlPath.normalize(path);
    }
}

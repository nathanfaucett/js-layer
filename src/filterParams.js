var isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined");


module.exports = filterParams;


function filterParams(regexp, params, path) {
    var results = regexp.exec(path),
        filteredParams, result, i, il, paramsLength, length;

    if (!results) {
        return false;
    } else if ((paramsLength = params.length) === 0) {
        return true;
    } else {
        filteredParams = {};

        i = -1;
        il = paramsLength - 1;
        length = results.length;

        while (i++ < il) {
            if (i < length) {
                result = results[i + 1];

                if (!isNullOrUndefined(result)) {
                    filteredParams[params[i].name] = result;
                }
            }
        }

        return filteredParams;
    }
}

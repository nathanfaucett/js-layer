var EventEmitter = require("@nathanfaucett/event_emitter"),
    isString = require("@nathanfaucett/is_string"),
    pathToRegExp = require("@nathanfaucett/path_to_regexp"),

    filterParams = require("./filterParams"),
    cleanPath = require("./cleanPath"),
    buildPath = require("./buildPath");


var LayerPrototype;


module.exports = Layer;


function Layer(path, parent, end) {

    EventEmitter.call(this, -1);

    this.__parent = parent;
    this.__end = !!end;
    this.__relativePath = null;
    this.__path = null;
    this.__params = [];
    this.__regexp = null;

    this.setPath(isString(path) ? path : "/");
}
EventEmitter.extend(Layer);
LayerPrototype = Layer.prototype;

LayerPrototype.__isRouter__ = true;

LayerPrototype.match = function(path) {
    return filterParams(this.__regexp, this.__params, path);
};

LayerPrototype.setPath = function(path) {

    this.__relativePath = cleanPath(path);
    this.__path = buildPath(this.__parent, this.__relativePath);
    this.__regexp = pathToRegExp(this.__path, this.__params, this.__end);

    return this;
};

LayerPrototype.recompile = function() {
    return this.setPath(this.__relativePath);
};

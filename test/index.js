var tape = require("tape"),
    Layer = require("..");


tape("Layer(path, parent, end) where end is true, should only match paths that match the full path", function(assert) {
    var layer = new Layer("/path/to/child", null, true);

    assert.equal(layer.match("/path/to/child"), true);
    assert.equal(layer.match("/path/to/child/grand_child"), false);

    assert.end();
});

tape("Layer(path, parent, end) where end is false, should match paths if they are longer than", function(assert) {
    var layer = new Layer("/path/to/child", null, false);

    assert.equal(layer.match("/path/to/child"), true);
    assert.equal(layer.match("/path/to/child/grand_child"), true);

    layer = new Layer("/", null, false);
    assert.equal(layer.match("/"), true);
    assert.equal(layer.match("/path/to/child/grand_child"), true);

    layer = new Layer("/", null, true);
    assert.equal(layer.match("/"), true);
    assert.equal(layer.match("/path/to/child/grand_child"), false);

    assert.end();
});

tape("Layer(path, parent, end) should create regular matchers for expressions", function(assert) {
    var layer = new Layer("/parent/:parent_id{[0-9]+}/child/:id{[0-9]+}(.:format{\\w+})", null, true);

    assert.equal(layer.match("/parent/1/child"), false);
    assert.deepEqual(layer.match("/parent/1/child/1"), {
        parent_id: "1",
        id: "1"
    });
    assert.deepEqual(layer.match("/parent/1/child/1.json"), {
        parent_id: "1",
        id: "1",
        format: "json"
    });

    assert.end();
});

tape("Layer(path, parent, end) where is has a parent", function(assert) {
    var parent = new Layer("/parent/:parent_id{[0-9]+}", null, true),
        child = new Layer("/child/:id{[0-9]+}(.:format{\\w+})", parent, true);

    assert.deepEqual(parent.match("/parent/1"), {
        parent_id: "1"
    });
    assert.deepEqual(child.match("/parent/1/child/1"), {
        parent_id: "1",
        id: "1"
    });

    assert.end();
});

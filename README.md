layer
=======

A router layer for the browser and node.js

```javascript
var Layer = require("@nathanfaucett/layer");


var parent = new Layer("/parent/:parent_id{[0-9]+}", null, true),
    child = new Layer("/child/:id{[0-9]+}(.:format{\\w+})", parent, true);

parent.match("/parent/1") === {
    parent_id: "1"
};
child.match("/parent/1/child/1") === {
    parent_id: "1",
    id: "1"
};
```

"use strict";
var Directions;
(function (Directions) {
    Directions["Up"] = "up";
    Directions["Down"] = "down";
    Directions["Left"] = "left";
    Directions["Right"] = "right";
})(Directions || (Directions = {}));
function move(direction) {
    // do something
}
move(Directions.Up);
move(Directions.Down);
move(Directions.Left);
move(Directions.Right);
console.log(Directions.Up);
console.log(Directions.Down);
console.log(Directions.Left);
console.log(Directions.Right);

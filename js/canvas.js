var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var color;
var stroke;
var colors;
var index;
var size = 6;
var col = '#000000';
function init() {
    canvas = document.getElementById("the-canvas");
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);

    stage2 = new createjs.Stage(canvas);
    stage2.autoClear = false;
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#ffffff").drawRect(0, 0, 300, 300);
    stage2.addChild(shape);
    stage2.update();

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    stage.addChild(drawingCanvas);
}
function stop() {
}

function handleMouseDown(event) {
    color = col;
    stroke = size;
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    stage.addEventListener("stagemousemove", handleMouseMove);
}
function handleMouseMove(event) {
    var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

    drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function handleMouseUp(event) {
    stage.removeEventListener("stagemousemove", handleMouseMove);
}
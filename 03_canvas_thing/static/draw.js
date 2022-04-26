var canvas;
var ctx;
var prevPos;
var isMouseDown = 0;
var strokes = [];
var undos = [];
var stroke = {};


window.onload = function () {
    canvas = document.getElementById("layer0");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
}


function redrawCanvas() {
    strokes.forEach((line, ind, arr) => drawStroke(line))
}

function drawStroke(line) {
    ctx.beginPath();
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.size;
    if (line.path.length > 0) ctx.moveTo(line.path[0].x, line.path[0].y)
    line.path.forEach((pos, ind, arr) => ctx.lineTo(pos.x, pos.y));
    ctx.stroke()
}

function clearCanvas() {
    ctx.clearRect(0, 0, 500, 500);
}


function setBrush(size) {
    ctx.lineWidth = size;
}
function setColor(color) {
    ctx.strokeStyle = color;
}

function getPosOnCanvas(e) {
    return { "x": e.offsetX, "y": e.offsetY };
}

function beginPath() {
    stroke = {
        "color": ctx.strokeStyle,
        "size": ctx.lineWidth,
        "path": []
    };
}

function endPath() {
    if (stroke && stroke.path && stroke.path.length > 0) {
        strokes.push(stroke);
        stroke = {};
        undos = [];
    }

}

function undo() {
    if (strokes.length > 0) {
        undos.push(strokes.pop);
    }
}

function redo() {
    if (undos.length > 0) {
        strokes.push(undos.pop);
    }
}

function addPathPoint(pos) {
    stroke.path.push(pos);
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineTo(pos.x, pos.y);
}

function mouseDown() {
    beginPath()
    ctx.beginPath()
    var e = window.event;
    let pos = getPosOnCanvas(e);
    prevPos = pos;
    addPathPoint(pos);
    ctx.stroke();
    //console.log("mouse down at: " + pos.x + ", " + pos.y)
    isMouseDown = 1;
}

function mouseMoved() {
    if (isMouseDown) {
        var e = window.event;
        let pos = getPosOnCanvas(e);
        addPathPoint(pos);
        ctx.stroke();
        //console.log("mouse moved to: " + pos.x + ", " + pos.y)
        prevPos = pos
    }
}

function mouseUp() {
    var e = window.event;
    let pos = getPosOnCanvas(e);
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    endPath();
    //console.log("mouse up at: " + pos.x + ", " + pos.y)
    isMouseDown = 0
}

function mouseExit() {
    if (isMouseDown) {
        mouseUp();
    }
}

function mouseEnter() {
    if (window.event.buttons) {
        mouseDown();
    }
}
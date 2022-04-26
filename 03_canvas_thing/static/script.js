var canvas1;
var ctx1;
var running = 0;
var interval;

window.onload = function () {
    canvas1 = document.getElementById("layer1");
    ctx1 = canvas1.getContext("2d");
}

function startCanvas() {
    canvas1 = document.getElementById("layer1");
    ctx1 = canvas1.getContext("2d");
    let button = document.getElementById("startbutton")
    if (running) {
        running = 0;
        if (interval) {
            clearInterval(interval);
        }
        button.innerHTML = "Start"
    } else {
        running = 1;
        interval = setInterval(createRect, 200)
        button.innerHTML = "Stop"
    }
}

function createRect() {
    let color = "#";
    const hexa = "0123456789abcdef";
    let x = Math.floor(Math.random() * 400);
    let y = Math.floor(Math.random() * 400);
    let side = Math.floor(Math.random() * 80) + 20;
    for (let i = 0; i < 6; i++) {
        let hexInd = Math.floor(Math.random() * hexa.length)
        color = color + hexa[hexInd]
    }
    ctx1.fillStyle = color;
    ctx1.fillRect(x, y, side, side);
}

function clearCanvas() {
    ctx1.clearRect(0, 0, 500, 500);
}


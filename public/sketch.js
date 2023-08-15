let canvas;

function setup() {
    canvas = createCanvas(280, 280);
    canvas.parent('canvas-holder');
    background(0);
    strokeWeight(35);
    stroke(255);
}

function draw() {
    // Check if the mouse is pressed
    if (mouseIsPressed) {
        // Draw a point at the current mouse position
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function keyPressed(e) {
    if (e.keyCode !== 32) return;
    background(0);
}

function updateProgressBars(probabilities) {
    const container = document.querySelector("#progressbars-container");
    container.children.forEach((li, i) => {
        li.querySelector('span').style.width = `${probabilities[i] * 100}%`
    });
}

async function start() {
    if (canvas != null) {
        const probabilities = await predict();
        updateProgressBars(probabilities);
        // console.log(probabilities);
    }
    // await new Promise((res, rej) => setTimeout(res, 100));
    requestAnimationFrame(start);
}
start();
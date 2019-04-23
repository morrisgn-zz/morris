var element = document.getElementById("canvas1"),
    c = element.getContext("2d"),
    width = element.width,
    height = element.height,
    imageData = c.createImageData(width, height);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function draw() {
    for (i = 0; i < 10000; i++) {
        x = Math.random() * width | 0;
        y = Math.random() * height | 0;
        r = Math.random() * 256 | 0;
        g = Math.random() * 256 | 0;
        b = Math.random() * 256 | 0;
        setPixel(imageData, x, y, r, g, b, 255);
    }
    c.putImageData(imageData, 0, 0);
}

function render() {
    requestAnimationFrame(render);
    draw();
}

render();

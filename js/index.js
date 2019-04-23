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
function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, {scale: 1});
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
  }
  resize();
  window.addEventListener('resize', resize);
}

var easingsAnimation = (function() {

  var easingVisualizerEl = document.querySelector('.easing-visualizer');
  var barsWrapperEl = easingVisualizerEl.querySelector('.bars-wrapper');
  var dotsWrapperEl = easingVisualizerEl.querySelector('.dots-wrapper');
  var barsFragment = document.createDocumentFragment();
  var dotsFragment = document.createDocumentFragment();
  var numberOfBars = 91;
  var duration = 450;
  var animation;
  
  fitElementToParent(easingVisualizerEl, 0);

  for (var i = 0; i < numberOfBars; i++) {
    var barEl = document.createElement('div');
    var dotEl = document.createElement('div');
    barEl.classList.add('bar');
    dotEl.classList.add('dot');
    dotEl.classList.add('color-red');
    barsFragment.appendChild(barEl);
    dotsFragment.appendChild(dotEl);
  }

  barsWrapperEl.appendChild(barsFragment);
  dotsWrapperEl.appendChild(dotsFragment);
  
  function play() {
    
    var easings = [];
    for (let ease in anime.penner) easings.push(ease);
    easings.push('steps('+anime.random(5, 20)+')');
    easings.push('steps('+anime.random(5, 20)+')');
    easings.push('cubicBezier(0.545, 0.475, 0.145, 1)');
    var ease = easings[anime.random(0, easings.length - 1)];

    animation = anime.timeline({
      duration: duration,
      easing: ease,
      complete: play
    })
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 44], {easing: ease, from: 'center', direction: 'reverse'}),
      delay: anime.stagger(7, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-160px', '160px'], {easing: ease, from: 'last'}),
      delay: anime.stagger(7, {from: 'center'})
    }, 0);

  }
  
  play();
  
})();

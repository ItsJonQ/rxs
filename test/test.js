var a = new RCSS('.rx-width');

document.addEventListener('mousemove', function(e) {
  var s = e.screenX / window.innerWidth * 100;
  var l = e.screenY / window.innerHeight * 100;

  a.set({
    background: `hsl(155, ${s}%, ${l}%)`,
    height: `${l}px`,
    width: `${s}%`,
  });
}, false);

window.addEventListener('resize', function(e) {
  var s = Math.ceil(window.innerWidth + (window.innerHeight / 2));
  a.set({
    background: `hsl(${s}, 50%, 50%)`,
  });
}, false);

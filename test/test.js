var a = new RCSS('.rx-width');

a.on('window', 'resize', function(e) {
  var width = e.target.innerWidth;

  this.set(`
    height: ${width / 4}px;
    width: ${width / 2.4}px;
  `);
});

a.on('document', 'mousemove', function(e) {
  var s = e.screenX / window.innerWidth * 100;
  var l = e.screenY / window.innerHeight * 100;
  this.set(`
    background: hsl(155, ${s}%, ${l}%);
    height: ${l}px;
    width: ${s}%;
  `);
});

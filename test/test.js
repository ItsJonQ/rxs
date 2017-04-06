var a = new RCSS('.rx-width');

a.on('window', 'resize', function(e) {
  var width = e.target.innerWidth;
  var color = width % 2 ? 'blue' : 'red';

  this.set(`
    background: ${color};
    height: ${width / 4}px;
    width: ${width / 2.4}px;
  `);
});

a.on('window', 'scroll', function(e) {
  this.set(`
    background: yellow;
  `);
});

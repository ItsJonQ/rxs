var a = rxs('.rx-hero-image');

var magicHero = function() {
  var offset = window.pageYOffset;
  var h = window.innerHeight * 0.7;
  var opacity = Math.max(0, Math.min(1 - (offset/h), 1));
  var scale = Math.max(0, Math.min(1 + (offset/h), 3));

  a.set({
    opacity: opacity,
    transform: 'translateZ(0) scale('+scale+')',
  });
};

window.addEventListener('scroll', magicHero, false);

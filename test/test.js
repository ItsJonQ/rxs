'use strict';

var expect = chai.expect;
var fx = document.getElementById('fixtures');

describe('rxs.set', function() {
  var el = document.createElement('div');
  var c = 'rx-s';
  var s = rxs('.rx-s');
  fx.appendChild(el);

  it('should set a simple CSS property', function() {
    var prop = '10px';
    el.classList.add(c);
    s.set({
      height: prop,
    });

    expect(el.clientHeight).to.equal(false);
  });

  it('should set multiple CSS properties', function() {
    s.set({
      background: 'rgba(255, 165, 0, 0)',
      margin: '50px',
      padding: '10px',
    });
    var styles = window.getComputedStyle(el);

    expect(styles.backgroundColor).to.equal('rgba(255, 165, 0, 0)');
    expect(styles.margin).to.equal('50px');
    expect(styles.padding).to.equal('10px');
  });

});

'use strict';
var jsdom = require('jsdom').jsdom;
var document = jsdom('<div id="test"></div>');
var window = document.defaultView;
var nodeRXS = require('../src/rxs.js');
var expect = require('chai').expect;

nodeRXS(window);
var rxs = window.rxs;

describe('rxs.inspect', function() {
  var el = window.document.getElementById('test');
  el.classList.add('rx-style');

  it('should return an object of props on .inspect()', function() {
    var p = {
      display: 'block',
      margin: '10px',
    };
    var r = rxs('.rx-style', p);

    expect(r.inspect().display).to.equal(p.display);
    expect(r.inspect().margin).to.equal(p.margin);
  });
});

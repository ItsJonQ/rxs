'use strict';
var jsdom = require('jsdom').jsdom;
var document = jsdom('<div id="test"></div>');
var window = document.defaultView;
var nodeRXS = require('../src/rxs.js');
var expect = require('chai').expect;

nodeRXS(window);
var rxs = window.rxs;

describe('rxs.remove', function() {
  var el = window.document.getElementById('test');
  el.classList.add('rx-style');
  var p = {
    display: 'block',
    margin: '10px',
  };

  it('should remove an rxs rule', function() {
    var r = rxs('.rx-style', p);

    // Rule should be added
    expect(r.getRules().length).to.equal(1);
    r.remove();
    // Rule should be removed
    expect(r.getRules().length).to.equal(0);
  });

  it('should not be able to remove a removed rule', function() {
    var r = rxs('.a', p);
    // Extra rules, totally 3 rules
    rxs('.b', p);
    rxs('.c', p);

    r.remove(); // 3 rules -> 2
    r.remove(); // Can't be removed again
    expect(r.getRules().length).to.equal(2);
  });
});

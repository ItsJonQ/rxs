'use strict';
var jsdom = require('jsdom').jsdom;
var document = jsdom('<div id="test"></div>');
var window = document.defaultView;
var nodeRXS = require('../src/rxs.js');
var expect = require('chai').expect;

nodeRXS(window);
var rxs = window.rxs;

describe('rxs', function() {
  var el = window.document.getElementById('test');
  el.classList.add('rx-style');

  it('should not initialize if no selector is passed', function() {
    var r = rxs();

    expect(r).to.be.false;
  });

  it('should be an instance of RXSRule', function() {
    var r = rxs('.hello');

    expect(r instanceof window.RXSRule).to.be.true;
  });

  it('should not set CSS props on init if second argument isn\'t passed', function() {
    rxs('.rx-style');
    var style = window.getComputedStyle(el);

    expect(style.display).to.equal('block'); // Default by JSDOM
  });

  it('should set CSS props on init if second argument is passed', function() {
    rxs('.rx-style', {
      display: 'inline',
    });
    var style = window.getComputedStyle(el);

    expect(style.display).to.equal('inline');
  });

});

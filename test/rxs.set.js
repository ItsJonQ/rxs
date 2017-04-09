'use strict';
var jsdom = require('jsdom').jsdom;
var document = jsdom('<div id="test"></div>');
var window = document.defaultView;
var nodeRXS = require('../src/rxs.js');
var expect = require('chai').expect;

nodeRXS(window);
var rxs = window.rxs;

describe('rxs.set', function() {
  var el = window.document.getElementById('test');
  el.classList.add('rx-style');
  var r = rxs('.rx-style');

  it('should set a single CSS property', function() {
    r.set({
      display: 'inline',
    });
    var style = window.getComputedStyle(el);

    expect(style.display).to.equal('inline');
  });

  it('should accept and handle a number (type) value', function() {
    r.set({
      opacity: 0.92,
    });
    var style = window.getComputedStyle(el);

    expect(style.opacity).to.equal('0.92');
  });

  it('should set multiple CSS properties', function() {
    r.set({
      padding: '10px',
      width: '300px',
    });
    var style = window.getComputedStyle(el);

    expect(style.padding).to.equal('10px');
    expect(style.width).to.equal('300px');
  });

  it('should set single CSS property, without affecting previous properties', function() {
    r.set({
      background: 'transparent',
    });
    var style = window.getComputedStyle(el);

    expect(style.background).to.equal('transparent');
    expect(style.width).to.equal('300px'); // from previous test
  });

  it('should set multiple CSS property, without affecting previous properties', function() {
    r.set({
      marginLeft: '50px',
      position: 'absolute',
    });
    var style = window.getComputedStyle(el);

    expect(style.marginLeft).to.equal('50px');
    expect(style.position).to.equal('absolute');
    expect(style.width).to.equal('300px'); // from previous test
  });

  it('should set an !important CSS property', function() {
    r.set({
      display: 'inline-block !important',
    });
    var style = window.getComputedStyle(el);

    expect(style.display).to.equal('inline-block !important');
  });
});

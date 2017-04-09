// QUnit :: Test :: Link
/* globals QUnit: true */
'use strict';

var q = QUnit;
var t = q.test;
var md = q.module;

md('modifier: link', function() {

  t('should set a simple CSS prop', function(assert) {
    var el = $('#a');
    var s = rxs('.rx-a');
    s.set({
      height: '10px',
    });

    assert.equal(el.height(), 10,
      'height is updated');
  });

  t('should set multiple CSS props', function(assert) {
    var el = $('#b');
    var s = rxs('.rx-b');
    s.set({
      backgroundColor: 'rgba(255, 165, 0, 0)',
      margin: '50px',
      padding: '10px',
    });

    assert.equal(el.css('background-color'), 'rgba(255, 165, 0, 0)',
      'background-color is updated');
    assert.equal(el.css('margin'), '50px',
      'margin is updated');
    assert.equal(el.css('padding'), '10px',
      'padding is updated');
  });

  t('should set a single CSS prop without removing other props', function(assert) {
    var el = $('#b');
    var s = rxs('.rx-b');
    s.set({
      height: '10px',
    });

    assert.equal(el.height(), 10,
      'height is updated');
    // Gets margin from previous test
    assert.equal(el.css('margin'), '50px',
      'margin is unaffected');
  });

  t('should set multiple CSS props without removing other props', function(assert) {
    var el = $('#b');
    var s = rxs('.rx-b');
    s.set({
      display: 'inline',
      position: 'relative',
    });

    assert.equal(el.css('display'), 'inline',
      'display is updated');
    assert.equal(el.css('position'), 'relative',
      'position is updated');
    // Gets margin from previous test
    assert.equal(el.css('margin'), '50px',
      'margin is unaffected');
  });
});

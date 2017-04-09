/**
 * rxs v0.3.0 (https://github.com/ItsJonQ/rxs#readme)
 * Reactive CSS: Super fast dynamic CSS rules.
 * Licensed under MIT
 */
(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ?
      factory(global, true) :
      function(w) {
        if (!w.document) {
          throw new Error('ReactiveCSS requires a window with a document');
        }
        return factory(w);
      };
  } else {
    factory(global);
  }
}(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  'use strict';
  var document = window.document;

  var RXSRule = function(selector) {
    this.selector = selector;
    this.styleSheet = false;
    this.rule = false;
    this.ruleIndex = 0;
  };

  RXSRule.prototype.addStyleSheet = function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  };

  RXSRule.prototype.getStyleSheet = function() {
    return this.styleSheet || document.styleSheets[0] || this.addStyleSheet();
  };

  RXSRule.prototype.getRules = function() {
    var sheet = this.getStyleSheet();
    return sheet.cssRules || sheet.rules;
  };

  RXSRule.prototype.getRuleIndex = function() {
    if (!this.ruleIndex) {
      this.ruleIndex = this.getRules().length;
    }
    return this.ruleIndex;
  };

  RXSRule.prototype.addRule = function() {
    var index = this.getRuleIndex();
    this.getStyleSheet().insertRule(this.selector + ' { }', index);
    return this.getRules()[index];
  };

  RXSRule.prototype.findRule = function() {
    var rules = this.getRules();
    var rule = false;
    for (var i = 0, len = Object.keys(rules).length; i < len; i++) {
      if (rules[i].selectorText === this.selector) {
        rule = rules[i]; break;
      }
    }
    return rule;
  };

  RXSRule.prototype.getRule = function() {
    return this.rule = this.findRule() || this.addRule();
  };

  RXSRule.prototype.isImportant = function(prop) {
    return prop.indexOf('!important') >= 0 ? '!important' : '';
  };

  RXSRule.prototype.set = function(styleProps) {
    var self = this;
    Object.keys(styleProps).forEach(function(k) {
      var prop = styleProps[k];
      self.getRule().style.setProperty(k, prop, self.isImportant(prop));
    });
    return this;
  };

  var RXS = function(selector) {
    return new RXSRule(selector);
  };

  return window.rxs = window.RXS = RXS;
}));

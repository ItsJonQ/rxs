/**
 * rxs v0.2.0 (https://github.com/ItsJonQ/rxs#readme)
 * Reactive CSS: Super fast dynamic CSS rules.
 * Licensed under MIT
 */
(function() {
  'use strict';
  window.ReactiveStylesheet = (function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  })();

  var RXSRule = function(selector) {
    this.selector = selector;
    this.styleSheet = false;
    this.rule = false;
    this.ruleIndex = 0;
  };

  RXSRule.prototype.getStyleSheet = function() {
    return this.styleSheet || window.ReactiveStylesheet;
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
    var rule = this.selector + ' { }';
    this.getStyleSheet().insertRule(rule, index);
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

  RXSRule.prototype.set = function(styleProps) {
    var styles = this.getRule().style;
    Object.keys(styleProps).forEach(function(k) {
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        styles[k] = styleProps[k];
      }
    });
    return this;
  };

  var RXS = function(selector) {
    return new RXSRule(selector);
  };

  window.rxs = window.RXS = RXS;
})();

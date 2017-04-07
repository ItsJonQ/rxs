(function() {
  window.ZStyleSheet = (function() {
    var style = document.createElement("style");
    // WebKit hack :(
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  })();

  var ZSS = function(selector) {
    return new ZSSRule(selector);
  };

  var ZSSRule = function(selector) {
    this.selector = selector;
    this.styleSheet = false;
    this.rule = false;
    this.ruleIndex = 0;
  };

  ZSSRule.prototype.getStyleSheet = function() {
    return this.styleSheet || document.styleSheets[document.styleSheets.length - 1];
  };

  ZSSRule.prototype.getRules = function() {
    var sheet =  this.getStyleSheet();
    return sheet.cssRules || sheet.rules;
  };

  ZSSRule.prototype.getRuleIndex = function() {
    if (!this.ruleIndex) {
      this.ruleIndex = this.getRules().length;
    }
    return this.ruleIndex;
  };

  ZSSRule.prototype.addRule = function() {
    var sheet = this.getStyleSheet();
    var rules = this.getRules();
    var index = this.getRuleIndex();
    var rule = `${this.selector} { }`;
    sheet.insertRule(rule, index);
    this.rule = rules[index];
    return this.rule;
  };

  ZSSRule.prototype.hasRule = function() {
    return Object.keys(this.getRules()).some(function(r) {
      return r.selectorText === this.selector;
    });
  };

  ZSSRule.prototype.getRule = function() {
    if (!this.rule || !this.hasRule()) {
      this.addRule();
    }
    return this.rule;
  };

  ZSSRule.prototype.set = function(styleProps) {
    var styles = this.getRule().style;
    Object.keys(styleProps).forEach(function(k) {
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        styles[k] = styleProps[k];
      }
    });
    return this;
  };

  window.ZSS = ZSS;
})();

(function() {
  var RCSS = function(selector) {
    this.selector = selector;
    this.styleSheet = false;
    this.rule = false;
    this.ruleIndex = 0;
  };

  RCSS.prototype.getStyleSheet = function() {
    return this.styleSheet || document.styleSheets[document.styleSheets.length - 1];
  };

  RCSS.prototype.getRules = function() {
    var sheet =  this.getStyleSheet();
    return sheet.cssRules || sheet.rules;
  };

  RCSS.prototype.getRuleIndex = function() {
    if (!this.ruleIndex) {
      this.ruleIndex = this.getRules().length;
    }
    return this.ruleIndex;
  };

  RCSS.prototype.getRule = function() {
    if (!this.rule) {
      var sheet = this.getStyleSheet();
      var rules = this.getRules();
      var index = this.getRuleIndex();
      var rule = `${this.selector} { }`;
      sheet.insertRule(rule, index);
      this.rule = rules[index];
    }
    return this.rule;
  };

  RCSS.prototype.set = function(styleProps) {
    var styles = this.getRule().style;
    Object.keys(styleProps).forEach(function(k) {
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        styles[k] = styleProps[k];
      }
    });
    return this;
  };

  window.RCSS = RCSS;
})();

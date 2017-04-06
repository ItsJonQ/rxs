(function() {
  var RCSS = function(selector) {
    this.selector = selector;
    this.styleSheet = false;
    this.hasSet = false;
    this.rule = false;
    this.ruleIndex = 0;
  };

  RCSS.prototype.on = function(el, event, callback) {
    if (el === 'window') {
      window.addEventListener(event, callback.bind(this));
    }
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

  RCSS.prototype.set = function(styles) {
    var sheet = this.getStyleSheet();
    var index = this.getRuleIndex();
    var rule = `${this.selector} { ${styles} }`;
    if (this.hasSet) {
      sheet.deleteRule(index);
    }
    sheet.insertRule(rule, index);
    this.hasSet = true;
  };

  window.RCSS = RCSS;
})();

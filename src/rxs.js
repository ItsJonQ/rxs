(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
        if (!w.document) {
          throw new Error('RXS: Reactive CSS requires a window with a document')
        }
        return factory(w)
      }
  } else {
    factory(global)
  }
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
  'use strict'
  const document = window.document

  const RXSRule = function (selector) {
    this.selector = selector
    this.styleSheet = this.getStyleSheet()
    this.rule = this.getRule()
    this.ruleIndex = this.getRuleIndex()
    return this
  }

  RXSRule.prototype.addStyleSheet = function () {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(''))
    document.head.appendChild(style)
    return style.sheet
  }

  RXSRule.prototype.getStyleSheet = function () {
    return this.styleSheet || document.styleSheets[document.styleSheets.length - 1] || this.addStyleSheet()
  }

  RXSRule.prototype.getRules = function () {
    const sheet = this.getStyleSheet()
    return sheet.cssRules || sheet.rules
  }

  RXSRule.prototype.getRuleIndex = function () {
    if (!this.ruleIndex) {
      if (this.rule) {
        this.ruleIndex = this.findRuleIndex()
      } else {
        const len = this.getRules().length
        this.ruleIndex = len ? len - 1 : 0
      }
    }
    return this.ruleIndex
  }

  RXSRule.prototype.addRule = function () {
    const index = this.getRuleIndex()
    this.getStyleSheet().insertRule(this.selector + ' { }', index)
    return this.getRules()[index]
  }

  RXSRule.prototype.removeRule = function () {
    if (this.findRule()) {
      this.getStyleSheet().deleteRule(this.getRuleIndex())
    }
    return this
  }

  RXSRule.prototype.findRuleIndex = function () {
    const rules = this.getRules()
    let index = false
    for (let i = 0, len = Object.keys(rules).length; i < len; i++) {
      if (rules[i].selectorText === this.selector) {
        index = i; break
      }
    }
    return index
  }

  RXSRule.prototype.findRule = function () {
    const rules = this.getRules()
    const index = this.findRuleIndex()
    const rule = index !== false ? rules[index] : false
    return rule
  }

  RXSRule.prototype.getRule = function () {
    this.rule = this.findRule() || this.addRule()
    return this.rule
  }

  RXSRule.prototype.isImportant = function (prop) {
    return prop.toString().indexOf('!important') >= 0 ? 'important' : ''
  }

  RXSRule.prototype.set = function (styleProps, important) {
    const self = this
    Object.keys(styleProps).forEach(function (k) {
      const prop = styleProps[k]
      const p = typeof prop === 'string' ? prop.replace(' !important', '') : prop
      const i = important === 'important' ? 'important' : self.isImportant(prop)
      self.getRule().style.setProperty(k, p, i)
    })
    return this
  }

  RXSRule.prototype.inspect = function () {
    const style = this.getRule().style
    return Object.keys(style).reduce(function (props, r) {
      if (style[r].length && isNaN(parseInt(r, 10))) {
        props[r] = style[r]
      }
      return props
    }, {})
  }

  RXSRule.prototype.remove = function () {
    return this.removeRule()
  }

  const RXS = function (selector, props) {
    if (!selector || typeof selector !== 'string') {
      return false
    }
    var rule = new RXSRule(selector)
    if (props && typeof props === 'object') {
      rule.set(props)
    }
    return rule
  }

  window.RXSRule = RXSRule
  window.rxs = window.RXS = RXS

  return RXS
}))

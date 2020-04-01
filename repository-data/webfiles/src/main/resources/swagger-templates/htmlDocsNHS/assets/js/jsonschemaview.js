(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JSONSchemaView = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/*
 * Converts anyOf, allOf and oneOf to human readable string
*/
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.convertXOf = convertXOf;
exports._if = _if;

function convertXOf(type) {
  return type.substring(0, 3) + ' of';
}

/*
 * if condition for ES6 template strings
 * to be used only in template string
 *
 * @example mystr = `Random is ${_if(Math.random() > 0.5)`greater than 0.5``
 *
 * @param {boolean} condition
 *
 * @returns {function} the template function
*/

function _if(condition) {
  return condition ? normal : empty;
}

function empty() {
  return '';
}
function normal(template) {
  for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expressions[_key - 1] = arguments[_key];
  }

  return template.slice(1).reduce(function (accumulator, part, i) {
    return accumulator + expressions[i] + part;
  }, template[0]);
}

},{}],2:[function(require,module,exports){
'use strict';

/* globals JSONSchemaView */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(['\n        <div class="any">\n          ', '\n\n          <span class="type type-any">&lt;any&gt;</span>\n\n          ', '\n\t\t \n\t\t  ', '\n\t\t  ', '\n\t\t   ', '\n        </div>\n      '], ['\n        <div class="any">\n          ', '\n\n          <span class="type type-any">&lt;any&gt;</span>\n\n          ', '\n\t\t \n\t\t  ', '\n\t\t  ', '\n\t\t   ', '\n        </div>\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            <a class="title"><span class="toggle-handle"></span>', ' </a>\n          '], ['\n            <a class="title"><span class="toggle-handle"></span>', ' </a>\n          ']),
    _templateObject3 = _taggedTemplateLiteral(['\n            <div class="inner description marked">', '</div>\n          '], ['\n            <div class="inner description marked">', '</div>\n          ']),
    _templateObject4 = _taggedTemplateLiteral(['\n            <div class="inner required">Required: ', '</div>\n          '], ['\n            <div class="inner required">Required: ', '</div>\n          ']),
    _templateObject5 = _taggedTemplateLiteral(['\n            <div class="inner default">Default: ', '</div>\n          '], ['\n            <div class="inner default">Default: ', '</div>\n          ']),
    _templateObject6 = _taggedTemplateLiteral(['\n            <div class="inner pattern">Pattern: ', '</div>\n          '], ['\n            <div class="inner pattern">Pattern: ', '</div>\n          ']),
    _templateObject7 = _taggedTemplateLiteral(['\n        <div class="primitive">\n          ', '\n\n            <span class="type">', '</span>\n\n         \n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\t\t  \n\t\t \n\t\t  \n\t\t   ', '\n\t\t  ', '\n\t\t   ', '\n\n          ', '\n\n          ', '\n          ', '\n          ', '\n        </div>\n      '], ['\n        <div class="primitive">\n          ', '\n\n            <span class="type">', '</span>\n\n         \n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\n          ', '\n\t\t  \n\t\t \n\t\t  \n\t\t   ', '\n\t\t  ', '\n\t\t   ', '\n\n          ', '\n\n          ', '\n          ', '\n          ', '\n        </div>\n      ']),
    _templateObject8 = _taggedTemplateLiteral(['\n            <span class="format">(', ')</span>\n          '], ['\n            <span class="format">(', ')</span>\n          ']),
    _templateObject9 = _taggedTemplateLiteral(['\n            <span class="range minimum">minimum:', '</span>\n          '], ['\n            <span class="range minimum">minimum:', '</span>\n          ']),
    _templateObject10 = _taggedTemplateLiteral(['\n            <span class="range exclusiveMinimum">(ex)minimum:', '</span>\n          '], ['\n            <span class="range exclusiveMinimum">(ex)minimum:', '</span>\n          ']),
    _templateObject11 = _taggedTemplateLiteral(['\n            <span class="range maximum">maximum:', '</span>\n          '], ['\n            <span class="range maximum">maximum:', '</span>\n          ']),
    _templateObject12 = _taggedTemplateLiteral(['\n            <span class="range exclusiveMaximum">(ex)maximum:', '</span>\n          '], ['\n            <span class="range exclusiveMaximum">(ex)maximum:', '</span>\n          ']),
    _templateObject13 = _taggedTemplateLiteral(['\n            <span class="range minLength">minLength:', '</span>\n          '], ['\n            <span class="range minLength">minLength:', '</span>\n          ']),
    _templateObject14 = _taggedTemplateLiteral(['\n            <span class="range maxLength">maxLength:', '</span>\n          '], ['\n            <span class="range maxLength">maxLength:', '</span>\n          ']),
    _templateObject15 = _taggedTemplateLiteral(['\n            <div class="inner required">Required</div>\n          '], ['\n            <div class="inner required">Required</div>\n          ']),
    _templateObject16 = _taggedTemplateLiteral(['\n            ', '\n          '], ['\n            ', '\n          ']),
    _templateObject17 = _taggedTemplateLiteral(['', ''], ['', '']),
    _templateObject18 = _taggedTemplateLiteral(['\n        <div class="array">\n          <a class="title"><span class="toggle-handle"></span>', '<span class="opening bracket">[</span>', '</a>\n          ', '\n          <div class="inner">\n            ', '\n          </div>\n\n          ', '\n\n          ', '\n          ', '\n          ', '\n\n          ', '\n        </div>\n      '], ['\n        <div class="array">\n          <a class="title"><span class="toggle-handle"></span>', '<span class="opening bracket">[</span>', '</a>\n          ', '\n          <div class="inner">\n            ', '\n          </div>\n\n          ', '\n\n          ', '\n          ', '\n          ', '\n\n          ', '\n        </div>\n      ']),
    _templateObject19 = _taggedTemplateLiteral(['<span class="closing bracket">]</span>'], ['<span class="closing bracket">]</span>']),
    _templateObject20 = _taggedTemplateLiteral(['\n          <span>\n            <span title="items range">(', '..', ')</span>\n            ', '\n          </span>\n          '], ['\n          <span>\n            <span title="items range">(', '..', ')</span>\n            ', '\n          </span>\n          ']),
    _templateObject21 = _taggedTemplateLiteral(['<span title="unique" class="uniqueItems">♦</span>'], ['<span title="unique" class="uniqueItems">♦</span>']),
    _templateObject22 = _taggedTemplateLiteral(['\n              <div class="description">', '</div>\n            '], ['\n              <div class="description">', '</div>\n            ']),
    _templateObject23 = _taggedTemplateLiteral(['\n          <span class="closing bracket">]</span>\n          '], ['\n          <span class="closing bracket">]</span>\n          ']),
    _templateObject24 = _taggedTemplateLiteral(['\n        <div class="object">\n          <a class="title"><span\n            class="toggle-handle"></span>', ' <span\n            class="opening brace">{</span>', '</a>\n\n          <div class="inner">\n            ', '\n            <!-- children go here -->\n\t\t  \n\t\t   ', '\n\t\t  ', '\n\t\t  \n\t\t\t', '\n          </div>\n\n          ', '\n\n          ', '\n          ', '\n          ', '\n\n          ', '\n        </div>\n      '], ['\n        <div class="object">\n          <a class="title"><span\n            class="toggle-handle"></span>', ' <span\n            class="opening brace">{</span>', '</a>\n\n          <div class="inner">\n            ', '\n            <!-- children go here -->\n\t\t  \n\t\t   ', '\n\t\t  ', '\n\t\t  \n\t\t\t', '\n          </div>\n\n          ', '\n\n          ', '\n          ', '\n          ', '\n\n          ', '\n        </div>\n      ']),
    _templateObject25 = _taggedTemplateLiteral(['\n              <span class="closing brace" ng-if="isCollapsed">}</span>\n          '], ['\n              <span class="closing brace" ng-if="isCollapsed">}</span>\n          ']),
    _templateObject26 = _taggedTemplateLiteral(['\n            <div class="required">Required: ', '</div>\n          '], ['\n            <div class="required">Required: ', '</div>\n          ']),
   _templateObject266 = _taggedTemplateLiteral(['\n            <div class="required">Required: ', '</div>\n          '], ['\n            <div class="required">Required: ', '</div>\n          ']),
    _templateObject27 = _taggedTemplateLiteral(['\n            <div class="default">Default: ', '</div>\n          '], ['\n            <div class="default">Default: ', '</div>\n          ']),
    _templateObject28 = _taggedTemplateLiteral(['\n              <div class="pattern">Pattern: ', '</div>\n            '], ['\n              <div class="pattern">Pattern: ', '</div>\n            ']),
    _templateObject29 = _taggedTemplateLiteral(['\n          <span class="closing brace">}</span>\n          '], ['\n          <span class="closing brace">}</span>\n          ']),
    _templateObject30 = _taggedTemplateLiteral(['\n        <div class="inner enums">\n          <b>Enum:</b>\n        </div>\n      '], ['\n        <div class="inner enums">\n          <b>Enum:</b>\n        </div>\n      ']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _helpersJs = require('./helpers.js');

/**
 * @class JSONSchemaView
 *
 * A pure JavaScript component for rendering JSON Schema in HTML.
*/

var JSONSchemaView = (function () {

  /**
   * @param {object} schema The JSON Schema object
   *
   * @param {number} [open=1] his number indicates up to how many levels the
   * rendered tree should expand. Set it to `0` to make the whole tree collapsed
   * or set it to `Infinity` to expand the tree deeply
   * @param {object} options.
   *  theme {string}: one of the following options: ['dark']
  */

  function JSONSchemaView(schema, open) {
    var _this = this;

    var options = arguments.length <= 2 || arguments[2] === undefined ? { theme: null } : arguments[2];

    _classCallCheck(this, JSONSchemaView);

    this.schema = schema; //console.log(schema);
    this.open = open;
    this.options = options;
    this.isCollapsed = open <= 0;

    // if schema is an empty object which means any JOSN
    this.isAny = typeof schema === 'object' && !Array.isArray(schema) && !Object.keys(schema).filter(function (k) {
      return ['title', 'description'].indexOf(k) === -1;
    }).length;

    // Determine if a schema is an array
    this.isArray = !this.isAny && this.schema && this.schema.type === 'array';

    this.isObject = this.schema && (this.schema.type === 'object' || this.schema.properties || this.schema.anyOf || this.schema.oneof || this.schema.allOf);

    // Determine if a schema is a primitive
    this.isPrimitive = !this.isAny && !this.isArray && !this.isObject;

    //
    this.showToggle = this.schema.description || this.schema.title || this.isPrimitive && (this.schema.minimum || this.schema.maximum || this.schema.exclusiveMinimum || this.schema.exclusiveMaximum);

    // populate isRequired property down to properties
    if (this.schema && Array.isArray(this.schema.required)) {
      this.schema.required.forEach(function (requiredProperty) {
        if (typeof _this.schema.properties[requiredProperty] === 'object') {
          _this.schema.properties[requiredProperty].isRequired = true;
        }
      });
    }
  }

  /*
   * Returns the template with populated properties.
   * This template does not have the children
  */

  _createClass(JSONSchemaView, [{
    key: 'template',
    value: function template() {
      if (!this.schema) {
        return '';
      }

      return ('\n      <!-- Any -->\n      ' + (0, _helpersJs._if)(this.isAny)(_templateObject, (0, _helpersJs._if)(this.showToggle)(_templateObject2, this.schema.title || ''), (0, _helpersJs._if)(this.schema.description && !this.isCollapsed)(_templateObject3, marked(this.schema.description || "")), (0, _helpersJs._if)(this.schema.required && !this.isCollapsed)(_templateObject4, this.schema.required), (0, _helpersJs._if)(this.schema['default'] && !this.isCollapsed)(_templateObject5, this.schema['default']), (0, _helpersJs._if)(this.schema.pattern && !this.isCollapsed)(_templateObject6, this.schema.pattern)) + '\n\n      <!-- Primitive -->\n      ' + (0, _helpersJs._if)(this.isPrimitive)(_templateObject7, (0, _helpersJs._if)(this.showToggle)(_templateObject2, this.schema.title || ''), this.schema.type, (0, _helpersJs._if)(!this.isCollapsed && this.schema.format)(_templateObject8, this.schema.format), (0, _helpersJs._if)(!this.isCollapsed && this.schema.minimum)(_templateObject9, this.schema.minimum), (0, _helpersJs._if)(!this.isCollapsed && this.schema.exclusiveMinimum)(_templateObject10, this.schema.exclusiveMinimum), (0, _helpersJs._if)(!this.isCollapsed && this.schema.maximum)(_templateObject11, this.schema.maximum), (0, _helpersJs._if)(!this.isCollapsed && this.schema.exclusiveMaximum)(_templateObject12, this.schema.exclusiveMaximum), (0, _helpersJs._if)(!this.isCollapsed && this.schema.minLength)(_templateObject13, this.schema.minLength), (0, _helpersJs._if)(!this.isCollapsed && this.schema.maxLength)(_templateObject14, this.schema.maxLength), (0, _helpersJs._if)(this.schema.description && !this.isCollapsed)(_templateObject3, marked(this.schema.description || "")), (0, _helpersJs._if)(this.schema.required && !this.isCollapsed)(_templateObject15), (0, _helpersJs._if)(this.schema['default'] && !this.isCollapsed)(_templateObject5, this.schema['default']), (0, _helpersJs._if)(this.schema.pattern && !this.isCollapsed)(_templateObject6, this.schema.pattern), (0, _helpersJs._if)(!this.isCollapsed && this.schema['enum'])(_templateObject16, this['enum'](this.schema, this.isCollapsed, this.open)), (0, _helpersJs._if)(this.schema.allOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'allOf')), (0, _helpersJs._if)(this.schema.oneOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'oneOf')), (0, _helpersJs._if)(this.schema.anyOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'anyOf'))) + '\n\n\n      <!-- Array -->\n      ' + (0, _helpersJs._if)(this.isArray)(_templateObject18, this.schema.title || '', (0, _helpersJs._if)(this.isCollapsed)(_templateObject19), (0, _helpersJs._if)(!this.isCollapsed && (this.schema.uniqueItems || this.schema.minItems || this.schema.maxItems))(_templateObject20, this.schema.minItems || 0, this.schema.maxItems || '∞', (0, _helpersJs._if)(!this.isCollapsed && this.schema.uniqueItems)(_templateObject21)), (0, _helpersJs._if)(!this.isCollapsed && this.schema.description)(_templateObject22, marked(this.schema.description || "")), (0, _helpersJs._if)(!this.isCollapsed && this.schema['enum'])(_templateObject16, this['enum'](this.schema, this.isCollapsed, this.open)), (0, _helpersJs._if)(this.schema.allOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'allOf')), (0, _helpersJs._if)(this.schema.oneOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'oneOf')), (0, _helpersJs._if)(this.schema.anyOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'anyOf')), (0, _helpersJs._if)(!this.isCollapsed)(_templateObject23)) + '\n\n      <!-- Object -->\n      ' + (0, _helpersJs._if)(!this.isPrimitive && !this.isArray && !this.isAny)(_templateObject24, this.schema.title || '', (0, _helpersJs._if)(this.isCollapsed)(_templateObject25), (0, _helpersJs._if)(!this.isCollapsed && this.schema.description)(_templateObject22, marked(this.schema.description || "")),

        (0, _helpersJs._if)(this.schema.required && !this.isCollapsed && this.options.isBodyParam != true)(_templateObject26, this.schema.required),
        (0, _helpersJs._if)(this.schema.required && !this.isCollapsed && this.options.isBodyParam == true)(_templateObject266, this.schema.required),

        (0, _helpersJs._if)(this.schema['default'] && !this.isCollapsed)(_templateObject27, this.schema['default']),(0, _helpersJs._if)(!this.isCollapsed)(_templateObject29),
        (0, _helpersJs._if)(!this.isCollapsed && this.schema.pattern)(_templateObject28, this.schema.pattern),
        (0, _helpersJs._if)(!this.isCollapsed && this.schema['enum'])(_templateObject16, this['enum'](this.schema, this.isCollapsed, this.open)), (0, _helpersJs._if)(this.schema.allOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'allOf')), (0, _helpersJs._if)(this.schema.oneOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'oneOf')), (0, _helpersJs._if)(this.schema.anyOf && !this.isCollapsed)(_templateObject17, this.xOf(this.schema, 'anyOf'))) + '\n').replace(/\s*\n/g, '\n').replace(/(\<\!\-\-).+/g, '').trim();
    }

    /*
     * Template for oneOf, anyOf and allOf
    */
  }, {
    key: 'xOf',
    value: function xOf(schema, type) {
      return '\n      <div class="inner ' + type + '">\n        <b>' + (0, _helpersJs.convertXOf)(type) + ':</b>\n      </div>\n    ';
    }

    /*
     * Template for enums
    */
  }, {
    key: 'enum',
    value: function _enum(schema, isCollapsed, open) {
      return '\n      ' + (0, _helpersJs._if)(!isCollapsed && schema['enum'])(_templateObject30) + '\n    ';
    }

    /*
     * Toggles the 'collapsed' state
    */
  }, {
    key: 'toggle',
    value: function toggle() {
      this.isCollapsed = !this.isCollapsed;
      this.render();
    }

    /*
     * Renders the element and returns it
    */
  }, {
    key: 'render',
    value: function render() {
      if (!this.element) {
        this.element = document.createElement('div');
        this.element.classList.add('json-schema-view');
      }

      if (this.isCollapsed) {
        this.element.classList.add('collapsed');
      } else {
        this.element.classList.remove('collapsed');
      }

      if (this.options.theme) {
        this.element.classList.add('json-schema-view-' + this.options.theme);
      }

      this.element.innerHTML = this.template();

      if (this.schema && this.schema.example) {
        var exampleDiv = document.createElement('div');
        exampleDiv.innerHTML = '<div style="display: block" class="example">\n          <span style="color: #808080" class="name">example: ' + this.schema.example + '</span>\n        </div>';
        this.element.appendChild(exampleDiv.querySelector('.example'));
      }

      if (!this.schema) {
        return this.element;
      }

      if (!this.isCollapsed) {
        this.appendChildren(this.element);
      }

      // add event listener for toggling
      if (this.element.querySelector('a.title')) {
        this.element.querySelector('a.title').addEventListener('click', this.toggle.bind(this));
      }
      return this.element;
    }

    /*
     * Appends children to given element based on current schema
    */
  }, {
    key: 'appendChildren',
    value: function appendChildren(element) {
      var _this2 = this;

      var inner = element.querySelector('.inner');

      if (!inner) {
        return;
      }

      if (this.schema['enum']) {
        var tempDiv = document.createElement('span');;
        tempDiv.classList.add('inner');
        tempDiv.innerHTML = '<code>' + this.schema['enum'].join('</code>, <code>') + '</code>';
        element.querySelector('.enums.inner').appendChild(tempDiv);
      }

      if (this.isArray) {
        var schemaItems = this.schema.items;
        if (this.schema.items.$ref) {
           var elements = this.schema.items.$ref.split('/');
           var schemaName = elements.pop();
           schemaItems = defs[schemaName];
        }
        var view = new JSONSchemaView(schemaItems, Infinity);
        inner.appendChild(view.render());
      }

      if (typeof this.schema.properties === 'object') {
        Object.keys(this.schema.properties).forEach(function (propertyName) {
          var property = _this2.schema.properties[propertyName];
          var tempDiv = document.createElement('div');;
          tempDiv.innerHTML = '<div class="property">\n          <span class="name">' + propertyName + ':</span>\n        </div>';
          var view = new JSONSchemaView(property, _this2.open - 1);
          tempDiv.querySelector('.property').appendChild(view.render());

          inner.appendChild(tempDiv.querySelector('.property'));
        });
      }

      if (this.schema.allOf) {
        appendXOf.call(this, 'allOf');
      }
      if (this.schema.oneOf) {
        appendXOf.call(this, 'oneOf');
      }
      if (this.schema.anyOf) {
        appendXOf.call(this, 'anyOf');
      }

      function appendXOf(type) {
        var _this3 = this;

        var innerAllOf = element.querySelector('.inner.' + type);

        this.schema[type].forEach(function (schema) {
          var inner = document.createElement('div');
          inner.classList.add('inner');
          var view = new JSONSchemaView(schema, _this3.open - 1);
          inner.appendChild(view.render());
          innerAllOf.appendChild(inner);
        });
      }
    }
  }]);

  return JSONSchemaView;
})();

exports['default'] = JSONSchemaView;
module.exports = exports['default'];

},{"./helpers.js":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9qYW1lc2hpL0Rlc2t0b3AvanNvbi1zY2hlbWEtdmlldy1qcy1tYXN0ZXIvc3JjL2hlbHBlcnMuanMiLCJDOi9Vc2Vycy9qYW1lc2hpL0Rlc2t0b3AvanNvbi1zY2hlbWEtdmlldy1qcy1tYXN0ZXIvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBSU4sU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQy9CLFNBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQ3JDOzs7Ozs7Ozs7Ozs7O0FBWU0sU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFO0FBQzdCLFNBQU8sU0FBUyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDbkM7O0FBQ0QsU0FBUyxLQUFLLEdBQUU7QUFDZCxTQUFPLEVBQUUsQ0FBQztDQUNYO0FBQ0QsU0FBUyxNQUFNLENBQUUsUUFBUSxFQUFrQjtvQ0FBYixXQUFXO0FBQVgsZUFBVzs7O0FBQ3ZDLFNBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBSztBQUN4RCxXQUFPLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0dBQzVDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDakI7OztBQzVCRCxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFPTixjQUFjOzs7Ozs7OztJQVFBLGNBQWM7Ozs7Ozs7Ozs7OztBQVd0QixXQVhRLGNBQWMsQ0FXckIsTUFBTSxFQUFFLElBQUks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LENBQUMsTUFBTSxFQUFFLE9BQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDakMsb0JBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO09BQ0o7S0FDRjs7O1NBOVZrQixjQUFjOzs7cUJBQWQsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG4vKlxuICogQ29udmVydHMgYW55T2YsIGFsbE9mIGFuZCBvbmVPZiB0byBodW1hbiByZWFkYWJsZSBzdHJpbmdcbiovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFhPZih0eXBlKSB7XG4gIHJldHVybiB0eXBlLnN1YnN0cmluZygwLCAzKSArICcgb2YnO1xufVxuXG4vKlxuICogaWYgY29uZGl0aW9uIGZvciBFUzYgdGVtcGxhdGUgc3RyaW5nc1xuICogdG8gYmUgdXNlZCBvbmx5IGluIHRlbXBsYXRlIHN0cmluZ1xuICpcbiAqIEBleGFtcGxlIG15c3RyID0gYFJhbmRvbSBpcyAke19pZihNYXRoLnJhbmRvbSgpID4gMC41KWBncmVhdGVyIHRoYW4gMC41YGBcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmRpdGlvblxuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIF9pZihjb25kaXRpb24pIHtcbiAgcmV0dXJuIGNvbmRpdGlvbiA/IG5vcm1hbCA6IGVtcHR5O1xufVxuZnVuY3Rpb24gZW1wdHkoKXtcbiAgcmV0dXJuICcnO1xufVxuZnVuY3Rpb24gbm9ybWFsICh0ZW1wbGF0ZSwgLi4uZXhwcmVzc2lvbnMpIHtcbiAgcmV0dXJuIHRlbXBsYXRlLnNsaWNlKDEpLnJlZHVjZSgoYWNjdW11bGF0b3IsIHBhcnQsIGkpID0+IHtcbiAgICByZXR1cm4gYWNjdW11bGF0b3IgKyBleHByZXNzaW9uc1tpXSArIHBhcnQ7XG4gIH0sIHRlbXBsYXRlWzBdKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbHMgSlNPTlNjaGVtYVZpZXcgKi9cblxuaW1wb3J0IHtcbiAgY29udmVydFhPZixcbiAgX2lmXG59IGZyb20gJy4vaGVscGVycy5qcyc7XG5cblxuLyoqXG4gKiBAY2xhc3MgSlNPTlNjaGVtYVZpZXdcbiAqXG4gKiBBIHB1cmUgSmF2YVNjcmlwdCBjb21wb25lbnQgZm9yIHJlbmRlcmluZyBKU09OIFNjaGVtYSBpbiBIVE1MLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTT05TY2hlbWFWaWV3IHtcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYSBUaGUgSlNPTiBTY2hlbWEgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3Blbj0xXSBoaXMgbnVtYmVyIGluZGljYXRlcyB1cCB0byBob3cgbWFueSBsZXZlbHMgdGhlXG4gICAqIHJlbmRlcmVkIHRyZWUgc2hvdWxkIGV4cGFuZC4gU2V0IGl0IHRvIGAwYCB0byBtYWtlIHRoZSB3aG9sZSB0cmVlIGNvbGxhcHNlZFxuICAgKiBvciBzZXQgaXQgdG8gYEluZmluaXR5YCB0byBleHBhbmQgdGhlIHRyZWUgZGVlcGx5XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLlxuICAgKiAgdGhlbWUge3N0cmluZ306IG9uZSBvZiB0aGUgZm9sbG93aW5nIG9wdGlvbnM6IFsnZGFyayddXG4gICovXG4gIGNvbnN0cnVjdG9yKHNjaGVtYSwgb3Blbiwgb3B0aW9ucyA9IHt0aGVtZTogbnVsbH0pIHtcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICB0aGlzLm9wZW4gPSBvcGVuO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IG9wZW4gPD0gMDtcblxuICAgIC8vIGlmIHNjaGVtYSBpcyBhbiBlbXB0eSBvYmplY3Qgd2hpY2ggbWVhbnMgYW55IEpPU05cbiAgICB0aGlzLmlzQW55ID0gdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICFBcnJheS5pc0FycmF5KHNjaGVtYSkgJiZcbiAgICAgICFPYmplY3Qua2V5cyhzY2hlbWEpXG4gICAgICAuZmlsdGVyKGs9PiBbJ3RpdGxlJywgJ2Rlc2NyaXB0aW9uJ10uaW5kZXhPZihrKSA9PT0gLTEpLmxlbmd0aDtcblxuICAgIC8vIERldGVybWluZSBpZiBhIHNjaGVtYSBpcyBhbiBhcnJheVxuICAgIHRoaXMuaXNBcnJheSA9ICF0aGlzLmlzQW55ICYmIHRoaXMuc2NoZW1hICYmIHRoaXMuc2NoZW1hLnR5cGUgPT09ICdhcnJheSc7XG5cbiAgICB0aGlzLmlzT2JqZWN0ID0gdGhpcy5zY2hlbWEgJiZcbiAgICAgICh0aGlzLnNjaGVtYS50eXBlID09PSAnb2JqZWN0JyB8fFxuICAgICAgIHRoaXMuc2NoZW1hLnByb3BlcnRpZXMgfHxcbiAgICAgICB0aGlzLnNjaGVtYS5hbnlPZiB8fFxuICAgICAgIHRoaXMuc2NoZW1hLm9uZW9mIHx8XG4gICAgICAgdGhpcy5zY2hlbWEuYWxsT2YpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIGEgc2NoZW1hIGlzIGEgcHJpbWl0aXZlXG4gICAgdGhpcy5pc1ByaW1pdGl2ZSA9ICF0aGlzLmlzQW55ICYmICF0aGlzLmlzQXJyYXkgJiYgIXRoaXMuaXNPYmplY3Q7XG5cbiAgICAvL1xuICAgIHRoaXMuc2hvd1RvZ2dsZSA9IHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uIHx8XG4gICAgICB0aGlzLnNjaGVtYS50aXRsZSB8fFxuICAgICAgKHRoaXMuaXNQcmltaXRpdmUgJiYgKFxuICAgICAgICB0aGlzLnNjaGVtYS5taW5pbXVtIHx8XG4gICAgICAgIHRoaXMuc2NoZW1hLm1heGltdW0gfHxcbiAgICAgICAgdGhpcy5zY2hlbWEuZXhjbHVzaXZlTWluaW11bSB8fFxuICAgICAgICB0aGlzLnNjaGVtYS5leGNsdXNpdmVNYXhpbXVtKVxuICAgICAgKTtcblxuICAgIC8vIHBvcHVsYXRlIGlzUmVxdWlyZWQgcHJvcGVydHkgZG93biB0byBwcm9wZXJ0aWVzXG4gICAgaWYgKHRoaXMuc2NoZW1hICYmIEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICB0aGlzLnNjaGVtYS5yZXF1aXJlZC5mb3JFYWNoKHJlcXVpcmVkUHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbcmVxdWlyZWRQcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhpcy5zY2hlbWEucHJvcGVydGllc1tyZXF1aXJlZFByb3BlcnR5XS5pc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJucyB0aGUgdGVtcGxhdGUgd2l0aCBwb3B1bGF0ZWQgcHJvcGVydGllcy5cbiAgICogVGhpcyB0ZW1wbGF0ZSBkb2VzIG5vdCBoYXZlIHRoZSBjaGlsZHJlblxuICAqL1xuICB0ZW1wbGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuc2NoZW1hKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIDwhLS0gQW55IC0tPlxuICAgICAgJHtfaWYodGhpcy5pc0FueSlgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnlcIj5cbiAgICAgICAgICAke19pZih0aGlzLnNob3dUb2dnbGUpYFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuIGNsYXNzPVwidG9nZ2xlLWhhbmRsZVwiPjwvc3Bhbj4ke3RoaXMuc2NoZW1hLnRpdGxlIHx8ICcnfSA8L2E+XG4gICAgICAgICAgYH1cblxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHlwZSB0eXBlLWFueVwiPiZsdDthbnkmZ3Q7PC9zcGFuPlxuXG4gICAgICAgICAgJHtfaWYodGhpcy5zY2hlbWEuZGVzY3JpcHRpb24gJiYgIXRoaXMuaXNDb2xsYXBzZWQpYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyIGRlc2NyaXB0aW9uXCI+JHt0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICBgfVxuXHRcdCBcblx0XHQgICR7X2lmKHRoaXMuc2NoZW1hLnJlcXVpcmVkICYmICF0aGlzLmlzQ29sbGFwc2VkKWBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lciByZXF1aXJlZFwiPlJlcXVpcmVkOiAke3RoaXMuc2NoZW1hLnJlcXVpcmVkfTwvZGl2PlxuICAgICAgICAgIGB9XG5cdFx0ICAke19pZih0aGlzLnNjaGVtYS5kZWZhdWx0ICYmICF0aGlzLmlzQ29sbGFwc2VkKWBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lciBkZWZhdWx0XCI+RGVmYXVsdDogJHt0aGlzLnNjaGVtYS5kZWZhdWx0fTwvZGl2PlxuICAgICAgICAgIGB9XG5cdFx0ICAgJHtfaWYodGhpcy5zY2hlbWEucGF0dGVybiAmJiAhdGhpcy5pc0NvbGxhcHNlZClgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXIgcGF0dGVyblwiPlBhdHRlcm46ICR7dGhpcy5zY2hlbWEucGF0dGVybn08L2Rpdj5cbiAgICAgICAgICBgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIGB9XG5cbiAgICAgIDwhLS0gUHJpbWl0aXZlIC0tPlxuICAgICAgJHtfaWYodGhpcy5pc1ByaW1pdGl2ZSlgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmltaXRpdmVcIj5cbiAgICAgICAgICAke19pZih0aGlzLnNob3dUb2dnbGUpYFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuIGNsYXNzPVwidG9nZ2xlLWhhbmRsZVwiPjwvc3Bhbj4ke3RoaXMuc2NoZW1hLnRpdGxlIHx8ICcnfSA8L2E+XG4gICAgICAgICAgYH1cblxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eXBlXCI+JHt0aGlzLnNjaGVtYS50eXBlfTwvc3Bhbj5cblxuICAgICAgICAgXG5cbiAgICAgICAgICAke19pZighdGhpcy5pc0NvbGxhcHNlZCAmJiB0aGlzLnNjaGVtYS5mb3JtYXQpYFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtYXRcIj4oJHt0aGlzLnNjaGVtYS5mb3JtYXR9KTwvc3Bhbj5cbiAgICAgICAgICBgfVxuXG4gICAgICAgICAgJHtfaWYoIXRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5zY2hlbWEubWluaW11bSlgXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhbmdlIG1pbmltdW1cIj5taW5pbXVtOiR7dGhpcy5zY2hlbWEubWluaW11bX08L3NwYW4+XG4gICAgICAgICAgYH1cblxuICAgICAgICAgICR7X2lmKCF0aGlzLmlzQ29sbGFwc2VkICYmIHRoaXMuc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0pYFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYW5nZSBleGNsdXNpdmVNaW5pbXVtXCI+KGV4KW1pbmltdW06JHt0aGlzLnNjaGVtYS5leGNsdXNpdmVNaW5pbXVtfTwvc3Bhbj5cbiAgICAgICAgICBgfVxuXG4gICAgICAgICAgJHtfaWYoIXRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5zY2hlbWEubWF4aW11bSlgXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhbmdlIG1heGltdW1cIj5tYXhpbXVtOiR7dGhpcy5zY2hlbWEubWF4aW11bX08L3NwYW4+XG4gICAgICAgICAgYH1cblxuICAgICAgICAgICR7X2lmKCF0aGlzLmlzQ29sbGFwc2VkICYmIHRoaXMuc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0pYFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYW5nZSBleGNsdXNpdmVNYXhpbXVtXCI+KGV4KW1heGltdW06JHt0aGlzLnNjaGVtYS5leGNsdXNpdmVNYXhpbXVtfTwvc3Bhbj5cbiAgICAgICAgICBgfVxuXG4gICAgICAgICAgJHtfaWYoIXRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5zY2hlbWEubWluTGVuZ3RoKWBcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmFuZ2UgbWluTGVuZ3RoXCI+bWluTGVuZ3RoOiR7dGhpcy5zY2hlbWEubWluTGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICBgfVxuXG4gICAgICAgICAgJHtfaWYoIXRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5zY2hlbWEubWF4TGVuZ3RoKWBcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmFuZ2UgbWF4TGVuZ3RoXCI+bWF4TGVuZ3RoOiR7dGhpcy5zY2hlbWEubWF4TGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICBgfVxuXG4gICAgICAgICAgJHtfaWYodGhpcy5zY2hlbWEuZGVzY3JpcHRpb24gJiYgIXRoaXMuaXNDb2xsYXBzZWQpYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyIGRlc2NyaXB0aW9uXCI+JHt0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICBgfVxuXHRcdCAgXG5cdFx0IFxuXHRcdCAgXG5cdFx0ICAgJHtfaWYodGhpcy5zY2hlbWEucmVxdWlyZWQgJiYgIXRoaXMuaXNDb2xsYXBzZWQpYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyIHJlcXVpcmVkXCI+UmVxdWlyZWQ8L2Rpdj5cbiAgICAgICAgICBgfVxuXHRcdCAgJHtfaWYodGhpcy5zY2hlbWEuZGVmYXVsdCAmJiAhdGhpcy5pc0NvbGxhcHNlZClgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXIgZGVmYXVsdFwiPkRlZmF1bHQ6ICR7dGhpcy5zY2hlbWEuZGVmYXVsdH08L2Rpdj5cbiAgICAgICAgICBgfVxuXHRcdCAgICR7X2lmKHRoaXMuc2NoZW1hLnBhdHRlcm4gJiYgIXRoaXMuaXNDb2xsYXBzZWQpYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyIHBhdHRlcm5cIj5QYXR0ZXJuOiAke3RoaXMuc2NoZW1hLnBhdHRlcm59PC9kaXY+XG4gICAgICAgICAgYH1cblxuICAgICAgICAgICR7X2lmKCF0aGlzLmlzQ29sbGFwc2VkICYmIHRoaXMuc2NoZW1hLmVudW0pYFxuICAgICAgICAgICAgJHt0aGlzLmVudW0odGhpcy5zY2hlbWEsIHRoaXMuaXNDb2xsYXBzZWQsIHRoaXMub3Blbil9XG4gICAgICAgICAgYH1cblxuICAgICAgICAgICR7X2lmKHRoaXMuc2NoZW1hLmFsbE9mICYmICF0aGlzLmlzQ29sbGFwc2VkKWAke3RoaXMueE9mKHRoaXMuc2NoZW1hLCAnYWxsT2YnKX1gfVxuICAgICAgICAgICR7X2lmKHRoaXMuc2NoZW1hLm9uZU9mICYmICF0aGlzLmlzQ29sbGFwc2VkKWAke3RoaXMueE9mKHRoaXMuc2NoZW1hLCAnb25lT2YnKX1gfVxuICAgICAgICAgICR7X2lmKHRoaXMuc2NoZW1hLmFueU9mICYmICF0aGlzLmlzQ29sbGFwc2VkKWAke3RoaXMueE9mKHRoaXMuc2NoZW1hLCAnYW55T2YnKX1gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIGB9XG5cblxuICAgICAgPCEtLSBBcnJheSAtLT5cbiAgICAgICR7X2lmKHRoaXMuaXNBcnJheSlgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnJheVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwidGl0bGVcIj48c3BhbiBjbGFzcz1cInRvZ2dsZS1oYW5kbGVcIj48L3NwYW4+JHt0aGlzLnNjaGVtYS50aXRsZSB8fCAnJ308c3BhbiBjbGFzcz1cIm9wZW5pbmcgYnJhY2tldFwiPls8L3NwYW4+JHtfaWYodGhpcy5pc0NvbGxhcHNlZClgPHNwYW4gY2xhc3M9XCJjbG9zaW5nIGJyYWNrZXRcIj5dPC9zcGFuPmB9PC9hPlxuICAgICAgICAgICR7X2lmKCF0aGlzLmlzQ29sbGFwc2VkICYmICh0aGlzLnNjaGVtYS51bmlxdWVJdGVtcyB8fCB0aGlzLnNjaGVtYS5taW5JdGVtcyB8fCB0aGlzLnNjaGVtYS5tYXhJdGVtcykpYFxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgPHNwYW4gdGl0bGU9XCJpdGVtcyByYW5nZVwiPigke3RoaXMuc2NoZW1hLm1pbkl0ZW1zIHx8IDB9Li4ke3RoaXMuc2NoZW1hLm1heEl0ZW1zIHx8ICfiiJ4nfSk8L3NwYW4+XG4gICAgICAgICAgICAke19pZighdGhpcy5pc0NvbGxhcHNlZCAmJiB0aGlzLnNjaGVtYS51bmlxdWVJdGVtcylgPHNwYW4gdGl0bGU9XCJ1bmlxdWVcIiBjbGFzcz1cInVuaXF1ZUl0ZW1zXCI+4pmmPC9zcGFuPmB9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIGB9XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAgICAgICAgICAke19pZighdGhpcy5pc0NvbGxhcHNlZCAmJiB0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbilgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7dGhpcy5zY2hlbWEuZGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgICAgICBgfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgJHtfaWYoIXRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5zY2hlbWEuZW51bSlgXG4gICAgICAgICAgICAke3RoaXMuZW51bSh0aGlzLnNjaGVtYSwgdGhpcy5pc0NvbGxhcHNlZCwgdGhpcy5vcGVuKX1cbiAgICAgICAgICBgfVxuXG4gICAgICAgICAgJHtfaWYodGhpcy5zY2hlbWEuYWxsT2YgJiYgIXRoaXMuaXNDb2xsYXBzZWQpYCR7dGhpcy54T2YodGhpcy5zY2hlbWEsICdhbGxPZicpfWB9XG4gICAgICAgICAgJHtfaWYodGhpcy5zY2hlbWEub25lT2YgJiYgIXRoaXMuaXNDb2xsYXBzZWQpYCR7dGhpcy54T2YodGhpcy5zY2hlbWEsICdvbmVPZicpfWB9XG4gICAgICAgICAgJHtfaWYodGhpcy5zY2hlbWEuYW55T2YgJiYgIXRoaXMuaXNDb2xsYXBzZWQpYCR7dGhpcy54T2YodGhpcy5zY2hlbWEsICdhbnlPZicpfWB9XG5cbiAgICAgICAgICAke19pZighdGhpcy5pc0NvbGxhcHNlZClgXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zaW5nIGJyYWNrZXRcIj5dPC9zcGFuPlxuICAgICAgICAgIGB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgYH1cblxuICAgICAgPCEtLSBPYmplY3QgLS0+XG4gICAgICAke19pZighdGhpcy5pc1ByaW1pdGl2ZSAmJiAhdGhpcy5pc0FycmF5ICYmICF0aGlzLmlzQW55KWBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm9iamVjdFwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwidGl0bGVcIj48c3BhblxuICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGUtaGFuZGxlXCI+PC9zcGFuPiR7dGhpcy5zY2hlbWEudGl0bGUgfHwgJyd9IDxzcGFuXG4gICAgICAgICAgICBjbGFzcz1cIm9wZW5pbmcgYnJhY2VcIj57PC9zcGFuPiR7X2lmKHRoaXMuaXNDb2xsYXBzZWQpYFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNsb3NpbmcgYnJhY2VcIiBuZy1pZj1cImlzQ29sbGFwc2VkXCI+fTwvc3Bhbj5cbiAgICAgICAgICBgfTwvYT5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAgICAgICAgJHtfaWYoIXRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke3RoaXMuc2NoZW1hLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgYH1cbiAgICAgICAgICAgIDwhLS0gY2hpbGRyZW4gZ28gaGVyZSAtLT5cblx0XHQgIFxuXHRcdCAgICR7X2lmKHRoaXMuc2NoZW1hLnJlcXVpcmVkICYmICF0aGlzLmlzQ29sbGFwc2VkKWBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXF1aXJlZFwiPkRlZmF1bHQgRmllbGRzOiAke3RoaXMuc2NoZW1hLnJlcXVpcmVkfTwvZGl2PlxuICAgICAgICAgIGB9XG5cdFx0ICAke19pZih0aGlzLnNjaGVtYS5kZWZhdWx0ICYmICF0aGlzLmlzQ29sbGFwc2VkKWBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWZhdWx0XCI+RGVmYXVsdDogJHt0aGlzLnNjaGVtYS5kZWZhdWx0fTwvZGl2PlxuICAgICAgICAgIGB9XG5cdFx0ICBcblx0XHRcdCR7X2lmKCF0aGlzLmlzQ29sbGFwc2VkICYmIHRoaXMuc2NoZW1hLnBhdHRlcm4pYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGF0dGVyblwiPlBhdHRlcm46ICR7dGhpcy5zY2hlbWEucGF0dGVybn08L2Rpdj5cbiAgICAgICAgICAgIGB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAke19pZighdGhpcy5pc0NvbGxhcHNlZCAmJiB0aGlzLnNjaGVtYS5lbnVtKWBcbiAgICAgICAgICAgICR7dGhpcy5lbnVtKHRoaXMuc2NoZW1hLCB0aGlzLmlzQ29sbGFwc2VkLCB0aGlzLm9wZW4pfVxuICAgICAgICAgIGB9XG5cbiAgICAgICAgICAke19pZih0aGlzLnNjaGVtYS5hbGxPZiAmJiAhdGhpcy5pc0NvbGxhcHNlZClgJHt0aGlzLnhPZih0aGlzLnNjaGVtYSwgJ2FsbE9mJyl9YH1cbiAgICAgICAgICAke19pZih0aGlzLnNjaGVtYS5vbmVPZiAmJiAhdGhpcy5pc0NvbGxhcHNlZClgJHt0aGlzLnhPZih0aGlzLnNjaGVtYSwgJ29uZU9mJyl9YH1cbiAgICAgICAgICAke19pZih0aGlzLnNjaGVtYS5hbnlPZiAmJiAhdGhpcy5pc0NvbGxhcHNlZClgJHt0aGlzLnhPZih0aGlzLnNjaGVtYSwgJ2FueU9mJyl9YH1cblxuICAgICAgICAgICR7X2lmKCF0aGlzLmlzQ29sbGFwc2VkKWBcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNsb3NpbmcgYnJhY2VcIj59PC9zcGFuPlxuICAgICAgICAgIGB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgYH1cbmAucmVwbGFjZSgvXFxzKlxcbi9nLCAnXFxuJykucmVwbGFjZSgvKFxcPFxcIVxcLVxcLSkuKy9nLCAnJykudHJpbSgpO1xuICB9XG5cbiAgLypcbiAgICogVGVtcGxhdGUgZm9yIG9uZU9mLCBhbnlPZiBhbmQgYWxsT2ZcbiAgKi9cbiAgeE9mKHNjaGVtYSwgdHlwZSkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXIgJHt0eXBlfVwiPlxuICAgICAgICA8Yj4ke2NvbnZlcnRYT2YodHlwZSl9OjwvYj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICAvKlxuICAgKiBUZW1wbGF0ZSBmb3IgZW51bXNcbiAgKi9cbiAgZW51bShzY2hlbWEsIGlzQ29sbGFwc2VkLCBvcGVuKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICR7X2lmKCFpc0NvbGxhcHNlZCAmJiBzY2hlbWEuZW51bSlgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lciBlbnVtc1wiPlxuICAgICAgICAgIDxiPkVudW06PC9iPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGB9XG4gICAgYDtcbiAgfVxuXG4gIC8qXG4gICAqIFRvZ2dsZXMgdGhlICdjb2xsYXBzZWQnIHN0YXRlXG4gICovXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gIXRoaXMuaXNDb2xsYXBzZWQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlbmRlcnMgdGhlIGVsZW1lbnQgYW5kIHJldHVybnMgaXRcbiAgKi9cbiAgcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdqc29uLXNjaGVtYS12aWV3Jyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNlZCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudGhlbWUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGBqc29uLXNjaGVtYS12aWV3LSR7dGhpcy5vcHRpb25zLnRoZW1lfWApO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKCk7XG5cbiAgICBpZiAoIXRoaXMuc2NoZW1hKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0NvbGxhcHNlZCkge1xuICAgICAgdGhpcy5hcHBlbmRDaGlsZHJlbih0aGlzLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciBmb3IgdG9nZ2xpbmdcbiAgICBpZiAodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EudGl0bGUnKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EudGl0bGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9XG5cbiAgLypcbiAgICogQXBwZW5kcyBjaGlsZHJlbiB0byBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIGN1cnJlbnQgc2NoZW1hXG4gICovXG4gIGFwcGVuZENoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICBjb25zdCBpbm5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlubmVyJyk7XG5cbiAgICBpZiAoIWlubmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NoZW1hLmVudW0pIHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBKU09ORm9ybWF0dGVyKHRoaXMuc2NoZW1hLmVudW0sIHRoaXMub3BlbiAtIDEpO1xuICAgICAgY29uc3QgZm9ybWF0dGVyRWwgPSBmb3JtYXR0ZXIucmVuZGVyKCk7XG4gICAgICBmb3JtYXR0ZXJFbC5jbGFzc0xpc3QuYWRkKCdpbm5lcicpO1xuICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZW51bXMuaW5uZXInKS5hcHBlbmRDaGlsZChmb3JtYXR0ZXJFbCk7XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0FycmF5KSB7XG4gICAgICBjb25zdCB2aWV3ID0gbmV3IEpTT05TY2hlbWFWaWV3KHRoaXMuc2NoZW1hLml0ZW1zLCB0aGlzLm9wZW4gLSAxKVxuICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQodmlldy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzID09PSAnb2JqZWN0Jykge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5zY2hlbWEucHJvcGVydGllcykuZm9yRWFjaChwcm9wZXJ0eU5hbWUgPT4ge1xuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgY29uc3QgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOztcbiAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInByb3BlcnR5XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCI+JHtwcm9wZXJ0eU5hbWV9Ojwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBKU09OU2NoZW1hVmlldyhwcm9wZXJ0eSwgdGhpcy5vcGVuIC0gMSk7XG4gICAgICAgIHRlbXBEaXYucXVlcnlTZWxlY3RvcignLnByb3BlcnR5JykuYXBwZW5kQ2hpbGQodmlldy5yZW5kZXIoKSk7XG5cbiAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQodGVtcERpdi5xdWVyeVNlbGVjdG9yKCcucHJvcGVydHknKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2hlbWEuYWxsT2YpIHsgYXBwZW5kWE9mLmNhbGwodGhpcywgJ2FsbE9mJyk7IH1cbiAgICBpZiAodGhpcy5zY2hlbWEub25lT2YpIHsgYXBwZW5kWE9mLmNhbGwodGhpcywgJ29uZU9mJyk7IH1cbiAgICBpZiAodGhpcy5zY2hlbWEuYW55T2YpIHsgYXBwZW5kWE9mLmNhbGwodGhpcywgJ2FueU9mJyk7IH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFhPZih0eXBlKSB7XG4gICAgICBjb25zdCBpbm5lckFsbE9mID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuaW5uZXIuJHt0eXBlfWApO1xuXG4gICAgICB0aGlzLnNjaGVtYVt0eXBlXS5mb3JFYWNoKHNjaGVtYSA9PiB7XG4gICAgICAgIGNvbnN0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGlubmVyLmNsYXNzTGlzdC5hZGQoJ2lubmVyJyk7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgSlNPTlNjaGVtYVZpZXcoc2NoZW1hLCB0aGlzLm9wZW4gLSAxKTtcbiAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQodmlldy5yZW5kZXIoKSk7XG4gICAgICAgIGlubmVyQWxsT2YuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (factory((global.ReactOutsideClickHandler = {}),global.React,global.PropTypes));
}(this, (function (exports,React,PropTypes) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var propTypes = {
    children: PropTypes.node,
    useCapture: PropTypes.bool,
    onOutsideClick: PropTypes.func
  };

  var defaultProps = {
    children: React.createElement('span', null),
    useCapture: true,
    onOutsideClick: function onOutsideClick() {}
  };

  var OutsideClickHandler = function (_React$Component) {
    _inherits(OutsideClickHandler, _React$Component);

    function OutsideClickHandler(props) {
      _classCallCheck(this, OutsideClickHandler);

      var _this = _possibleConstructorReturn(this, (OutsideClickHandler.__proto__ || Object.getPrototypeOf(OutsideClickHandler)).call(this, props));

      _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
      _this.setChildNode = _this.setChildNode.bind(_this);
      return _this;
    }

    _createClass(OutsideClickHandler, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, this.props.useCapture);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, this.props.useCapture);
      }
    }, {
      key: 'setChildNode',
      value: function setChildNode(ref) {
        this.childNode = ref;
      }
    }, {
      key: 'handleOutsideClick',
      value: function handleOutsideClick(e) {
        var isDescendantOfRoot = this.childNode.contains(e.target);
        if (!isDescendantOfRoot) {
          this.props.onOutsideClick(e);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { ref: this.setChildNode },
          this.props.children
        );
      }
    }]);

    return OutsideClickHandler;
  }(React.Component);

  OutsideClickHandler.propTypes = propTypes;
  OutsideClickHandler.defaultProps = defaultProps;

  exports.default = OutsideClickHandler;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

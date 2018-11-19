import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import objectValues from 'object.values';

const DISPLAY = {
  BLOCK: 'block',
  FLEX: 'flex',
  INLINE_BLOCK: 'inline-block',
};

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  useCapture: PropTypes.bool,
  display: PropTypes.oneOf(objectValues(DISPLAY)),
});

const defaultProps = {
  disabled: false,

  // `useCapture` is set to true by default so that a `stopPropagation` in the
  // children will not prevent all outside click handlers from firing - maja
  useCapture: true,
  display: DISPLAY.BLOCK,
};

export default class OutsideClickHandler extends React.Component {
  constructor(...args) {
    super(...args);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.downHandler = this.downHandler.bind(this);
    this.upHandler = this.upHandler.bind(this);
    this.setChildNodeRef = this.setChildNodeRef.bind(this);
  }

  componentDidMount() {
    const { disabled, useCapture } = this.props;

    if (!disabled) this.addDownEventListeners(useCapture);
  }

  componentWillReceiveProps({ disabled, useCapture }) {
    const { disabled: prevDisabled } = this.props;
    if (prevDisabled !== disabled) {
      if (disabled) {
        this.removeEventListeners();
      } else {
        this.addDownEventListeners(useCapture);
      }
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  // Use mousedown/mouseup or pointerdown/pointerup to enforce that clicks remain
  // outside the root's descendant tree, even when dragged. This should also get
  // triggered on touch devices.
  onMouseDown(e) {
    this.downHandler(e, 'removeMouseUp', 'mouseup', this.onMouseUp);
  }

  onPointerDown(e) {
    this.downHandler(e, 'removePointerUp', 'pointerup', this.onPointerUp);
  }

  // Use mousedown/mouseup or pointerdown/pointerup to enforce that clicks remain
  // outside the root's descendant tree, even when dragged. This should also get
  // triggered on touch devices.
  onMouseUp(e) {
    this.upHandler(e, 'removeMouseUp');
  }

  onPointerUp(e) {
    this.upHandler(e, 'removePointerUp');
  }

  setChildNodeRef(ref) {
    this.childNode = ref;
  }

  downHandler(e, removeUpHandlerName, eventName, callback) {
    const { useCapture } = this.props;

    const isDescendantOfRoot = this.childNode && this.childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      this[removeUpHandlerName] = addEventListener(
        document,
        eventName,
        callback,
        { capture: useCapture },
      );
    }
  }

  upHandler(e, removeUpHandlerName) {
    const { onOutsideClick } = this.props;

    const isDescendantOfRoot = this.childNode && this.childNode.contains(e.target);
    if (this[removeUpHandlerName]) this[removeUpHandlerName]();
    this[removeUpHandlerName] = null;

    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  }

  addDownEventListeners(useCapture) {
    this.removeMouseDown = addEventListener(
      document,
      'mousedown',
      this.onMouseDown,
      { capture: useCapture },
    );
    this.removePointerDown = addEventListener(
      document,
      'pointerdown',
      this.onPointerDown,
      { capture: useCapture },
    );
  }

  removeEventListeners() {
    if (this.removeMouseDown) this.removeMouseDown();
    if (this.removeMouseUp) this.removeMouseUp();
    if (this.removePointerDown) this.removePointerDown();
    if (this.removePointerUp) this.removePointerUp();
  }

  render() {
    const { children, display } = this.props;

    return (
      <div
        ref={this.setChildNodeRef}
        style={
          display !== DISPLAY.BLOCK && objectValues(DISPLAY).includes(display)
            ? { display }
            : undefined
        }
      >
        {children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

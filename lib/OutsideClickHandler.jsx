import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  useCapture: PropTypes.bool,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  useCapture: true,
  onOutsideClick() {},
};

class OutsideClickHandler extends React.Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('click', this.handleOutsideClick, this.props.useCapture);
    } else {
      document.attachEvent('onclick', this.handleOutsideClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('click', this.handleOutsideClick, this.props.useCapture);
    } else {
      document.detachEvent('onclick', this.handleOutsideClick);
    }
  }

  handleOutsideClick(e) {
    const isDescendantOfRoot = this.childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      this.props.onOutsideClick(e);
    }
  }

  render() {
    return (
      <div ref={(ref) => { this.childNode = ref; }}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;

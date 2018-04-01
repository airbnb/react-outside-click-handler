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
    this.setChildNode = this.setChildNode.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, this.props.useCapture);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, this.props.useCapture);
  }

  setChildNode(ref) {
    this.childNode = ref;
  }

  handleOutsideClick(e) {
    const isDescendantOfRoot = this.childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      this.props.onOutsideClick(e);
    }
  }

  render() {
    return (
      <div ref={this.setChildNode}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;

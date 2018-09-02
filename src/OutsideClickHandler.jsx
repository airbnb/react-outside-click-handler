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
    classWhiteList: PropTypes.string,
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
        this.setChildNodeRef = this.setChildNodeRef.bind(this);
    }

    componentDidMount() {
        const { disabled, useCapture } = this.props;

        if (!disabled) this.addMouseDownEventListener(useCapture);
    }

    componentWillReceiveProps({ disabled, useCapture }) {
        const { disabled: prevDisabled } = this.props;
        if (prevDisabled !== disabled) {
            if (disabled) {
                this.removeEventListeners();
            } else {
                this.addMouseDownEventListener(useCapture);
            }
        }
    }

    componentWillUnmount() {
        this.removeEventListeners();
    }

    // Use mousedown/mouseup to enforce that clicks remain outside the root's
    // descendant tree, even when dragged. This should also get triggered on
    // touch devices.
    onMouseDown(e) {
        const { useCapture } = this.props;

        const isDescendantOfRoot = this.childNode && this.childNode.contains(e.target);
        if (!isDescendantOfRoot) {
            this.removeMouseUp = addEventListener(
                document,
                'mouseup',
                this.onMouseUp,
                { capture: useCapture },
            );
        }
    }

    // Use mousedown/mouseup to enforce that clicks remain outside the root's
    // descendant tree, even when dragged. This should also get triggered on
    // touch devices.
    onMouseUp(e) {
        const { onOutsideClick, classWhiteList } = this.props;

        const isDescendantOfRoot = this.childNode && this.childNode.contains(e.target);
        let isChildOfWhitelistNode = false;

        if (classWhiteList) {
            let classWhiteListArr = classWhiteList.split(" ");

            classWhiteListArr.forEach(c => {

                isChildOfWhitelistNode = this.hasParentClass(e.target, c);

                if (isChildOfWhitelistNode) {
                    return;
                }
            });
        }

        if (this.removeMouseUp) this.removeMouseUp();
            this.removeMouseUp = null;

        if (!isDescendantOfRoot && !isChildOfWhitelistNode) {
            onOutsideClick(e);
        }
    }

    hasParentClass = (element, classname) => {
        if (element.className && element.className.split(' ').indexOf(classname) >= 0) {
            return true;
        }

        return element.parentNode && this.hasParentClass(element.parentNode, classname);
    }

    setChildNodeRef(ref) {
        this.childNode = ref;
    }

    addMouseDownEventListener(useCapture) {
        this.removeMouseDown = addEventListener(
            document,
            'mousedown',
            this.onMouseDown,
            { capture: useCapture },
        );
    }

    removeEventListeners() {
        if (this.removeMouseDown) this.removeMouseDown();
        if (this.removeMouseUp) this.removeMouseUp();
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

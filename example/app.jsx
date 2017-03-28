import cx from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import OutsideClickHandler from '../lib/OutsideClickHandler';

import './style.css';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
  }

  handleClick(bool) {
    this.setState({ active: bool });
  }

  render() {
    const boxClassNames = cx('Box', {
      'Box--active': this.state.active,
      'Box--inactive': !this.state.active,
    });

    return (
      <div className="Root">
        <OutsideClickHandler onOutsideClick={() => this.handleClick(false)}>
          <div className={boxClassNames}>
            Inside {this.state.active ? 'Active' : 'Inactive'}
            <button onClick={() => this.handleClick(true)}>Inside</button>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));

import cx from 'classnames';
import React from 'react';
import { hot } from 'react-hot-loader';

import OutsideClickHandler from 'react-outside-click-handler';

import './style.css';

class App extends React.Component {
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
    const className = cx('App', {
      'App--active': this.state.active,
      'App--inactive': !this.state.active,
    });

    return (
      <div className="App">
        <OutsideClickHandler onOutsideClick={() => this.handleClick(false)}>
          <div className={className}>
            Inside {this.state.active ? 'Active' : 'Inactive'}
            <button onClick={() => this.handleClick(true)}>Inside</button>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

export default hot(module)(App);

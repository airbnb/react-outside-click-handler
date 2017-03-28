import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import sinon from 'sinon';
import OutsideClickHandler from '../lib/OutsideClickHandler';

describe('<OutsideClickHandler />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(OutsideClickHandler.prototype, 'componentDidMount');
    mount(<OutsideClickHandler />);
    expect(OutsideClickHandler.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('simulates outside click events', () => {
    const onOutsideClick = sinon.spy();
    const components = (
      <div>
        <button id="outside-button" type="button">Outside Click Button</button>
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <ul>
            <li>react</li>
            <li>react-router</li>
            <li>redux</li>
            <li>immutable.js</li>
            <li>reselect</li>
          </ul>
        </OutsideClickHandler>
      </div>
    );

    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    const root = document.getElementById('root');
    ReactDOM.render(components, root);

    document.getElementById('outside-button').click();
    ReactDOM.unmountComponentAtNode(root);
    document.body.innerHTML = '';

    expect(onOutsideClick.calledOnce).to.equal(true);
  });

  it('calls componentWillUnmount', () => {
    sinon.spy(OutsideClickHandler.prototype, 'componentWillUnmount');
    const wrapper = mount(<OutsideClickHandler />);
    wrapper.unmount();
    expect(OutsideClickHandler.prototype.componentWillUnmount.calledOnce).to.equal(true);
  });
});

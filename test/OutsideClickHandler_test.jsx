import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow, mount } from 'enzyme';
import wrap from 'mocha-wrap';

import OutsideClickHandler from '../src/OutsideClickHandler';

describe('OutsideClickHandler', () => {
  describe('basics', () => {
    it('renders a div', () => {
      expect(shallow(<OutsideClickHandler />).is('div')).to.equal(true);
    });

    it('renders the children it‘s given', () => {
      const wrapper = shallow((
        <OutsideClickHandler>
          <section id="a" />
          <nav id="b" />
        </OutsideClickHandler>
      ));
      expect(wrapper.children().map(x => ({ type: x.type(), id: x.prop('id') }))).to.eql([
        { type: 'section', id: 'a' },
        { type: 'nav', id: 'b' },
      ]);
    });

    it('renders with the className it\'s given', () => {
      const wrapper = shallow((
        <OutsideClickHandler className="class-one">
          <section id="a" />
        </OutsideClickHandler>
      ));

      expect(wrapper.find('div').hasClass('class-one')).to.eql(true);
    });

    it('renders with the style it\'s given', () => {
      const wrapper = shallow((
        <OutsideClickHandler style={{ fontSize: 14 }}>
          <section id="a" />
        </OutsideClickHandler>
      ));

      expect(wrapper.find('div').props().style.fontSize).to.eql(14);
    });
  });

  describe('#onOutsideClick()', () => {
    const target = {};
    const event = { target };

    it('is a noop if `this.childNode` contains `e.target`', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<OutsideClickHandler onOutsideClick={spy} />);
      const instance = wrapper.instance();
      const contains = sinon.stub().returns(true);
      instance.childNode = { contains };

      instance.onMouseUp(event);

      expect(contains).to.have.property('callCount', 1);
      expect(contains.firstCall.args).to.eql([target]);
      expect(spy).to.have.property('callCount', 0);
    });

    describe('when `this.childNode` does not contain `e.target`', () => {
      it('calls onOutsideClick', () => {
        const spy = sinon.spy();
        const wrapper = shallow(<OutsideClickHandler onOutsideClick={spy} />);
        const instance = wrapper.instance();
        const contains = sinon.stub().returns(false);
        instance.childNode = { contains };

        instance.onMouseUp(event);

        expect(contains).to.have.property('callCount', 1);
        expect(contains.firstCall.args).to.eql([target]);
        expect(spy).to.have.property('callCount', 1);
        expect(spy.firstCall.args).to.eql([event]);
      });
    });
  });

  describe.skip('lifecycle methods', () => {
    wrap()
    .withOverride(() => document, 'attachEvent', () => sinon.stub())
    .describe('#componentDidMount', () => {
      let addEventListenerStub;
      beforeEach(() => {
        addEventListenerStub = sinon.stub(document, 'addEventListener');
      });

      it('document.addEventListener is called with `click` & onOutsideClick', () => {
        const wrapper = mount(<OutsideClickHandler />);
        const { onOutsideClick } = wrapper.instance();
        expect(addEventListenerStub.calledWith('click', onOutsideClick, true)).to.equal(true);
      });

      it('document.attachEvent is called if addEventListener is not available', () => {
        document.addEventListener = undefined;

        const wrapper = mount(<OutsideClickHandler />);
        const { onOutsideClick } = wrapper.instance();
        expect(document.attachEvent.calledWith('onclick', onOutsideClick)).to.equal(true);
      });
    });

    wrap()
    .withOverride(() => document, 'detachEvent', () => sinon.stub())
    .describe('#componentWillUnmount', () => {
      let removeEventListenerSpy;
      beforeEach(() => {
        removeEventListenerSpy = sinon.spy(document, 'removeEventListener');
      });

      it('document.removeEventListener is called with `click` and props.onOutsideClick', () => {
        const wrapper = mount(<OutsideClickHandler />);
        const { onOutsideClick } = wrapper.instance();

        wrapper.instance().componentWillUnmount();
        expect(removeEventListenerSpy.calledWith('click', onOutsideClick, true)).to.equal(true);
      });

      it('document.detachEvent is called if document.removeEventListener is not available', () => {
        document.removeEventListener = undefined;

        const wrapper = mount(<OutsideClickHandler />);
        const { onOutsideClick } = wrapper.instance();

        wrapper.instance().componentWillUnmount();
        expect(document.detachEvent.calledWith('onclick', onOutsideClick)).to.equal(true);
      });
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import OutsideClickHandler from '../lib/OutsideClickHandler';

describe('<OutsideClickHandler />', () => {
  describe('#render', () => {
    it('should match to snapshot when render by default', () => {
      const wrapper = shallow(<OutsideClickHandler />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('#componentDidMount', () => {
    it('should add click event listener to document', () => {
      const addEventListener = jest.spyOn(document, 'addEventListener');
      const wrapper = shallow(<OutsideClickHandler />);
      expect(addEventListener).toHaveBeenCalledTimes(1);
      expect(addEventListener).toHaveBeenCalledWith('click', wrapper.instance().handleOutsideClick, true);
      addEventListener.mockRestore();
    });
  });

  describe('#componentWillUnmount', () => {
    it('should remove click event listener to document', () => {
      const removeEventListener = jest.spyOn(document, 'removeEventListener');
      const wrapper = shallow(<OutsideClickHandler />);
      const { handleOutsideClick } = wrapper.instance();
      wrapper.unmount();
      expect(removeEventListener).toHaveBeenCalledTimes(1);
      expect(removeEventListener).toHaveBeenCalledWith('click', handleOutsideClick, true);
      removeEventListener.mockRestore();
    });
  });

  describe('#setChildNode', () => {
    it('should set childNode', () => {
      const ref = { value: 1 };
      const wrapper = shallow(<OutsideClickHandler />);
      wrapper.instance().setChildNode(ref);
      expect(wrapper.instance().childNode).toEqual(ref);
    });
  });

  describe('#handleOutsideClick', () => {
    it('should calls props.onOutsideClick when event target is not decendant of this.childNode', () => {
      const event = { target: null };
      const onOutsideClick = jest.fn();
      const wrapper = shallow(<OutsideClickHandler onOutsideClick={onOutsideClick} />);
      wrapper.instance().childNode = { contains() { return false; } };
      wrapper.instance().handleOutsideClick(event);
      expect(onOutsideClick).toHaveBeenCalledWith(event);
    });

    it('should not calls props.onOutsideClick when event target is decendant of this.childNode', () => {
      const event = { target: null };
      const onOutsideClick = jest.fn();
      const wrapper = shallow(<OutsideClickHandler onOutsideClick={onOutsideClick} />);
      wrapper.instance().childNode = { contains() { return true; } };
      wrapper.instance().handleOutsideClick(event);
      expect(onOutsideClick).not.toHaveBeenCalled();
    });
  });
});

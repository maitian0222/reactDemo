import React from 'react';
import NavTab from '../NavTab';
import { shallow } from 'enzyme';
import NavTabLayout from '../NavTabLayout';
import Icon from 'sinoui-components/Icon';
import NavContent from '../NavContent';

let onRequestClose;
let onClick;

beforeEach(() => {
  onRequestClose = jest.fn();
  onClick = jest.fn();
});

it('closable is false', () => {
  const wrapper = shallow(
    <NavTab
      zIndex={1}
      selected
      title="标签1"
      pageId="page1"
      closable={false}
      onRequestClose={onRequestClose}
      onClick={onClick}
    />,
  );

  expect(wrapper.find('span').text()).toBe('标签1');
  expect(wrapper.find(NavTabLayout).props().selected).toBe(true);
  expect(wrapper.find(NavTabLayout).props().zIndex).toBe(1);
  expect(wrapper.find(NavContent).props().selected).toBe(true);
  expect(wrapper.find(Icon).exists()).toBeFalsy();

  wrapper
    .find(NavTabLayout)
    .props()
    .onClick(null);

  expect(onClick).toBeCalledWith('page1');
});

it('closable is true', () => {
  const wrapper = shallow(
    <NavTab
      zIndex={1}
      selected
      title="标签1"
      pageId="page1"
      closable
      onRequestClose={onRequestClose}
      onClick={onClick}
    />,
  );

  expect(wrapper.find(Icon).exists()).toBeTruthy();

  const mockEvent: React.MouseEvent<HTMLElement> = {
    stopPropagation: jest.fn(),
    preventDefault: jest.fn(),
    // tslint:disable-next-line:no-any
  } as any;

  wrapper
    .find(Icon)
    .props()
    .onClick(mockEvent);

  expect(mockEvent.stopPropagation).toBeCalled();
  expect(mockEvent.preventDefault).toBeCalled();
  expect(onRequestClose).toBeCalledWith('page1');
});

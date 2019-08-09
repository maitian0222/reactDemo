import React from 'react';
import { shallow, mount } from 'enzyme';
import VisibleControl from '../VisibleControl';

it('不显示children', () => {
  const wrapper = shallow(
    <VisibleControl>
      <div>123</div>
    </VisibleControl>,
  );

  expect(wrapper.text()).toEqual('');
});

it('显示children', () => {
  const wrapper = shallow(
    <VisibleControl visible>
      <div>123</div>
    </VisibleControl>,
  );

  expect(wrapper.text()).toEqual('123');
});

it('从不可见变化到可见', () => {
  const wrapper = shallow(
    <VisibleControl>
      <div>123</div>
    </VisibleControl>,
  );

  wrapper.setProps({
    visible: true,
  });

  expect(wrapper.text()).toEqual('123');
});

it('从可见变化到不可见', () => {
  const wrapper = shallow(
    <VisibleControl visible>
      <div>123</div>
    </VisibleControl>,
  );

  wrapper.setProps({
    visible: false,
  });

  expect(wrapper.text()).toEqual('123');
});

it('在不可见时状态发生变化不会引起children重绘', () => {
  const mock = jest.fn();
  mock.mockReturnValue('123');
  class TestComp extends React.Component {
    public render() {
      return mock();
    }
  }
  const wrapper = mount(
    <VisibleControl visible>
      <TestComp />
    </VisibleControl>,
  );

  wrapper.setProps({
    visible: false,
  });

  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.state().frozen).toBe(true);

  wrapper.setProps({
    children: <TestComp />,
  });

  expect(mock).toHaveBeenCalledTimes(1);
  expect(wrapper.state().frozen).toBe(true);

  wrapper.setProps({
    visible: true,
  });

  expect(mock).toHaveBeenCalledTimes(2);
  expect(wrapper.state().frozen).toBe(false);
});

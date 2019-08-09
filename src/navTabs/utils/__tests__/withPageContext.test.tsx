import React from 'react';
import PageContextType from '../../types/PageContextType';
import { createMemoryHistory } from 'history';
import PageStack from '../../services/PageStack';
import routes from '../../containers/__tests__/pagetestroutes';
import { mount } from 'enzyme';

function getWithPageContextWithContext(context: PageContextType) {
  jest.doMock('../../containers/PageContext', () => ({
    Consumer: ({ children }) => children(context),
  }));

  return require('../withPageContext').default;
}

it('with page context', () => {
  const history = createMemoryHistory();
  const pageStack = new PageStack(routes);
  const withPageContext = getWithPageContextWithContext({ history, pageStack });
  const MockComp = jest.fn();
  MockComp.mockReturnValue('MockComp');

  const WithPageContextComponent = withPageContext(MockComp);

  const wrapper = mount(<WithPageContextComponent test="123" />);

  expect(wrapper.text()).toBe('MockComp');
  expect(MockComp.mock.calls[0][0].history).toBe(history);
  expect(MockComp.mock.calls[0][0].pageStack).toBe(pageStack);
  expect(MockComp.mock.calls[0][0].test).toBe('123');
});

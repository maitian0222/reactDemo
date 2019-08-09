import React from 'react';
import PageContext from '../containers/PageContext';
import PageContextType from '../types/PageContextType';
import hoistNonReactStatics from 'hoist-non-react-statics';

/**
 * 给组件添加上页面上下文
 *
 * @param Component
 */
export default function withPageContext(
  UnwrapperComponent: React.ComponentType<PageContextType>,
) {
  class WithPageContext extends React.Component {
    public static readonly displayName = `withPageContext(${
      UnwrapperComponent.displayName
    })`;
    public static readonly UnwrapperComponent = UnwrapperComponent;

    public render() {
      return (
        <PageContext.Consumer>
          {(context) => <UnwrapperComponent {...this.props} {...context} />}
        </PageContext.Consumer>
      );
    }
  }

  return hoistNonReactStatics(WithPageContext, UnwrapperComponent);
}

import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

/**
 * 给组件添加上页面上下文
 *
 * @param Component
 */
export default function withOnePageContext(
  UnwrapperComponent: React.ComponentType,
) {
  class WithOnePageContext extends React.Component {
    public static readonly displayName = `WithOnePageContext(${
      UnwrapperComponent.displayName
    })`;
    public static readonly UnwrapperComponent = UnwrapperComponent;
    public static contextTypes = {
      router: PropTypes.object.isRequired,
      page: PropTypes.object.isRequired,
      currentPage: PropTypes.object.isRequired,
    };

    public render() {
      return <UnwrapperComponent {...this.props} {...this.context} />;
    }
  }

  return hoistNonReactStatics(WithOnePageContext, UnwrapperComponent);
}

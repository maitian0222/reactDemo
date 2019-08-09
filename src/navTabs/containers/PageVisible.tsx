import React from 'react';
import PropTypes from 'prop-types';

/**
 * 页面可见时或者不在页面上下文中时显示子组件的组件
 *
 * @export
 * @class PageVisible
 * @extends {React.Component}
 */
export default class PageVisible extends React.Component {
  public static contextTypes = {
    page: PropTypes.object.isRequired,
  };

  public render() {
    if (!this.context.page || !this.context.page.hidden) {
      return React.Children.only(this.props.children);
    }

    return null;
  }
}

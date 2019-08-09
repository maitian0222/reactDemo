import React from 'react';
import PropTypes from 'prop-types';
import { History } from 'history';
import Page from '../types/Page';

interface Props {
  page: Page;
  currentPage: Page;
  history: History;
}

export default class PageStateProvider extends React.Component<Props> {
  public static childContextTypes = {
    router: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    currentPage: PropTypes.object.isRequired,
  };

  public getChildContext() {
    return {
      router: {
        history: this.props.history,
        route: this.props.page,
      },
      page: this.props.page,
      currentPage: this.props.currentPage,
    };
  }

  public render() {
    return React.Children.only(this.props.children);
  }
}

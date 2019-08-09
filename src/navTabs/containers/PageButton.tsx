import React from 'react';
import shallowEqual from '@newoa/utils/shallowEqual';
import PageStatus from '../services/PageStatus';

export interface Props {
  icon: string;
  title: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default class PageButton extends React.Component<Props> {
  private removeButton: () => void;

  public componentDidMount() {
    this.removeButton = PageStatus.instance.addPageButton(
      PageStatus.instance.currentPageId,
      this.props,
    );
  }

  public componentDidUpdate(prevProps: Props) {
    // if (!shallowEqual(prevProps, this.props, ['title', 'icon'])) {
    //   this.removeButton();
    //   this.removeButton = PageStatus.instance.addPageButton(
    //     PageStatus.instance.currentPageId,
    //     this.props,
    //   );
    // }
  }

  public componentWillUnmount() {
    if (this.removeButton) {
      this.removeButton();
    }
  }

  public render() {
    return null;
  }
}

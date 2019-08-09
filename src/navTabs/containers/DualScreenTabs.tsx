import React from 'react';
import PageButton from './PageButton';
interface TabsProps {
  [propName: string]: any;
}
const BIG_SIZE_SCREEN_WIDTH = 1440;
interface Props extends TabsProps {
  changeSingle?: (single: boolean) => void;
}
export interface State {
  single: boolean;
}

/**
 * 双屏多标签组件
 *
 * @export
 * @class DualScreenTabs
 * @extends {React.Component<TabsProps>}
 */
export default class DualScreenTabs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const single =
      typeof props.single === 'boolean'
        ? props.single
        : document.body.clientWidth <= BIG_SIZE_SCREEN_WIDTH;

    this.state = {
      single,
    };
  }

  private onExpandButtonClick = () => {
    this.setState({
      single: !this.state.single,
    });
    if (this.props.changeSingle) {
      this.props.changeSingle(!this.state.single);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <PageButton
          title={this.state.single ? '展开' : '收缩'}
          icon={this.state.single ? 'fullscreen' : 'fullscreen_exit'}
          onClick={this.onExpandButtonClick}
        />
        <div>tab</div>
      </React.Fragment>
    );
  }
}

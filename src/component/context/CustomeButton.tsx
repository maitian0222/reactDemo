import * as React from 'react';
import { Button } from 'antd';
import ThemeContext from '../config';

/**
 * 声明周期钩子函数中访问 context的值
 * @class CustomButton
 * @extends {React.PureComponent}
 */
class CustomButton extends React.PureComponent {
  public componentWillReceiveProps(nextProps) {
    alert(JSON.stringify(nextProps.theme));
  }

  public render() {
    const { toggleTheme, theme } = this.props;
    return (
      <Button
        type="primary"
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        改变主题色
      </Button>
    );
  }
}
export default (props) => (
  <ThemeContext.Consumer>
    {({ theme, toggleTheme }) => (
      <CustomButton {...props} theme={theme} toggleTheme={toggleTheme} />
    )}
  </ThemeContext.Consumer>
);

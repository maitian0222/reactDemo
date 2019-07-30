import * as React from 'react';
import { Button } from 'antd';
import withTheme from '../hoc/withTheme';
export const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};

import { BaseThemeContex as ThemeContext } from '../config';
export default class ThemeHoc extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };
  }

  public onToggleTheme() {
    this.setState((prevState) => {
      return {
        theme: prevState.theme === themes.dark ? themes.light : themes.dark,
      };
    });
  }
  public render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <ToolBar onChangeTheme={() => this.onToggleTheme()} />
      </ThemeContext.Provider>
    );
  }
}

function ToolBar(props) {
  return <HocThemeButton onClick={props.onChangeTheme} />;
}

function ThemeButton(props) {
  const { theme } = props;
  return (
    <Button
      type="primary"
      {...props}
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
      }}
    >
      改变主题色
    </Button>
  );
}

const HocThemeButton = withTheme(ThemeButton);

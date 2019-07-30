import * as React from 'react';
import { Button } from 'antd';

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

const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
}); // 默认值;
export default class BaseThemeContextt extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };
  }

  public toggleTheme = () => {
    this.setState((prevState) => {
      return {
        theme: prevState.theme === themes.dark ? themes.light : themes.dark,
      };
    });
  };
  public render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <ToolBar />
      </ThemeContext.Provider>
    );
  }
}

function ToolBar(props) {
  return <ThemeButton />;
}

function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </ThemeContext.Consumer>
  );
}

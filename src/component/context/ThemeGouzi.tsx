import * as React from 'react';
import CustomeButton from './CustomeButton';

import ThemeContex, { THEMES } from '../config';
export default class BaseThemeContext extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: THEMES.light,
      toggleTheme: this.toggleTheme,
    };
  }

  public toggleTheme = () => {
    this.setState((prevState) => {
      return {
        theme: prevState.theme === THEMES.dark ? THEMES.light : THEMES.dark,
      };
    });
  };
  public render() {
    return (
      <ThemeContex.Provider value={this.state}>
        <ToolBar />
      </ThemeContex.Provider>
    );
  }
}

function ToolBar(props) {
  return <CustomeButton />;
}

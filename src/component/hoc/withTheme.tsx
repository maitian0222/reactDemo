import * as React from 'react';
import { BaseThemeContex as ThemeContext } from '../config';
export default function withTheme(Comp: React.ReactType) {
  return class extends React.Component {
    public render() {
      return (
        <ThemeContext.Consumer>
          {(theme) => <Comp {...this.props} theme={{ ...theme }} />}
        </ThemeContext.Consumer>
      );
    }
  };
}

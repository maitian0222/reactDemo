import * as React from 'react';
const THEMES = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};

const ThemeContex = React.createContext({
  theme: THEMES.dark,
  toggleTheme: () => {},
}); // 默认值;

const BaseThemeContex = React.createContext({
  theme: THEMES.dark,
});

export default ThemeContex;
export { THEMES, BaseThemeContex };

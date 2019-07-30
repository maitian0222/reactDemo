import * as React from 'react';
import { Button } from 'antd';
// 只要当组件所处的树中没有匹配到 Provider 时，其defaultValue参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
const ThemeContext = React.createContext('light');
export default class BaseThemeContextt extends React.PureComponent {
  public render() {
    return (
      <ThemeContext.Provider value="dark">
        <ToolBar />
      </ThemeContext.Provider>
    );
  }
}

function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <Button {...props} type="primary">
          {theme}
        </Button>
      )}
    </ThemeContext.Consumer>
  );
}

function ToolBar() {
  return <ThemeButton />;
}

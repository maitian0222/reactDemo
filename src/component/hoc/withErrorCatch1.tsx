import * as React from 'react';

/**
 * 使用高阶组件捕获异常
 * @param Com
 * @param message
 * 使用方式 withErrorCatch(Main, '数据加载错误！');
 */
export default function withErrorCatch(Com, message: string) {
  return class Component extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        errorMessage: '',
      };
    }

    public componentDidCatch(error: any) {
      if (error) {
        this.setState({
          error: true,
          errorMessage: `${error}`,
        });
      }
    }

    public render() {
      return this.state.error ? (
        <div>{message || this.state.errorMessage}</div>
      ) : (
        <Com {...this.props} />
      );
    }
  };
}

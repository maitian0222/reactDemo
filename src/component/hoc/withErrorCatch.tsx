import * as React from 'react';

/**
 *
 * @param message 使用高阶组件捕获组件异常
 * 使用方式 withErrorCatch('数据加载错误！')(Main)
 */
export default function withErrorCatch(message: string) {
  return function createComponent(Com) {
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
  };
}

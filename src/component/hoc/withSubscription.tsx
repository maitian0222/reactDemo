import * as React from 'react';

const data = [
  {
    id: 1,
    title: 'immmutability Helper 实现不可变的数据结构。',
    content: 'immutability Helper apis',
  },
  {
    id: 2,
    title: 'React Context',
    content: 'context 被用来共享那些对于一个组件树而言是全局的数据。',
  },
  {
    id: 3,
    title: 'HOC 高阶组件',
    content:
      '是react中对组件逻辑进行重用的高级模式、并不是react api 而是一种模式。',
  },
];
const DataSource = {
  getComments: () => {
    return data;
  },
  getBlogPost: (value) => {
    return data.find((item) => item.id === value);
  },
};
export default function withSubscription(WrappedComponent, selectedData) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        list: selectedData(DataSource, props),
      };
    }

    public render() {
      return <WrappedComponent data={this.state.list} {...this.props} />;
    }
  };
}

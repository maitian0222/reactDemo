import * as React from 'react';
import withSubscription from './withSubscription';
import { Typography } from 'antd';
function BlogPost(props) {
  return <Typography.Text>{props.data.content}</Typography.Text>;
}
export default withSubscription(BlogPost, (Datasource, props) =>
  Datasource.getBlogPost(props.value),
);

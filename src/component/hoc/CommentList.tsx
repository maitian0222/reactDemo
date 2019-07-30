import * as React from 'react';
import withSubscription from './withSubscription';
import { List, Typography } from 'antd';
function CommentList(props) {
  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>文章列表</h3>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={props.data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[标题]</Typography.Text> {item.title}
          </List.Item>
        )}
      />
    </div>
  );
}
export default withSubscription(CommentList, (Datasource) =>
  Datasource.getComments(),
);

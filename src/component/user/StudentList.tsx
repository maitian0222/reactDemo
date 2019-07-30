import * as React from 'react';
import { useState } from 'react';
import { Table, Divider, Button, Form, Input } from 'antd';
import useRestList from './useRestList';
export default function StudentList() {
  const dataSource = useRestList('/test/student/list');
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <div>
        <Form layout="inline">
          <Form.Item>
            <Input
              name="name"
              placeholder="姓名"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                dataSource.filterList(searchValue);
              }}
            >
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Button
          onClick={() =>
            dataSource.addItem({
              id: new Date().getTime(),
              name: '赵一',
            })
          }
        >
          新增
        </Button>
      </div>
      {dataSource.error ? (
        <div>数据加载失败</div>
      ) : (
        <Table
          rowKey="id"
          dataSource={dataSource.dataList}
          loading={dataSource.loading}
          columns={[
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              dataIndex: 'opr',
              key: 'opr',
              render: (value, item, index) => {
                return (
                  <div>
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        dataSource.updateItem({
                          ...item,
                          name: `张${index}`,
                        });
                      }}
                    >
                      修改
                    </a>
                    <Divider type="vertical" />
                    <a
                      href="javascript:;"
                      onClick={(e) => {
                        dataSource.removeItem(item.id);
                      }}
                    >
                      删除
                    </a>
                  </div>
                );
              },
            },
          ]}
        />
      )}
    </>
  );
}

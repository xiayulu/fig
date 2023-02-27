import React from 'react';
import { Button, Empty, Popconfirm, Space, Table, Tag } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useGetJobListQuery, useDeleteJobMutation } from "./api";
import { Job } from './types';


export interface Props {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditJob: React.Dispatch<React.SetStateAction<Job | undefined>>
}

export default function (props: Props) {
  const { data, error, isLoading } = useGetJobListQuery();

  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation()
  const columns: ColumnsType<Job> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.split(":").map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" disabled={isDeleting} icon={<EditOutlined />} onClick={() => {
            props.setEditJob(record);
            props.setEditOpen(true);
          }} />
          <Popconfirm
            title="Delete"
            description={`确定要删除 ${record.name} 吗?`}
            onConfirm={() => {
              deleteJob(record._id);
            }}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" disabled={isDeleting} icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  if (isLoading) return <div>Loading...</div>
  if (!data) return <Empty />

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
      />
    </div>
  )
}

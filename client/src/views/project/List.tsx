import React from 'react';
import { Button, Empty, Popconfirm, Space, Table, Tag } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useGetProjectListQuery, useDeleteProjectMutation } from "./api";
import { Project } from './types';
import dayjs from "dayjs";
import ListItem from './ListItem';


export interface Props {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditProject: React.Dispatch<React.SetStateAction<Project | undefined>>
}

export default function (props: Props) {
  const { data, error, isLoading } = useGetProjectListQuery();

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation()
  const columns: ColumnsType<Project> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Start',
      dataIndex: 'from',
      render: (_, { from }) => <span>{dayjs(from).format("YYYY-MM")}</span>
    },
    {
      title: 'End',
      dataIndex: 'to',
      render: (_, { to }) => <span>{dayjs(to).format("YYYY-MM")}</span>
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Detail',
      render: (_, { details }) => {
        return (
          <ul>
            {details.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" disabled={isDeleting} icon={<EditOutlined />} onClick={() => {
            props.setEditProject(record);
            props.setEditOpen(true);
          }} />
          <Popconfirm
            title="Delete"
            description={`确定要删除 ${record.name} 吗?`}
            onConfirm={() => {
              deleteProject(record._id);
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
    <div className='w-720px'>
      <h3>项目经历</h3>
      {data.map(item => {
        return (
          <div key={item._id}>
            <ListItem item={item} />
            <div className='mt-2'>
              <Button
                type="primary"
                className='mr-4'
                disabled={isDeleting}
                icon={<EditOutlined />}
                onClick={() => {
                  props.setEditProject(item);
                  props.setEditOpen(true);
                }} />
              <Popconfirm
                title="Delete"
                description={`确定要删除 ${item.name} 吗?`}
                onConfirm={() => {
                  deleteProject(item._id);
                }}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" disabled={isDeleting} icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          </div>
        )
      })}
    </div>
    // <Table
    //   columns={columns}
    //   dataSource={data}
    //   rowKey={(record) => record._id}
    // />
  )
}
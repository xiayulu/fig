import React from 'react';
import { Button, Empty, List, Popconfirm, Skeleton } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useGetEmployeeListQuery, useDeleteEmployeeMutation } from "./api";
import { Employee } from './types';
import ListItem from './ListItem';


export interface Props {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>
}

export default function (props: Props) {
  const { data, error, isLoading } = useGetEmployeeListQuery();
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  if (isLoading) return <div>Loading...</div>
  if (!data) return <Empty />

  return (
    <div className='w-720px'>
      <h3 className='font-bold'>基本信息</h3>
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
                  props.setEditEmployee(item);
                  props.setEditOpen(true);
                }} />
              <Popconfirm
                title="Delete"
                description={`确定要删除 ${item.name} 吗?`}
                onConfirm={() => {
                  deleteEmployee(item._id);
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
      })
      }
    </div>
  )
}

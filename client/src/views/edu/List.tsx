import React from 'react';
import { Button, Empty, List, Popconfirm, Skeleton } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useGetEduListQuery, useDeleteEduMutation } from "./api";
import { Edu } from './types';
import ListItem from './ListItem';

export interface Props {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditEdu: React.Dispatch<React.SetStateAction<Edu | undefined>>
}

export default function (props: Props) {
  const { data, error, isLoading } = useGetEduListQuery();
  const [deleteEdu, { isLoading: isDeleting }] = useDeleteEduMutation();

  if (isLoading) return <div>Loading...</div>
  if (!data) return <Empty />

  return (
    <div className='w-720px'>
      <h3>教育背景</h3>
      {data.map(item => {
        return <div key={item._id}>
          <ListItem item={item} />
          <div className='mt-2'>
            <Button
              type="primary"
              className='mr-4'
              disabled={isDeleting}
              icon={<EditOutlined />}
              onClick={() => {
                props.setEditEdu(item);
                props.setEditOpen(true);
              }} />
            <Popconfirm
              title="Delete"
              description={`确定要删除 ${item.school} 吗?`}
              onConfirm={() => {
                deleteEdu(item._id);
              }}
              onCancel={() => { }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" disabled={isDeleting} icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </div>
      })}
    </div>
  )
}

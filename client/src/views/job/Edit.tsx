import React from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCreateJobMutation, useUpdateJobMutation } from "./api"
import { Job, MutateJobForm } from './types';
import Search from 'antd/es/input/Search';

const cityOptions = [
  { value: '广州', label: '广州' },
  { value: '武汉', label: '武汉' },
];

export interface Props {
  job?: Job,
  open: boolean,
  setEditJob: React.Dispatch<React.SetStateAction<Job | undefined>>,
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function (props: Props) {
  const [createJob, { isLoading: isCreating },] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue({
      name: props.job?.name || "",
      detail: props.job?.detail || "",
      address: props.job?.address || cityOptions[0].value,
      tags: props.job?.tags || "",
    });
  }, [props.job]);

  const handleOk = () => {
    props.setEditOpen(false);
  };

  const handleCancel = () => {
    props.setEditOpen(false);
  };

  const onFinish = (values: MutateJobForm) => {
    if (props.job) {
      updateJob({ _id: props.job._id, ...values });
      props.setEditOpen(false);
    } else {
      createJob(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.error(`表单验证错误}`);
  };

  return (
    <>
      {contextHolder}
      <div className="flex mb-4">
        <Search
          placeholder="input search text"
          onSearch={(value) => { message.info("还未实现"); }}
          enterButton
          className='w-240px'
        />
        <Button type="primary" onClick={() => {
          props.setEditJob(undefined);
          props.setEditOpen(true);
        }} className="ml-auto">
          添加
        </Button>
      </div>
      <Modal title="编辑岗位" footer={null} open={props.open} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="岗位名称"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="岗位描述"
            name="detail"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="岗位地域">
            <Input.Group compact>
              <Form.Item
                name='address'
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="Select province" options={cityOptions}>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="岗位标签"
            name="tags"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className='mr-4'>
              提交
            </Button>
            <Button type="primary" onClick={() => { handleCancel() }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
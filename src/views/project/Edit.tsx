import React from 'react';
import { Button, Form, Input, List, message, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DatePicker } from 'antd';
import { useCreateProjectMutation, useUpdateProjectMutation } from "./api"
import { Project, CreateForm } from './types';
import { CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from "dayjs"

const { RangePicker } = DatePicker;

export interface FormModel {
  name: string
  role: string
  range: [Dayjs, Dayjs]
}


export interface Props {
  project?: Project,
  open: boolean,
  setEditProject: React.Dispatch<React.SetStateAction<Project | undefined>>,
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function (props: Props) {
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [details, setDetails] = useState<string[]>([]);
  const [detail, setDetail] = useState<string>("");

  useEffect(() => {
    form.setFieldsValue({
      name: props.project?.name || "",
      range: [dayjs(props.project?.from), dayjs(props.project?.to)],
      role: props.project?.role || "",
    });
    setDetails(props.project?.details || []);
  }, [props.project]);

  const onFinish = (values: FormModel) => {
    let form: CreateForm = {
      name: values.name,
      role: values.role,
      from: values.range[0].toISOString(),
      to: values.range[1].toISOString(),
      details
    }

    if (props.project) {
      updateProject({ _id: props.project._id, ...form });
      props.setEditOpen(false);
    } else {
      createProject(form);
    }
  };


  return (
    <>
      {contextHolder}
      <div className="flex mb-4">
        <Button type="primary" onClick={() => {
          props.setEditProject(undefined);
          props.setEditOpen(true);
        }}>
          添加
        </Button>
      </div>
      <Modal
        title="编辑项目经验"
        width={800}
        footer={null}
        open={props.open}
        onCancel={() => props.setEditOpen(false)}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={(errorInfo: any) => {
            messageApi.error(`表单验证错误}`);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: 'Required.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="项目时间"
            name="range"
            rules={[{ required: true, message: 'Required.' }]}
          >
            <RangePicker picker="month" />
          </Form.Item>
          <Form.Item
            label="职位角色"
            name='role'
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          {details.length > 0 && <Form.Item label="描述要点">
            <List
              dataSource={details}
              renderItem={(item, idx) => (
                <List.Item
                  actions={[<CloseOutlined onClick={() => setDetails(details.filter((_, index) => index !== idx))} />]}
                >
                  {item}
                </List.Item>
              )}
            />
          </Form.Item>}

          <Form.Item
            label="项目描述"
          >
            <div>
              <Form.Item name="detail" noStyle>
                <TextArea rows={2} onChange={(e) => { setDetail(e.target.value) }} />
              </Form.Item>
              <div className="flex mt-2">
                <Button onClick={(e) => {
                  if (detail.length > 0) {
                    setDetails([...details, detail]);
                    setDetail("");
                    form.setFieldValue("detail", "");
                  }
                }} type="primary" className='ml-auto'>添加</Button>
              </div>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className='mr-4'>
              提交
            </Button>
            <Button type="primary" onClick={() => props.setEditOpen(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
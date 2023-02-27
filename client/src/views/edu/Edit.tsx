import React from 'react';
import { Button, Form, message, Modal, } from 'antd';
import { useCreateEduMutation, useUpdateEduMutation } from "./api"
import { Edu, CreateForm } from './types';
import FormX from '@/ui/FormX';
import type { Field } from '@/ui/FormX';
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";


export interface Props {
  edu?: Edu,
  open: boolean,
  setEditEdu: React.Dispatch<React.SetStateAction<Edu | undefined>>,
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface FormModel {
  school: string
  subject: string
  score: string
  range: [Dayjs, Dayjs]
  course: string
}

export default function (props: Props) {
  const [createEdu, { isLoading: isCreating },] = useCreateEduMutation();
  const [updateEdu, { isLoading: isUpdating }] = useUpdateEduMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue({
      school: props.edu?.school || "",
      subject: props.edu?.subject || "",
      score: props.edu?.score || "",
      course: props.edu?.course || "",
      range: [dayjs(props.edu?.from), dayjs(props.edu?.to)],
    });
  }, [props.edu]);


  const fields: Field[] = [
    {
      label: "毕业学校",
      name: "school",
      type: "text",
      rules: [{ required: true, message: 'Required.' }],
    },
    {
      label: "学习专业",
      name: "subject",
      type: "text",
      rules: [{ required: true, message: 'Required.' }],
    },
    {
      label: "学习时间",
      name: "range",
      type: "timerange",
      rules: [{ required: true, message: 'Required.' }],
      attrs: {
        picker: "month",
      }
    },
    {
      label: "学习成绩",
      name: "score",
      type: "text",
      rules: [{ required: true, message: 'Required.' }],
    },
    {
      label: "主修课程",
      name: "course",
      type: "text",
      rules: [{ required: true, message: 'Required.' }]
    },
  ]

  const onFinish = (values: FormModel) => {
    let form: CreateForm = {
      school: values.school,
      subject: values.subject,
      score: values.score,
      from: values.range[0].toISOString(),
      to: values.range[0].toISOString(),
      course: values.course
    }
    if (props.edu) {
      updateEdu({ _id: props.edu._id, ...form });
    } else {
      createEdu(form);
    }
    props.setEditOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="flex mb-4">
        <Button type="primary" onClick={() => {
          props.setEditEdu(undefined);
          props.setEditOpen(true);
        }}>
          添加
        </Button>
      </div>
      <Modal
        title="编辑基本信息"
        footer={null}
        open={props.open}
        onCancel={() => { props.setEditOpen(false) }}>
        <FormX
          form={form}
          fields={fields}
          onFinish={onFinish}
          onFinishFailed={(errorInfo: any) => {
            messageApi.error(`表单验证错误}`);
          }}
          onCancel={() => { props.setEditOpen(false) }}
        />
      </Modal>
    </>
  );
};
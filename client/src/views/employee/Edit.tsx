import React from 'react';
import { Button, Form, message, Modal, } from 'antd';
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from "./api"
import { Employee, CreateForm } from './types';
import FormX from '@/ui/FormX';
import type { Field } from '@/ui/FormX';


export interface Props {
  employee?: Employee,
  open: boolean,
  setEditEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>,
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function (props: Props) {
  const [createEmployee, { isLoading: isCreating },] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue({
      name: props.employee?.name || "",
      age: props.employee?.age || 18,
      exp: props.employee?.exp || 3,
      phone: props.employee?.phone || "",
      email: props.employee?.email || "",
      job: props.employee?.job || "",
      city: props.employee?.city || "",
      salary: props.employee?.salary || "",
      sex: props.employee?.sex || true,
    });
  }, [props.employee]);


  const fields: Field[] = [
    {
      label: "姓名",
      name: "name",
      type: "text",
      rules: [{ required: true, message: 'Required.' }],
    },
    {
      label: "年龄",
      name: "age",
      type: "number",
      rules: [{ required: true, message: 'Required.' }],
      attrs: {
        min: 16,
        max: 60
      }
    },
    {
      label: "性别",
      name: "sex",
      type: "radio",
      rules: [{ required: true, message: 'Required.' }],
      attrs: {
        options: [{ value: true, label: "男" }, { value: false, label: "女" }]
      }
    },

    {
      label: "工龄",
      name: "exp",
      type: "number",
      rules: [{ required: true, message: 'Required.' }],
      attrs: {
        min: 1,
        max: 60
      }
    },
    {
      label: "手机",
      name: "phone",
      type: "tel",
      rules: [{ required: true, message: 'Required.' }, { pattern: /^1[3456789]\d{9}$/, message: "11 位手机号" }]
    },
    {
      label: "邮箱",
      name: "email",
      type: "email",
      rules: [{ required: true, message: 'Required.' }]
    },
    {
      label: "照片链接",
      name: "avatar",
      type: "url",
      rules: [{ required: true, message: 'Required.' }]
    },
    {
      label: "意向岗位",
      name: "job",
      type: "text",
      rules: [{ required: true, message: 'Required.' }]
    },
    {
      label: "意向城市",
      name: "city",
      type: "text",
      rules: [{ required: true, message: 'Required.' }]
    },
    {
      label: "意向薪资",
      name: "salary",
      type: "text",
      rules: [{ required: true, message: 'Required.' }]
    },
  ]

  const onFinish = (values: CreateForm) => {
    if (props.employee) {
      updateEmployee({ _id: props.employee._id, ...values });
    } else {
      createEmployee(values);
    }
    props.setEditOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="flex mb-4">
        <Button type="primary" onClick={() => {
          props.setEditEmployee(undefined);
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
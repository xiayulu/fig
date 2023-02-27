import React from 'react';
import { Button, DatePicker, Form, FormInstance, Input, InputNumber, Modal, Radio, Select, TimePicker } from 'antd';
import { Rule } from 'antd/es/form';
import TextArea from 'antd/es/input/TextArea';


export interface Field {
  label: string
  name: string
  type: string
  rules?: Rule[]
  attrs?: any
}

export interface Props {
  fields: Field[]
  form?: FormInstance
  initialValues?: object
  labelCol?: object
  wrapperCol?: object
  onFinish?: (values: any) => void
  onFinishFailed?: (value: any) => void
  onCancel?: (value: any) => void
}

function ChooseFiled(field: Field) {
  switch (field.type) {
    case "select":
      return <Select {...field.attrs} />
    case "number":
      return <InputNumber {...field.attrs} />
    case "textarea":
      return <TextArea {...field.attrs} />
    case "radio":
      return <Radio.Group {...field.attrs}>
        {field.attrs?.options?.map((op: any) => {
          <Radio value={op.value} key={op.value}>{op.label}</Radio>
        })}
      </Radio.Group>
    case "date":
      return <DatePicker {...field.attrs} />
    case "time":
      return <TimePicker {...field.attrs} />
    case "timerange":
      return <DatePicker.RangePicker {...field.attrs} />
    default:
      return <Input type={field.type} {...field.attrs} />
  }
}

export default function (props: Props) {
  return (
    <Form
      name="basic"
      form={props.form}
      labelCol={props.labelCol ?? { span: 6 }}
      wrapperCol={props.wrapperCol ?? { span: 16 }}
      initialValues={props.initialValues}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      autoComplete="off"
    >
      {props.fields.map(item => {
        return <Form.Item
          label={item.label}
          name={item.name}
          rules={item.rules}
          key={item.name}
        >
          {ChooseFiled(item)}
        </Form.Item>
      })}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button key="submit" htmlType="submit" type="primary">
          确认
        </Button>,
        <Button key="back" onClick={props.onCancel}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
}
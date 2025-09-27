"use client";

import React from "react";
import { useState, useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Spin } from "antd";

import '@ant-design/v5-patch-for-react-19';

type FieldType = {
  fullname?: string;
  email?: string;
  password1?: string;
  password2?: string;  
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const RegisterForm: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className=" flex items-center justify-center h-[100vh]">
        {<Spin size="large" />}
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center h-[100vh] w-full">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 400,
          width: "100%",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        variant="filled"
      >
        <Form.Item<FieldType>
          label="FullName"
          name="fullname"
          rules={[{ required: true, message: "Please input your FullName!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input type="email" /> 
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password1"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password2"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item
          label={null}
     
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
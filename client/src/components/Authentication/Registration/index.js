import React from 'react';
import { Form, Input, Button } from 'antd';
import { request } from '../../../api/authentication';


const Registration = () => {
   const [form] = Form.useForm();

   const onFinish = async(values) => {
      const { username, password } = values;
      const data = await request('register', {username, password});
      if (data && data.message === 'User created.') {
         form.setFieldsValue({username: '', password: ''});
      }      
      form.setFieldsValue({password: ''});
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Form
         form={form}
         style={{marginTop: "1rem"}}
         name="basic"
         initialValues={{
            remember: true
         }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
      >
         <Form.Item
            label="Username"
            name="username"
            rules={[
               {
                  required: true,
                  message: 'Please input your username!'
               }
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item
            label="Password"
            name="password"
            rules={[
               {
                  required: true,
                  message: 'Please input your password!'
               }
            ]}
         >
            <Input.Password />
         </Form.Item>

         <Form.Item >
            <Button
               type="primary"
               htmlType="submit"
            >
               Register
        </Button>
         </Form.Item>
      </Form>
   );
};

export default Registration;

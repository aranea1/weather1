import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { request } from '../../../api/authentication';
import { AuthContext } from '../../../context/AuthContext';


const Login = () => {

   const [form] = Form.useForm();
   const { login } = useContext(AuthContext);

   const onFinish = async (values) => {
      const { username, password } = values;
      const data = await request('login', { username, password });
      if (data && data.token) {
         login(data);
         form.setFieldsValue({ username: '' });
      }
      form.setFieldsValue({ password: '' });
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Form
         form={form}
         style={{ marginTop: "1rem" }}
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
               Log in
            </Button>
         </Form.Item>
      </Form>
   );
};

export default Login;

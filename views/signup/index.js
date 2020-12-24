import { useState } from 'react'
import { useRouter } from 'next/router'
import md5 from 'md5'
import fetch from 'node-fetch'

import { Layout, Form, Input, Button, Checkbox, Image, Avatar, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const { Content } = Layout

const Login = () => {
  // const router = useRouter()

  const onFinish = async (values) => {
    console.log(values.username)
    console.log(values.password)
  }

  return (
    <Layout>
      <Content className='login-content'>
        <div id='login-img' />
        <div>
          <div className='login-main'>
            <div className='login-avatar'>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <Form
              className='login-form'
              name='normal_login'
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: '用户名错误！'
                  }
                ]}
              >
                <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='用户名' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: '密码错误！'
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='密码'
                />
              </Form.Item>
              <Form.Item style={{ margin: '0px' }}>

                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>

              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default Login

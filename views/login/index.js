import { useState } from 'react'
import { useRouter } from 'next/router'
import md5 from 'md5'
import fetch from 'node-fetch'

import { Layout, Form, Input, Button, Checkbox, Image, Avatar } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const { Content } = Layout

const Login = () => {
  const [state, setState] = useState(true)
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      const test = await fetch('/api/restaurant/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: md5(values.password)
        })
      }).then(states => states.json())
      if (test.state) {
        setState(true)
        router.push('../home')
      } else {
        setState(false)
      }
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <Layout>
      <Content className='login-content'>
        <div id='login-img' />
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
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              {!state && (<p className='login-form-forgot'>用户名或者密码错误</p>)}

              {/* <a className='login-form-forgot' href=''>
                忘记密码
              </a> */}
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default Login

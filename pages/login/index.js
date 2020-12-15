import { Layout, Form, Input, Button, Checkbox, Image } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const { Content } = Layout

const Login = () => {
  const onFinish = (values) => {
    console.log('用户名: ', values.username)
    console.log('密码: ', values.password)
  }

  return (
    <Layout>
      <Content className='login-content'>
        <div id='login-img' />
        <div className='login-main'>
          <div className='login-avatar'>
            <Image src='/jllogo.jpg' width='100px' height='100px' />
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
                  message: 'Please input your Username!'
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
                  message: 'Please input your Password!'
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

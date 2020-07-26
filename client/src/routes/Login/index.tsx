import React from "react";
import { connect } from "react-redux";
import actions from "@/store/actions/profile";
import { Link, RouteComponentProps } from "react-router-dom";
import NavHeader from "@/components/Nav";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import "./index.less";
import { CombinedState } from "@/store/reducers";
import { ProfileState } from "@/store/reducers/profile";
import { LoginPayload } from "@/typings/user";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params {}
type Props = RouteComponentProps<Params> &
  StateProps &
  DispatchProps &
  FormComponentProps<LoginPayload>;

function Register(props: Props) {
  const onFinish = (values: any) => {
    props.login(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };  
  return (
    <>
      <NavHeader history={props.history}>用户登录</NavHeader>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
    </Form>
    </>
  );
}
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Register);
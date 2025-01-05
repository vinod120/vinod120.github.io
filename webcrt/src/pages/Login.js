import React from "react";
import {
  Button,
  Checkbox,
  Col,
  Row,
  theme,
  Typography,
  Input,
  message,
  Form,
  Image,
  Flex,
} from "antd";
import { useMediaQuery } from "react-responsive";
import constants from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginAdminUser } from "../api/authService";
import useApi from "../customHooks/useApi";

const { Title, Text, Link } = Typography;

const Login = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const { login } = useAuth();

  const { data: user, loading, error, callApi } = useApi(loginAdminUser);

  const onFinish = async (values) => {
    console.log("Success:", values);
    // await callApi(values);
    if (true) {
      message.open({
        type: "success",
        content: "Login successful",
      });
      navigate(user?.role === "SuperAdmin" ? "/masters/region" : "/masters/region");
      login(user);
    }
    if (error) {
      message.open({
        type: "error",
        content: "Login unsuccessful",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("error info", errorInfo)
    message.open({
      type: "error",
      content: "Login unsuccessful",
    });
  };

  return (
    <Row style={{ minHeight: isMobile ? "auto" : "100vh", overflow: "hidden" }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: "100%", padding: "1rem" }}
        >
          <Image preview={false} src="https://placehold.co/400" width={100} height={100} style={{borderRadius: '50%'}} />
          <Title level={2} className="text-white">
            Welcome back to {constants?.projectName}
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
           {constants?.projectDescription}
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? "center" : "flex-start"}
          justify="center"
          gap="middle"
          style={{ height: "100%", padding: "2rem" }}
        >
          <Title className="m-0">Login</Title>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              email: '',
              password: '',
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Continue
                </Button>
                <Link href="/">Forgot password?</Link>
              </Flex>
            </Form.Item>
          </Form>
          {error && <p style={{ color: 'red' }}>Login failed: {error}</p>}
        </Flex>
      </Col>
    </Row>
  );
};

export default Login;

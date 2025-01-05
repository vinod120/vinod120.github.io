import React, { useReducer, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Row,
  Col,
  Card,
  Spin,
  Alert,
} from "antd";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Helmet } from "react-helmet-async";
import { HomeOutlined } from "@ant-design/icons";
import {
  fetchAllRegions,
  fetchZonesByRegion,
  createNewBranch,
  fetchStates,
} from "../../api/authService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const initialState = {
  regions: [],
  zones: [],
  states: [],
  loading: false,
  error: null,
  branchCode: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_REGIONS":
      return { ...state, regions: action.payload };
    case "SET_ZONES":
      return { ...state, zones: action.payload };
    case "SET_STATES":
      return { ...state, states: action.payload };
    case "SET_BRANCH_CODE":
      return { ...state, branchCode: action.payload };
    default:
      return state;
  }
}

const BranchCreation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { regions, zones, states, loading, error, branchCode } = state;

  useEffect(() => {
    fetchRegionsAndStates();
  }, []);

  const fetchRegionsAndStates = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const [regionsResponse, statesResponse] = await Promise.all([
        fetchAllRegions(),
        fetchStates(),
      ]);
      dispatch({ type: "SET_REGIONS", payload: regionsResponse?.data });
      dispatch({ type: "SET_STATES", payload: statesResponse?.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch regions or states" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const generateBranchCode = () => {
    const timestamp = Date.now().toString();
    const code = `BRC${timestamp.slice(-3)}`;
    dispatch({ type: "SET_BRANCH_CODE", payload: code });
    form.setFieldsValue({ branchCode: code });
  };

  const handleRegionChange = async (regionId) => {
    generateBranchCode();
    dispatch({ type: "CLEAR_ERROR" });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetchZonesByRegion(regionId);
      if (response?.data?.length === 0) {
        dispatch({ type: "SET_ZONES", payload: [] });
        form.setFieldsValue({ zone: undefined });
        message.warning("No zones available for the selected region");
      } else {
        dispatch({ type: "SET_ZONES", payload: response.data });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch zones" });
      form.setFieldsValue({ zone: undefined });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handleFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await createNewBranch(values);
      message.success("Branch created successfully!");
      form.resetFields();
      dispatch({ type: "CLEAR_ERROR" });
      navigate("masters/branch-list");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      message.error(errorMessage);
      if (err.response?.data?.details) {
        err.response.data.details.forEach((detail) => {
          message.error(detail);
        });
      }
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Branches | Vitta Prabha</title>
      </Helmet>
      <PageHeader
        title="Branch Dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Branches</span>
              </>
            ),
            path: "/branch-list",
          },
          {
            title: "Branch Creation",
          },
        ]}
      />
      <Card title="Create New Branch" bordered={false} style={{ margin: "20px" }}>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ branchCode }}
          >
           
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Region"
                  name="region"
                  rules={[
                    { required: true, message: "Please select a region" },
                  ]}
                >
                  <Select
                    placeholder="Select Region"
                    onChange={handleRegionChange}
                    loading={loading}
                  >
                    {regions?.map((region) => (
                      <Option key={region._id} value={region._id}>
                        {region.regionName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Zone"
                  name="zone"
                  rules={[{ required: true, message: "Please select a zone" }]}
                >
                  <Select
                    placeholder="Select Zone"
                    loading={loading}
                    allowClear
                    value={zones.length === 0 ? undefined : null}
                  >
                    {zones.length === 0 ? (
                      <Option disabled>No zones available</Option>
                    ) : (
                      zones.map((zone) => (
                        <Option key={zone._id} value={zone._id}>
                          {zone.zoneName}
                        </Option>
                      ))
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Branch Code"
                  name="branchCode"
                  rules={[
                    { required: true, message: "Branch code is required" },
                  ]}
                >
                  <Input value={branchCode} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Branch Name"
                  name="branchName"
                  rules={[
                    { required: true, message: "Please enter branch name" },
                  ]}
                >
                  <Input placeholder="Enter Branch Name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Branch Login"
              name="branchLogin"
              rules={[{ required: true, message: "Please enter branch login" }]}
            >
              <Input placeholder="Enter Branch Login" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter the password" },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Enter Password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm the password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The passwords do not match")
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea placeholder="Enter Address" />
          </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="State" name="state">
                  <Select placeholder="Select State">
                    {states?.map((state) => (
                      <Option key={state._id} value={state.name}>
                        {state.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="City" name="city">
                  <Input placeholder="Enter City" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Postal / Zip Code" name="postalCode">
                  <Input placeholder="Enter Postal Code" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={() => form.resetFields()}
                style={{ marginLeft: 10 }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default BranchCreation;

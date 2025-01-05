import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, Spin, Row, Col } from "antd";
import {
  fetchAllRegions,
  fetchZonesByRegion,
  fetchStates,
  updateBranch,
} from "../../api/authService";

const { Option } = Select;

const EditBranch = ({ visible, branchData, onClose, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [regions, setRegions] = React.useState([]);
  const [zones, setZones] = React.useState([]);
  const [states, setStates] = React.useState([]);

  useEffect(() => {
    if (visible) {
      fetchInitialData();
      populateForm(); // Pre-fill form with branch data
    }
  }, [visible]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [regionsRes, statesRes] = await Promise.all([
        fetchAllRegions(),
        fetchStates(),
      ]);
      setRegions(regionsRes.data);
      setStates(statesRes.data);
    } catch (err) {
      message.error("Failed to fetch initial data.");
    } finally {
      setLoading(false);
    }
  };

  const populateForm = () => {
    form.setFieldsValue({
      ...branchData,
      region: branchData?.region?._id,
      zone: branchData?.zone?._id,
      password: branchData?.password || "",
      confirmPassword: branchData?.confirmPassword || "",
    });
    if (branchData?.region) {
      handleRegionChange(branchData?.region?._id); // Load zones for the region
    }
  };

  const handleRegionChange = async (regionId) => {
    setLoading(true);
    try {
      const response = await fetchZonesByRegion(regionId);
      setZones(response.data);
    } catch (err) {
      message.error("Failed to fetch zones for the selected region.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (values) => {
    if (values.password && values.password !== values.confirmPassword) {
      message.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { password, confirmPassword, ...updatedData } = values;
      await updateBranch(branchData._id, updatedData);
      message.success("Branch updated successfully!");
      onUpdate(); // Refresh the branch list
      onClose(); // Close the modal
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update branch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Branch"
      visible={visible}
      centered
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={loading}
        >
          Save Changes
        </Button>,
      ]}
      width={800} // Increased modal width
      bodyStyle={{ maxHeight: "600px", overflowY: "auto" }} // Scrollable content
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {/* Branch Code */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Branch Code"
                name="branchCode"
                rules={[{ required: true, message: "Branch code is required" }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          {/* Branch Name and Login */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Branch Name"
                name="branchName"
                rules={[{ required: true, message: "Please enter branch name" }]}
              >
                <Input placeholder="Enter Branch Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Branch Login"
                name="branchLogin"
                rules={[{ required: true, message: "Please enter branch login" }]}
              >
                <Input placeholder="Enter Branch Login" />
              </Form.Item>
            </Col>
          </Row>

          {/* Region and Zone */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Region"
                name="region"
                rules={[{ required: true, message: "Please select a region" }]}
              >
                <Select
                  placeholder="Select Region"
                  onChange={handleRegionChange}
                >
                  {regions.map((region) => (
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
                <Select placeholder="Select Zone">
                  {zones.map((zone) => (
                    <Option key={zone._id} value={zone._id}>
                      {zone.zoneName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* State and City */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please select a state" }]}
              >
                <Select placeholder="Select State">
                  {states.map((state) => (
                    <Option key={state._id} value={state.name}>
                      {state.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter city" }]}
              >
                <Input placeholder="Enter City" />
              </Form.Item>
            </Col>
          </Row>

          {/* Postal Code and Address */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[{ required: true, message: "Please enter postal code" }]}
              >
                <Input placeholder="Enter Postal Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter the address" }]}
              >
                <Input.TextArea placeholder="Enter Address" rows={3} />
              </Form.Item>
            </Col>
          </Row>

          {/* Password and Confirm Password */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
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
                hasFeedback
                rules={[
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
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditBranch;

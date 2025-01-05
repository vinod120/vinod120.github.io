import React, { useState } from "react";
import { Form, Input, Button, Select, Alert, message, Spin } from "antd";
import { createNewZone } from "../../api/authService";

const { Option } = Select;

const ZonalCreation = ({ existingZones = [], regions = [], refreshData }) => {
  const [form] = Form.useForm();
  const [zoneCode, setZoneCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  // Generate Zone Code
  const generateZoneCode = () => {
    const timestamp = Date.now(); // Current timestamp
    const lastThreeDigits = timestamp.toString().slice(-3); // Get the last 3 digits
    return `ZNE${lastThreeDigits}`; // Prefix with ZNE
  };

  const handleRegionChange = (regionId) => {
    const newZoneCode = generateZoneCode(); // Generate a new zone code
    setZoneCode(newZoneCode);
    form.setFieldsValue({ zoneCode: newZoneCode });
  };

  const handleCreateZone = async (values) => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      await createNewZone(values);
      message.success("Zone created successfully!");
      refreshData(); // Refresh parent data
      form.resetFields();
      setZoneCode(""); // Reset zone code
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage); // Set the error message
    } finally {
      setLoading(false);
    }
  };

  // Check if a region is already assigned (exists in existingZones)
  const isRegionDisabled = (regionId) =>
    existingZones.some((zone) => zone.region === regionId);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleCreateZone}
        layout="vertical"
        initialValues={{ zoneCode, zoneName: "" }}
      >
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Form.Item
          label="Region"
          name="region"
          rules={[{ required: true, message: "Please select a region" }]}
        >
          <Select
            placeholder="Select Region"
            onChange={handleRegionChange}
          >
            {regions?.map((region) => (
              <Option
                key={region._id}
                value={region._id}
                disabled={isRegionDisabled(region._id)} // Disable assigned regions
              >
                {region.regionName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Zone Code"
          name="zoneCode"
          rules={[{ required: true, message: "Zone code is required" }]}
        >
          <Input value={zoneCode} disabled />
        </Form.Item>

        <Form.Item
          label="Zone Name"
          name="zoneName"
          rules={[{ required: true, message: "Please enter zone name" }]}
        >
          <Input placeholder="Enter Zone Name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Zone
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ZonalCreation;

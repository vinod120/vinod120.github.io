import React, { useState } from "react";
import { Card, Form, Input, Button, Select, Alert, message, Spin, Tooltip } from "antd";
import { createNewRegion } from "../../api/authService";

const RegionCreation = ({
  regions = [], // List of available regions
  existingRegions = [], // List of already created regions
  loading: parentLoader,
  onRegionCreated,
}) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [regionCode, setRegionCode] = useState(""); // State for region code

  // Handle region selection and generate region code
  const handleRegionChange = (value) => {
    const selectedRegion = regions.find((region) => region.name === value);
    if (selectedRegion) {
      const newRegionCode = `${selectedRegion?.state_code}${selectedRegion?.state_code_in_numeric}`;
      const formattedRegionName = `${selectedRegion?.state_code}-${selectedRegion?.name}`;
      setRegionCode(newRegionCode); // Update state
      form.setFieldsValue({ regionCode: newRegionCode, regionName: formattedRegionName }); // Sync with form
    }
  };

  // Check if the region is already created
  const isRegionDisabled = (regionName) => {
    return existingRegions.some((existing) => existing.regionName === regionName);
  };

  // Submit form and create a new region
  const handleSubmit = async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await createNewRegion(values);
      if (response.status === 201 && response.data) {
        message.success("Region created successfully");
        onRegionCreated(); // Trigger refresh in parent
        form.resetFields();
        setRegionCode(""); // Reset region code
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while creating the region"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Region">
      <Spin spinning={loading || parentLoader}>
        {errorMessage && (
          <Tooltip title={errorMessage} placement="top">
            <Alert message={errorMessage} type="error" style={{ marginBottom: "16px" }} />
          </Tooltip>
        )}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Region Name"
            name="regionName"
            rules={[{ required: true, message: "Please select a region name" }]}
          >
            <Select
              placeholder="Select Region"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleRegionChange}
            >
              {regions?.map((region) => (
                <Select.Option
                  key={region?.state_code}
                  value={region?.name}
                  disabled={isRegionDisabled(region?.name)} // Disable already created regions
                >
                  {`${region?.state_code} - ${region?.name}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Region Code"
            name="regionCode"
            rules={[{ required: true, message: "Please enter the region code" }]}
          >
            <Input value={regionCode} disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading || parentLoader}>
              {loading || parentLoader ? "Loading..." : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default RegionCreation;

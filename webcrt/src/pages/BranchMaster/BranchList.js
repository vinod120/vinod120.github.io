import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Row,
  Col,
  Card,
  Spin,
  Alert,
  Tooltip,
  Modal,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import PageHeader from "../../components/PageHeader/PageHeader";
import { fetchAllBranches, deleteBranch } from "../../api/authService";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import EditBranch from "./EditBranch";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchBranches = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllBranches();
      setBranches(response.data);
      setFilteredBranches(response.data); // Initially set filtered data as all data
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch branches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Debounced search functionality
  const handleSearch = debounce((value) => {
    const lowerCaseValue = value.toLowerCase();
    const filtered = branches.filter(
      (branch) =>
        branch.branchId?.toLowerCase().includes(lowerCaseValue) ||
        branch.branchName?.toLowerCase().includes(lowerCaseValue) ||
        branch.branchLogin?.toLowerCase().includes(lowerCaseValue) ||
        branch.zone?.zoneName?.toLowerCase().includes(lowerCaseValue) ||
        branch.region?.regionName?.toLowerCase().includes(lowerCaseValue) ||
        branch.city?.toLowerCase().includes(lowerCaseValue) ||
        branch.state?.toLowerCase().includes(lowerCaseValue) ||
        branch.postalCode?.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredBranches(filtered);
  }, 300);

  // Handle delete action
  const showDeleteModal = (branch) => {
    setSelectedBranch(branch);
    setDeleteModalVisible(true);
  };
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setSelectedBranch(null);
  };

  const handleEditModalUpdate = () => {
    fetchBranches();
    handleEditModalClose();
  };

  const handleDelete = async () => {
    if (!selectedBranch) return;

    setLoading(true);
    try {
      console.log("selectedBranch", selectedBranch)
      await deleteBranch(selectedBranch?._id);
      message.success("Branch deleted successfully!");
      setDeleteModalVisible(false); // Close modal
      fetchBranches(); // Reload the list
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete branch. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
    setSelectedBranch(null);
  };

  // Table columns
  const columns = [
    {
      title: "Branch ID",
      dataIndex: "branchCode",
      key: "branchCode",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Branch Email",
      dataIndex: "branchLogin",
      key: "branchLogin",
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "zone.zoneName",
      render: (zone) => zone?.zoneName || "N/A",
      ellipsis: true,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region.regionName",
      render: (region) => region?.regionName || "N/A",
      ellipsis: true,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      key: "postalCode",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
                style={{ marginRight: 8 }}
              />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => showDeleteModal(record)}
              danger
            />
          </Tooltip>
        </div>
      ),
    },
  ];

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
                <span>Home</span>
              </>
            ),
            path: "/",
          },
          {
            title: "Branch List",
          },
        ]}
      />
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={16}>
          <Input.Search
            placeholder="Search Branch"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "100%" }}
            size="large"
          />
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Link to="/masters/create-branch">
            <Button type="primary" size="large" style={{ width: "150px" }}>
              Create New Branch
            </Button>
          </Link>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Card title="Branch List">
          <Table
            columns={columns}
            dataSource={filteredBranches}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Spin>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Branch"
        visible={deleteModalVisible}
        centered
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        confirmLoading={loading}
      >
        <p>
          Are you sure you want to delete the branch{" "}
          <strong>{selectedBranch?.branchName}</strong>?
        </p>
      </Modal>
      {editModalVisible && (
        <EditBranch
          visible={editModalVisible}
          branchData={selectedBranch}
          onClose={handleEditModalClose}
          onUpdate={handleEditModalUpdate}
        />
      )}
    </div>
  );
};

export default BranchList;

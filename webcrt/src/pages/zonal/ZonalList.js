import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import debounce from "lodash.debounce";

const ZonalList = ({ data = [], loading }) => {
  const [filteredData, setFilteredData] = useState(data);

  // Debounced search function to filter zones
  const handleSearch = debounce((value) => {
    const filtered = data.filter((zone) =>
      zone.zoneName.toLowerCase().includes(value.toLowerCase()) ||
      zone.zoneCode.toLowerCase().includes(value.toLowerCase()) ||
      zone.region?.regionName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  }, 300);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const columns = [
    {
      title: "Zone Name",
      dataIndex: "zoneName",
      key: "zoneName",
      ellipsis: true,
    },
    {
      title: "Zone Code",
      dataIndex: "zoneCode",
      key: "zoneCode",
      ellipsis: true,
    },
    {
      title: "Region Name",
      dataIndex: "region",
      key: "region.regionName",
      render: (region) => region?.regionName || "N/A",
      ellipsis: true,
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0 }}>Zone List</h3>
        <Input.Search
          placeholder="Search zones"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />
    </div>
  );
};

export default ZonalList;

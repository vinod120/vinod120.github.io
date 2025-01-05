import React, { useState, useEffect } from 'react';
import { Table, Card, Input } from 'antd';
import debounce from 'lodash.debounce';

const columns = [
  { title: "Region Code", dataIndex: "regionCode", key: "regionCode" },
  { title: "Region Name", dataIndex: "regionName", key: "regionName" },
];

const RegionList = ({ data = [] }) => {
  const [filteredData, setFilteredData] = useState(data);

  // Debounced search function to filter data as user types
  const handleSearch = debounce((value) => {
    const filtered = data.filter((region) =>
      region?.regionName?.toLowerCase()?.includes(value?.toLowerCase()) ||
      region?.regionCode?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setFilteredData(filtered);
  }, 300);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Region List</span>
          <Input.Search
            placeholder="Search regions"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
        </div>
      }
      bordered
      style={{
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
      }}
    >
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    </Card>
  );
};

export default RegionList;

import React from 'react';
import { Breadcrumb, Divider, Space, Typography } from 'antd';

import './styles.css';

const PageHeader = ({ breadcrumbs, title, ...others }) => {
  return (
    <div {...others}>
      <Space direction="vertical" size="small">
        <Typography.Title
          level={4}
          style={{ padding: 0, margin: 0, textTransform: 'capitalize' }}
        >
          {title}
        </Typography.Title>
        <Breadcrumb items={breadcrumbs} className="page-header-breadcrumbs" />
      </Space>
      <Divider orientation="right" plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
};

export default PageHeader;

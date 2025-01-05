import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { green, red } from '@ant-design/colors';

const StatsCard = ({ icon, title, value, diff, ...others }) => {
  return (
    <Card {...others}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
        }}
      >
        {/* Dynamically rendering the icon */}
        {React.createElement(icon, { style: { fontSize: 30 } })}
        
        {/* Displaying the title */}
        <Typography.Text style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography.Text>
        
        {/* Layout for the value and difference indicator */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Value display with animation */}
          <Typography.Title level={2} style={{ margin: 0 }}>
            {value}
          </Typography.Title>
          
          {/* Difference indicator with conditional styling */}
          <Typography.Text
            strong
            style={{ color: diff > 0 ? green[5] : red[5] }}
          >
            {diff}%&nbsp;
            {diff > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
};


export default StatsCard;
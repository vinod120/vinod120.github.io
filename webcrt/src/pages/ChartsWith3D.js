import { Column } from '@ant-design/plots';
import { Card } from 'antd';
import React from 'react';

const data = [
  { type: '1-3', value: 0.16 },
  { type: '4-10', value: 0.125 },
  { type: '11-30', value: 0.24 },
  { type: '31-60', value: 0.19 },
  { type: '1-3', value: 0.22 },
  { type: '3-10', value: 0.05 },
  { type: '10-30', value: 0.01 },
  { type: '30+', value: 0.015 },
];

const ChartsWith3D = () => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    shapeField: 'column25D',
    style: {
      fill: 'rgba(126, 212, 236, 0.8)',
    },
  };
  return <Card title="Column Chart">
    <Column {...config} />
  </Card>;
};

export default ChartsWith3D
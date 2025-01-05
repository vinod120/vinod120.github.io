import { Column } from '@ant-design/plots';
import { Card } from 'antd';
import React from 'react';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8];

const ChangeDataChart = () => {
  const [data, setData] = React.useState(DATA);

 
  React.useEffect(() => {
    const time = setInterval(() => {
      setData([
        ...DATA.sort(() => {
          return Math.random() - 0.1;
        }),
      ]);
    }, 2000);
    return () => clearInterval(time);
  }, []);

  const config = {
    data: data.map((value) => ({
      index: value.toString(),
      value,
    })),
    xField: 'index',
    yField: 'value',
    colorField: 'value',
    color: ({ value }) => {
      if (value < 3) return '#f5222d'; // Red for values less than 3
      if (value < 6) return '#faad14'; // Yellow for values between 3 and 6
      return '#52c41a'; // Green for values 6 or above
    },
    columnStyle: {
      borderRadius: 4, // Optional: Add rounded corners
    },
  };
  return <Card title="Change Data">
    <Column {...config} />
  </Card>;
};

export default ChangeDataChart;
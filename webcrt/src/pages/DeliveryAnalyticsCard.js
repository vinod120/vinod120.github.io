import { Alert, Card } from 'antd';
import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';

const MultiLineChart = ({ data }) => {
  const [refinedData, setRefinedData] = useState([]);

  useEffect(() => {
    const formattedData = _.sortBy(data, (item) => {
      // Map the month names to their corresponding numerical values for sorting
      const monthMap = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };
      return monthMap[item.month];
    });
    setRefinedData(formattedData);
  }, [data]);

  const config = {
    data: refinedData,
    xField: 'month',
    yField: 'value',
    seriesField: 'status',
    stack: {
      groupBy: ['y', 'status'],
      series: true,
    },
    colorField: 'status',
    tooltip: (item) => {
      return { origin: item?.value };
    },
    radius: 0.2,
    label: {
      position: 'top',
      offset: 10,
      style: {
        fill: 'transparent',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    smooth: true, // Makes the lines smooth
    connectedArea: {
      style: {
        fillOpacity: 0.2, // Adjust the fill opacity of the connected area
      },
    },
    
    // connectedArea: {
    //   style: (oldStyle) => {
    //     return {
    //       fill: 'rgba(0,0,0,0.25)',
    //       stroke: oldStyle.fill,
    //       lineWidth: 0.5,
    //     };
    //   },
    // },
    slider: {
      x: {
        values: [0, 0.5],
      },
    },
    barStyle: {
      lineCap: 'round',
    },
  };

  return <Column {...config} />;
};

const DeliveryAnalyticsCard = ({ data, loading, error, ...others }) => {
  return (
    <Card title="Analytics" {...others}>
      {error ? (
        <Alert
          message="Error"
          description={error?.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <div>Loading....</div>
      ) : (
        <MultiLineChart data={data || []} />
      )}
    </Card>
  );
};


export default DeliveryAnalyticsCard
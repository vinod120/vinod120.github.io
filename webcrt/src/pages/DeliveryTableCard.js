import { Alert, Button, Card, Table } from 'antd';
import { useState } from 'react';
import UserAvatar from '../components/UserAvatar/UserAvatar';

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const TAB_LIST = [
  {
    key: 'all',
    tab: 'All',
  },
  {
    key: 'in transit',
    tab: 'In Transit',
  },
  {
    key: 'delivered',
    tab: 'Delivered',
  },
  {
    key: 'delayed',
    tab: 'Delayed',
  },
];

const DELIVERY_TABLE_COLUMNS = [
  {
    title: 'Id',
    dataIndex: 'shipment_id',
    key: 'shipment_id',
    render: (text) => text.split('-')[0],
  },
  {
    title: 'Destination',
    dataIndex: 'destination_city',
    key: 'destination',
  },
  {
    title: 'Customer',
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
  {
    title: 'Driver',
    dataIndex: 'driver_name',
    key: 'driver_name',
    render: (text) => <UserAvatar fullName={text} />,
  },
  {
    title: 'Status',
    dataIndex: 'delivery_status',
    key: 'delivery_status',
  },
  {
    title: 'Cost',
    dataIndex: 'shipment_cost',
    key: 'shipment_cost',
    render: (cost) => <span>${numberWithCommas(cost)}</span>,
  },
  {
    title: 'Delivery date',
    dataIndex: 'shipment_date',
    key: 'shipment_date',
  },
];

const DeliveryTable = ({ data, ...others }) => {
  return (
    <Table
      dataSource={data || []}
      columns={DELIVERY_TABLE_COLUMNS}
      className="overflow-scroll"
      {...others}
    />
  );
};

const DeliveryTableCard = ({ data, loading, error, ...others }) => {
  const [activeTabKey, setActiveTabKey] = useState('all');

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      title="Deliveries"
      extra={<Button>See all</Button>}
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error?.toString()}
          type="error"
          showIcon
        />
      ) : (
        <DeliveryTable
          data={
            activeTabKey !== 'all'
              ? data?.filter(
                  (d) => d.delivery_status.toLowerCase() === activeTabKey
                )
              : data || []
          }
          loading={loading}
        />
      )}
    </Card>
  );
};

export default DeliveryTableCard;
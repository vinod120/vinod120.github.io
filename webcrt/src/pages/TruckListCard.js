import {
    Alert,
    Badge,
    Button,
    List,
    Progress,
    Row,
    Col,
    Space,
    Typography,
    Card,
  } from 'antd';
  import React from 'react';

  const TruckListCard = ({ data = [], loading = false, error = null, ...others }) => {
    return (
      <Card
        className="available-trucks-card card"
        {...others}
      >
        <div className="card-header">
          <h3>Available Trucks</h3>
          <Button>See All</Button>
        </div>
        <div className="card-content">
          {error ? (
            <Alert
              message="Error"
              description={error.toString()}
              type="error"
              showIcon
            />
          ) : (
            <List
              itemLayout="vertical"
              className="available-truck-list"
              size="large"
              pagination={{
                onChange: (page) => console.log(page),
                pageSize: 5,
                align: 'center',
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.truck_id}>
                  <Space style={{ marginBottom: '.5rem' }}>
                    <Typography.Text strong style={{ textTransform: 'uppercase' }}>
                      {item.truck_id.split('-')[0]}
                    </Typography.Text>
                    <Badge
                      status={
                        item.status.toLowerCase() === 'delivered'
                          ? 'success'
                          : item.status.toLowerCase() === 'in transit'
                          ? 'processing'
                          : 'warning'
                      }
                      text={
                        <span style={{ textTransform: 'capitalize' }}>
                          {item.status}
                        </span>
                      }
                    />
                  </Space>
                  <Row gutter={16}>
                    <Col span={10}>
                      <Space direction="vertical">
                        <Badge
                          color="purple"
                          text={<Typography.Text>{item.origin}</Typography.Text>}
                        />
                        <Badge
                          color="cyan"
                          text={<Typography.Text>{item.destination}</Typography.Text>}
                        />
                      </Space>
                    </Col>
                    <Col span={6}>
                      <Space direction="vertical">
                        <Typography.Text>Make: {item.make}</Typography.Text>
                        <Typography.Text>Model: {item.model}</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={5}>
                      <Space direction="vertical">
                        <Typography.Text strong>{item.mileage} km</Typography.Text>
                        <Typography.Text>Distance</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={1}>
                      <Progress type="circle" percent={item.progress} size={48} />
                    </Col>
                  </Row>
                </List.Item>
              )}
              loading={loading}
            />
          )}
        </div>
      </Card>
    );
  };
  
  export default TruckListCard;
  
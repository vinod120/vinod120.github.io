import React from "react";
import { Col, Row } from "antd";
import {
  BlockOutlined,
  CarOutlined,
  GroupOutlined,
  HomeOutlined,
  PieChartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import  useFetchData  from "../../hooks/useFetchData";
import PageHeader from "../../components/PageHeader/PageHeader";
import DailyPlanCard from "../DailyPlanCard";
import DeliveryAnalyticsCard from "../DeliveryAnalyticsCard";
import DeliveryTableCard from "../DeliveryTableCard";
import { useStylesContext } from "../../context";
import StatsCard from "../StatsCard";
import TruckListCard from "../TruckListCard";
import DeliveryRequestCard from "../DeliveryRequestCard";

const STATS = [
  {
    icon: BlockOutlined,
    value: 1245,
    title: "new packages",
    diff: 16,
  },
  {
    icon: ShoppingOutlined,
    value: 8482,
    title: "ready for shipping",
    diff: 18,
  },
  {
    icon: CarOutlined,
    value: 747,
    title: "in transit",
    diff: -20,
  },
  {
    icon: GroupOutlined,
    value: 10747,
    title: "delivered",
    diff: -4.1,
  },
];

const PLAN_DATA = [
  {
    type: "Shipment processed",
    value: 38,
  },
  {
    type: "Orders processed",
    value: 52,
  },
  {
    type: "Requests queue",
    value: 61,
  },
];

const LogisticsDashboardPage = () => {
  const stylesContext = useStylesContext();
  // Fetching data
  const {
    data: trucksDeliveryData,
    loading: trucksDeliveryDataLoading,
    error: trucksDeliveryDataError,
  } = useFetchData("../mocks/TruckDeliveries.json");

  const {
    data: deliveryAnalyticsData,
    loading: deliveryAnalyticsDataLoading,
    error: deliveryAnalyticsDataError,
  } = useFetchData("../mocks/DeliveryAnalytics.json");
  const {
    data: trucksData,
    loading: trucksDataLoading,
    error: trucksDataError,
  } = useFetchData("../mocks/Trucks.json");
  const {
    data: trucksDeliveryRequestData,
    loading: trucksDeliveryRequestDataLoading,
    error: trucksDeliveryRequestDataError,
  } = useFetchData("../mocks/TruckDeliveryRequest.json");
  return (
    <div>
      {/* Page metadata */}
      <Helmet>
        <title>Logistics | Antd Dashboard</title>
      </Helmet>

      {/* Page header */}
      <PageHeader
        title="Logistics Dashboard"
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
            title: (
              <>
                <PieChartOutlined />
                <span>Dashboards</span>
              </>
            ),
          },
          {
            title: "Logistics",
          },
        ]}
      />

      {/* Dashboard content */}
      <Row {...stylesContext?.rowProps}>
      {STATS.map((s) => (
          <Col xs={24} sm={12} xl={6} key={s.title}>
            <StatsCard {...s} />
          </Col>
        ))}
        <Col span={24}>
          <DeliveryTableCard
            data={trucksDeliveryData}
            loading={trucksDeliveryDataLoading}
            error={trucksDeliveryDataError}
          />
        </Col>

        {/* Truck list */}
        <Col xs={24} xl={12}>
          <TruckListCard
            data={trucksData}
            loading={trucksDataLoading}
            error={trucksDataError}
          />
        </Col>

        {/* Delivery request card */}
        <Col xs={24} xl={12}>
          <DeliveryRequestCard
            data={trucksData}
            loading={trucksDataLoading}
            error={trucksDataError}
          />
        </Col>
      </Row>
    </div>
  );
};


export default LogisticsDashboardPage;
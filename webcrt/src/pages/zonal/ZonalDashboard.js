import React, { useReducer, useEffect } from "react";
import { Row, Col, Card, Spin, Alert } from "antd";
import ZonalCreation from "./ZonalCreation";
import ZonalList from "./ZonalList";
import { Helmet } from "react-helmet-async";
import { HomeOutlined } from "@ant-design/icons";
import PageHeader from "../../components/PageHeader/PageHeader";
import { fetchAllRegions, fetchAllZones } from "../../api/authService";

const initialState = {
  regions: [],
  zones: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_REGIONS":
      return { ...state, regions: action.payload };
    case "SET_ZONES":
      return { ...state, zones: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const ZonalDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { regions, zones, loading, error } = state;

  const fetchData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const [regionsResponse, zonesResponse] = await Promise.all([
        fetchAllRegions(),
        fetchAllZones(),
      ]);

      dispatch({ type: "SET_REGIONS", payload: regionsResponse.data });
      dispatch({ type: "SET_ZONES", payload: zonesResponse.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div>
        <Helmet>
          <title>Zone | Vitta Prabha</title>
        </Helmet>
        <PageHeader
          title="Zone Dashboard"
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
              title: "Zone",
            },
          ]}
        />{" "}
        {loading && (
          <Spin tip="Loading...">
            <div style={{ minHeight: "300px" }} />
          </Spin>
        )}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}
        <Row gutter={16} style={{ height: "100%" }}>
          <Col span={14}>
            <Card bordered={false} className="equal-height">
              <ZonalList data={zones} loading={loading} />
            </Card>
          </Col>
          <Col span={10} style={{ height: "100%" }}>
            <Card
              title="Create New Zone"
              bordered={false}
              className="equal-height"
            >
              <ZonalCreation
                existingZones={zones}
                regions={regions}
                refreshData={fetchData}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default ZonalDashboard;

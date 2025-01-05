import React, { useEffect, useReducer } from "react";
import { Row, Col, Spin, Alert } from "antd";
import { Helmet } from "react-helmet-async";
import { HomeOutlined } from "@ant-design/icons";
import PageHeader from "../../components/PageHeader/PageHeader";
import RegionList from "./RegionList";
import RegionCreation from "./RegionCreation";
import { fetchAllRegions, fetchStates } from "../../api/authService";
import { App } from "antd";

const initialState = {
  states: [],
  regions: [],
  loading: false,
  error: null,
  flag: false,
};

const actionTypes = {
  SET_STATES: "SET_STATES",
  SET_REGIONS: "SET_REGIONS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  TOGGLE_FLAG: "TOGGLE_FLAG",
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_STATES:
      return { ...state, states: action.payload };
    case actionTypes.SET_REGIONS:
      return { ...state, regions: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.TOGGLE_FLAG:
      return { ...state, flag: !state.flag };
    default:
      return state;
  }
}

const RegionDashboardPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { states, regions, loading, error, flag } = state;

  const fetchData = async (fetchFunc, actionType) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      const response = await fetchFunc();
      dispatch({ type: actionType, payload: response.data });
    } catch (err) {
      dispatch({ type: actionTypes.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchData(fetchStates, actionTypes.SET_STATES),
      fetchData(fetchAllRegions, actionTypes.SET_REGIONS),
    ]);
  };

  useEffect(() => {
    fetchAllData();
  }, [flag]);

  const handleRefresh = () => {
    dispatch({ type: actionTypes.TOGGLE_FLAG });
  };

  return (
    <App>
      <Helmet>
        <title>Regions | Vitta Prabha</title>
      </Helmet>
      <PageHeader
        title="Region Dashboard"
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
          { title: "Region" },
        ]}
      />
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
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <RegionList data={regions} loading={loading} />
        </Col>
        <Col xs={24} xl={12}>
          <RegionCreation
            regions={states}
            loading={loading}
            existingRegions={regions}
            onRegionCreated={handleRefresh}
          />
        </Col>
      </Row>
    </App>
  );
};

export default RegionDashboardPage;

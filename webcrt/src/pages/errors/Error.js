import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Result, Typography } from 'antd';
import BackBtn from '../../components/BackBtn/BackBtn';
import RefreshBtn from '../../components/RefreshBtn/RefreshBtn';
const { Paragraph, Text } = Typography;

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="error"
      title="Oops!"
      subTitle="Sorry, an unexpected error has occurred."
      extra={[<BackBtn type="primary" />, <RefreshBtn />]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The page you tried to open has the following error:
          </Text>
        </Paragraph>
        <Paragraph copyable>{error.statusText || error.message}</Paragraph>
      </div>
    </Result>
  );
};

export default ErrorPage;

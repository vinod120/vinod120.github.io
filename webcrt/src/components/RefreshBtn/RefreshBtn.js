import React from 'react';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const RefreshBtn = ({ icon, ...others }) => {
  return (
    <Button
      icon={icon ? <SyncOutlined /> : null}
      onClick={() => window.location.reload()}
      {...others}
    >
      Refresh page
    </Button>
  );
};

export default RefreshBtn;

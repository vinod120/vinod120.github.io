import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const BackBtn = ({ wIcon, iconOnly, ...others }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Navigate to previous page">
      <Button
        icon={wIcon || iconOnly ? <LeftOutlined /> : null}
        onClick={() => navigate(-1)}
        {...others}
      >
        {!iconOnly && 'Go back'}
      </Button>
    </Tooltip>
  );
};

export default BackBtn;

import React from 'react';
import { Flex, Typography, theme } from 'antd';
import { Link } from 'react-router-dom';

import './styles.css';

const Logo = ({
  asLink,
  color,
  href,
  imgSize,
  bgColor,
  ...others
}) => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return asLink ? (
    <Link to={href || '#'} className="logo-link">
      <Flex gap={others.gap || 'small'} align="center" {...others}>
        <img
          src="https://placehold.co/400"
          alt="design sparx logo"
          height={imgSize?.h || 48}
        />
        <Typography.Title
          level={5}
          type="secondary"
          style={{
            color,
            margin: 0,
            padding: `4px 8px`,
            backgroundColor: bgColor,
            borderRadius,
          }}
        >
          Vitta Prabha
        </Typography.Title>
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || 'small'} align="center" {...others}>
      <img
        src="https://placehold.co/400"
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
      <Typography.Title
        level={4}
        type="secondary"
        style={{
          color,
          margin: 0,
          padding: `4px 8px`,
          backgroundColor: bgColor,
          borderRadius,
        }}
      >
        Vitta Prabha
      </Typography.Title>
    </Flex>
  );
};

export default Logo;

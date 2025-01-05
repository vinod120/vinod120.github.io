import React from 'react';
import { Avatar, Flex, Typography } from 'antd';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { theme } from 'antd';
import { colourNameToHex, getNameInitials, isColorLight } from '../../utils';

const UserAvatar = ({
  fullName,
  mark,
  size,
  verified,
  color,
  textWidth,
  ...others
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const avatarProps = {
    size: size === 'large' ? 36 : size === 'small' ? 18 : 24,
  };

  return (
    <Flex gap="small" align="center" {...others}>
      {mark ? (
        <Avatar
          style={{
            backgroundColor: color || colorPrimary,
            color: isColorLight(colourNameToHex(color || colorPrimary))
              ? 'black'
              : 'white',
          }}
          icon={<UserOutlined />}
          {...avatarProps}
        />
      ) : (
        <Avatar
          style={{
            backgroundColor: color || colorPrimary,
            color: isColorLight(colourNameToHex(color || colorPrimary))
              ? 'black'
              : 'white',
          }}
          {...avatarProps}
        >
          {getNameInitials(fullName)}
        </Avatar>
      )}
      <Typography.Text
        style={{
          fontSize: size === 'large' ? 18 : size === 'small' ? 14 : 16,
          width: textWidth || 160,
        }}
      >
        {fullName}
      </Typography.Text>
      {verified && (
        <CheckCircleFilled style={{ fontSize: 14, color: blue[6] }} />
      )}
    </Flex>
  );
};

export default UserAvatar;

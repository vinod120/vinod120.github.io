import { Layout } from 'antd';

const { Footer } = Layout;

const FooterNav = ({ ...others }) => {
  return (
    <Footer {...others}>Copyright by Vitta Prabha</Footer>
  );
};

export default FooterNav;

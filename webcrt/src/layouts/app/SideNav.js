import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import {
  AppstoreAddOutlined,
  IdcardOutlined,
  PieChartOutlined,
  FileTextOutlined,
  TransactionOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { COLOR } from "../../App.js";
import {
  PATH_FUND_TRANSFER,
  PATH_INTEREST,
  PATH_MASTERS,
  PATH_REPORTS,
  PATH_TRANSACTION,
} from "../../constants/routes.js";
import Logo from "../../components/Logo/Logo.js";

const { Sider } = Layout;

const getItem = (
  label,
  key,
  icon,
  children,
  type
) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem("Dashboard", "dashboard", null, [], "group"),
  getItem("Masters", "region", <AppstoreAddOutlined />, [
    getItem(<Link to={PATH_MASTERS.region}>Region</Link>, "region", null),
    getItem(<Link to={PATH_MASTERS.zone}>Zone</Link>, "zone", null),
    getItem(<Link to={PATH_MASTERS.branchList}>Branch List</Link>, "branch-list", null),
    getItem(<Link to={PATH_MASTERS.agent}>Agent</Link>, "agent", null),
    getItem(<Link to={PATH_MASTERS.party}>Party</Link>, "party", null),
    getItem(<Link to={PATH_MASTERS.generalLedger}>General Ledger</Link>, "general-ledger", null),
    getItem(<Link to={PATH_MASTERS.goldItem}>Gold Item</Link>, "gold-item", null),
    getItem(<Link to={PATH_MASTERS.subCaste}>Sub Caste</Link>, "sub-caste", null),
    getItem(<Link to={PATH_MASTERS.deadStock}>Dead Stock</Link>, "dead-stock", null),
    getItem(<Link to={PATH_MASTERS.villages}>Villages</Link>, "villages", null),
    getItem(<Link to={PATH_MASTERS.userCreation}>User Creation</Link>, "user-creation", null),
    getItem(<Link to={PATH_MASTERS.userList}>User List</Link>, "user-list", null),
    getItem(<Link to={PATH_MASTERS.employeeMaster}>Employee Master</Link>, "employee-master", null),
    getItem(<Link to={PATH_MASTERS.employeeAttendance}>Employee Attendance Sheet</Link>, "employee-attendance", null),
  ]),
  getItem("Interest", "interest", <PieChartOutlined />, [
    getItem(<Link to={PATH_INTEREST.deposit}>Interest On Deposit</Link>, "interest-deposit", null),
    getItem(<Link to={PATH_INTEREST.loans}>Interest On Loans</Link>, "interest-loans", null),
    getItem(<Link to={PATH_INTEREST.dividend}>Dividend Calculation</Link>, "interest-dividend", null),
    getItem(<Link to={PATH_INTEREST.bank}>Interest On Bank Investment</Link>, "interest-bank", null),
    getItem(<Link to={PATH_INTEREST.autoTransfer}>Auto Transfer</Link>, "interest-auto-transfer", null),
    getItem(<Link to={PATH_INTEREST.autoTransferI}>Auto Transfer I</Link>, "interest-auto-transfer-I", null),
  ]),
  getItem("Reports", "Reports", null, [], "group"),
  getItem("Daily Reports", "daily-reports", <FileTextOutlined />, [
    getItem(<Link to={PATH_REPORTS.cashBook}>Cash Book</Link>, "cash-book", null),
    getItem(<Link to={PATH_REPORTS.dayBook}>Day Book</Link>, "day-book", null),
    getItem(<Link to={PATH_REPORTS.other}>Other</Link>, "daily-other", null),
    getItem(<Link to={PATH_REPORTS.agent}>Agent</Link>, "daily-agent", null),
  ]),
  getItem("Reports", "reports", <TransactionOutlined />, [
    getItem(<Link to={PATH_REPORTS.cashBook}>Loan</Link>, "loan", null),
    getItem(<Link to={PATH_REPORTS.agent}>Deposit</Link>, "deposit", null),
    getItem(<Link to={PATH_REPORTS.other}>Share</Link>, "share", null),
    getItem(<Link to={PATH_REPORTS.dayBook}>MIS</Link>, "mis", null),
  ]),
  getItem("Transaction", "transaction", <TransactionOutlined />, [
    getItem(<Link to={PATH_TRANSACTION.dayBegin}>Day Begin</Link>, "transaction-day-begin", null),
    getItem(<Link to={PATH_TRANSACTION.cashOpen}>Cash Open</Link>, "transaction-cash-open", null),
    getItem(<Link to={PATH_TRANSACTION.clerkEntry}>Clerk Entry</Link>, "transaction-clerk-entry", null),
    getItem(<Link to={PATH_TRANSACTION.passingTransaction}>Passing transaction</Link>, "transaction-passing", null),
    getItem(<Link to={PATH_TRANSACTION.cashEntry}>Cash Entry</Link>, "transaction-cash-entry", null),
    getItem(<Link to={PATH_TRANSACTION.standingInstruction}>Standing Instruction Execution</Link>, "transaction-standing", null),
    getItem(<Link to={PATH_TRANSACTION.adminVoucher}>Admin Voucher Entry</Link>, "transaction-admin-voucher", null),
    getItem(<Link to={PATH_TRANSACTION.adminTransfer}>Admin Transfer Entry</Link>, "transaction-admin-transfer", null),
    getItem(<Link to={PATH_TRANSACTION.fdReinvestment}>FD Reinvestment Entry</Link>, "transaction-fd-reinvestment", null),
  ]),
  getItem("Fund Transfer", "fund-transfer", <SendOutlined />, [
    getItem(<Link to={PATH_FUND_TRANSFER.addBeneficiary}>Add Beneficiary</Link>, "add-beneficiary", null),
    getItem(<Link to={PATH_FUND_TRANSFER.transfer}>Fund Transfer</Link>, "fund-transfer", null),
    getItem(<Link to={PATH_FUND_TRANSFER.passing}>Fund Transfer Passing</Link>, "fund-transfer-passing", null),
    getItem(<Link to={PATH_FUND_TRANSFER.qrCode}>QR Code Generator</Link>, "qr-code-generator", null),
    getItem(<Link to={PATH_FUND_TRANSFER.mobileApp}>Mobile App Registration List</Link>, "mobile-app-list", null),
  ]),
  getItem("Account", "account", <IdcardOutlined />, [
    getItem(<Link to="/">Share Opening</Link>, "share-opening", null),
    getItem(<Link to="/">Deposit Opening</Link>, "deposit-opening", null),
    getItem(<Link to="/">Loan Opening</Link>, "loan-opening", null),
    getItem(<Link to="/">Bank Investment</Link>, "bank-investment", null),
    getItem(<Link to="/">General A/C Opening</Link>, "general-opening", null),
    getItem(<Link to="/">Standing Instruction A/C Opening</Link>, "standing-instruction-opening", null),
  ]),
];

const rootSubmenuKeys = [
  "dashboards",
  "masters",
  "account",
  "transaction",
  "fund-transfer",
  "interest",
  "daily-reports",
  "reports",
];

const SideNav = ({ ...others }) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="blue"
        asLink
        href="/"
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: "1rem 0" }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: COLOR["100"],
              itemHoverBg: COLOR["50"],
              itemSelectedColor: COLOR["600"],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;

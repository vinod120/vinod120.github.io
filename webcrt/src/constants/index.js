import {
  PATH_DASHBOARD,
  PATH_MASTERS,
  PATH_TRANSACTION,
  PATH_INTEREST,
  PATH_FUND_TRANSFER,
  PATH_REPORTS,
  PATH_ERROR,
} from "./routes.js";

const ERROR_ITEMS = [
  { title: "400", path: PATH_ERROR.error400 },
  { title: "403", path: PATH_ERROR.error403 },
];

const FUND_TRANSFER_ITEMS = [
  { title: "add beneficiary", path: PATH_FUND_TRANSFER.addBeneficiary },
  { title: "fund transfer", path: PATH_FUND_TRANSFER.transfer },
  { title: "fund transfer passing", path: PATH_FUND_TRANSFER.passing },
  { title: "pending fund transfer posting", path: PATH_FUND_TRANSFER.pendings },
  { title: "QR code generator", path: PATH_FUND_TRANSFER.qrCode },
  { title: "mobile app registration list", path: PATH_FUND_TRANSFER.mobileApp },
];

const INTEREST_ITEMS = [
  { title: "interest on deposit", path: PATH_INTEREST.deposit },
  { title: "interest on loans", path: PATH_INTEREST.loans },
  { title: "dividend calculation", path: PATH_INTEREST.dividend },
  { title: "interest on bank investment", path: PATH_INTEREST.bank },
  { title: "auto transfer", path: PATH_INTEREST.autoTransfer },
  { title: "auto transfer I", path: PATH_INTEREST.autoTransferI },
];

const DAILY_REPORTS_ITEMS = [
  { title: "cash book", path: PATH_REPORTS.cashBook },
  { title: "day book", path: PATH_REPORTS.dayBook },
  { title: "other", path: PATH_REPORTS.other },
  { title: "agent", path: PATH_REPORTS.agent },
];

const TRANSACTION_ITEMS = [
  { title: "day begin", path: PATH_TRANSACTION.dayBegin },
  { title: "cash open", path: PATH_TRANSACTION.cashOpen },
  { title: "clerk entry", path: PATH_TRANSACTION.clerkEntry },
  { title: "passing transaction", path: PATH_TRANSACTION.passingTransaction },
  { title: "cash entry", path: PATH_TRANSACTION.cashEntry },
  { title: "standing instruction execution", path: PATH_TRANSACTION.standingInstruction },
  { title: "admin voucher entry", path: PATH_TRANSACTION.adminVoucher },
  { title: "admin transfer entry", path: PATH_TRANSACTION.adminTransfer },
  { title: "FD reinvestment entry", path: PATH_TRANSACTION.fdReinvestment },
];

const MASTERS_ITEMS = [
  { title: "schedule", path: PATH_MASTERS.schedule },
  { title: "director master", path: PATH_MASTERS.director },
  { title: "agent", path: PATH_MASTERS.agent },
  { title: "party", path: PATH_MASTERS.party },
  { title: "general ledger", path: PATH_MASTERS.generalLedger },
  { title: "gold item", path: PATH_MASTERS.goldItem },
  { title: "sub caste", path: PATH_MASTERS.subCaste },
  { title: "dead stock", path: PATH_MASTERS.deadStock },
  { title: "villages", path: PATH_MASTERS.villages },
  { title: "user creation", path: PATH_MASTERS.userCreation },
  { title: "user list", path: PATH_MASTERS.userList },
  { title: "employee master", path: PATH_MASTERS.employeeMaster },
  { title: "employee attendance sheet", path: PATH_MASTERS.attendanceSheet },
];

export {
  PATH_DASHBOARD,
  PATH_ERROR,
  ERROR_ITEMS,
  FUND_TRANSFER_ITEMS,
  INTEREST_ITEMS,
  DAILY_REPORTS_ITEMS,
  TRANSACTION_ITEMS,
  MASTERS_ITEMS,
};

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_ERRORS = '/errors';
const ROOTS_FUND_TRANSFER = '/fund-transfer';
const ROOTS_INTEREST = '/interest';
const ROOTS_REPORTS = "/reports";
const ROOTS_TRANSACTION = '/transaction';
const ROOTS_MASTERS = '/masters';

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  projects: path(ROOTS_DASHBOARD, '/projects'),
  ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  marketing: path(ROOTS_DASHBOARD, '/marketing'),
  social: path(ROOTS_DASHBOARD, '/social'),
  bidding: path(ROOTS_DASHBOARD, '/bidding'),
  learning: path(ROOTS_DASHBOARD, '/learning'),
  logistics: path(ROOTS_DASHBOARD, '/logistics'),
};

export const PATH_ERROR = {
  root: ROOTS_ERRORS,
  error400: path(ROOTS_ERRORS, '/400'),
  error403: path(ROOTS_ERRORS, '/403'),
};

export const PATH_FUND_TRANSFER = {
  root: ROOTS_FUND_TRANSFER,
  addBeneficiary: path(ROOTS_FUND_TRANSFER, '/add-beneficiary'),
  transfer: path(ROOTS_FUND_TRANSFER, '/fund-transfer'),
  passing: path(ROOTS_FUND_TRANSFER, '/fund-transfer-passing'),
  pendings: path(ROOTS_FUND_TRANSFER, '/pending-fund-transfer-posting'),
  qrCode: path(ROOTS_FUND_TRANSFER, '/qr-code-generator'),
  mobileApp: path(ROOTS_FUND_TRANSFER, '/mobile-app-registration-list'),
};

export const PATH_REPORTS = {
  root: ROOTS_REPORTS,
  cashBook: path(ROOTS_REPORTS, '/loan'),
  dayBook: path(ROOTS_REPORTS, '/deposit'),
  other: path(ROOTS_REPORTS, '/share'),
  agent: path(ROOTS_REPORTS, '/mis'),
};

export const PATH_INTEREST = {
  root: ROOTS_INTEREST,
  deposit: path(ROOTS_INTEREST, '/interest-on-deposit'),
  loans: path(ROOTS_INTEREST, '/interest-on-loans'),
  dividend: path(ROOTS_INTEREST, '/dividend-calculation'),
  bank: path(ROOTS_INTEREST, '/interest-on-bank-investment'),
  autoTransfer: path(ROOTS_INTEREST, '/auto-transfer'),
  autoTransferI: path(ROOTS_INTEREST, '/auto-transfer-I'),
};

export const PATH_TRANSACTION = {
  root: ROOTS_TRANSACTION,
  dayBegin: path(ROOTS_TRANSACTION, '/day-begin'),
  cashOpen: path(ROOTS_TRANSACTION, '/cash-open'),
  clerkEntry: path(ROOTS_TRANSACTION, '/clerk-entry'),
  passingTransaction: path(ROOTS_TRANSACTION, '/passing-transaction'),
  cashEntry: path(ROOTS_TRANSACTION, '/cash-entry'),
  standingInstruction: path(ROOTS_TRANSACTION, '/standing-instruction-execution'),
  adminVoucher: path(ROOTS_TRANSACTION, '/admin-voucher-entry'),
  adminTransfer: path(ROOTS_TRANSACTION, '/admin-transfer-entry'),
  fdReinvestment: path(ROOTS_TRANSACTION, '/fd-reinvestment-entry'),
};

export const PATH_MASTERS = {
  root: ROOTS_MASTERS,
  region: path(ROOTS_MASTERS, '/region'),
  zone: path(ROOTS_MASTERS, '/zone'),
  branchCreate: path(ROOTS_MASTERS, '/create-branch'),
  branchList: path(ROOTS_MASTERS, '/branch-list'),
  schedule: path(ROOTS_MASTERS, '/schedule'),
  director: path(ROOTS_MASTERS, '/director-master'),
  agent: path(ROOTS_MASTERS, '/agent'),
  party: path(ROOTS_MASTERS, '/party'),
  generalLedger: path(ROOTS_MASTERS, '/general-ledger'),
  goldItem: path(ROOTS_MASTERS, '/gold-item'),
  subCaste: path(ROOTS_MASTERS, '/sub-caste'),
  deadStock: path(ROOTS_MASTERS, '/dead-stock'),
  villages: path(ROOTS_MASTERS, '/villages'),
  userCreation: path(ROOTS_MASTERS, '/user-creation'),
  userList: path(ROOTS_MASTERS, '/user-list'),
  employeeMaster: path(ROOTS_MASTERS, '/employee-master'),
  attendanceSheet: path(ROOTS_MASTERS, '/employee-attendance-sheet'),
  employeeAttendance: path(ROOTS_MASTERS, '/employee-attendance-sheet'),
};

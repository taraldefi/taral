// Generated with util/create-component.js
export interface applicationTableDataType {
  id: string;
  applicationId: string;
  product: string;
  dateFrom: string;
  dateTo: string;
  importerId: string;
  importerName: string;
  status: {
    label: string;
    claimable: boolean;
    component: any;
  };
}
export interface applicationTableType {
  applicationTableData: applicationTableDataType[];
  onClick?: (id: string) => void;
}

export interface entityTableDataType {
  productTitle: string;
  issuanceDate: string;
  maturityDate: string;
  facilityAmount: number;
}

export interface entityTableType {
  entityTableData: entityTableDataType[];
}

export interface companyTableDataType {
  persons: string;
  details: string;
  source: string;
  status: boolean;
}

export interface companyTableType {
  companyTableData: companyTableDataType[];
}
export interface screeningTableDataType {
  persons: string;
  Hit: string;
  Source: string;
}

export interface screeningTableType {
  screeningTableData: screeningTableDataType[];
}

export interface personsTableDataType {
  name: string;
  image: string;
  email: string;
  position: string;
  isSent: boolean;
  isDone: boolean;
}

export interface personsTableType {
  personsTableData: personsTableDataType[];
}

export interface researchTableDataType {
  name: string;
  image?: string;
  Hit: string;
  Source: string;
}

export interface researchTableType {
  researchTableData: researchTableDataType[];
}

export interface signOffTabelDataType {
  name: string;
  image: string;
  email: string;
  position: string;
  statusSeen: boolean;
  statusSigned: boolean;
}

export interface signOffTableType {
  signOffTableData: signOffTabelDataType[];
}

interface receiptTableDataType {
  transactionDate: string;
  amount: number;
  remainingBalance: number;
  paymentMethod: string;
  url: string;
}

export interface receiptTableType {
  receiptTableData: receiptTableDataType[];
}

interface repaymentTableDataType {
  paymentId: string;
  amount: number;
  dueDate: string;
  status: string;
}

export interface repaymentTableType {
  repaymentTableData: repaymentTableDataType[];
}

export interface overviewTableDataType {
  process: string;
  users: string[];
  progress: number;
  status: any;
  date: string;
}

export interface overviewTableType {
  overviewTableData: overviewTableDataType[];
}

interface auditUser {
  avatar: string;
  name: string;
  email: string;
}

export interface auditTableDataType {
  action: string;
  user: auditUser;
  activity: any;
  date: string;
}

export interface auditTableType {
  auditTableData: auditTableDataType[];
}

export interface taskTableDataType {
  assignee: taskUser;
  task: taskList;
  assignor: taskUser;
  date: string;
}
interface taskList {
  title: string;
  description: string;
}

interface taskUser {
  user: string;
  name: string;
}

export interface taskTableType {
  taskTableData: taskTableDataType[];
  value: number;
}

export interface teamTableDataType {
  member: taskUser;
  department: string;
  lastAction: string;
  dateOfAction: string;
}

export interface teamTableType {
  teamTableData: teamTableDataType[];
  value: number;
}

export interface quantitativeTableDataType {
  factor: string;
  value: string;
  status: boolean;
  metric: number;
}

export interface quantitativeTableType {
  quantitativeTableData: quantitativeTableDataType[];
}

export interface txTableType {
  txTableData: txTableDataType;
}
export interface txTableDataType {
  [key: string]: txTableValueType;
}
export interface txTableValueType {
  downpayment: number;
  principalrepayment: number;
  interestpayment: number;
}

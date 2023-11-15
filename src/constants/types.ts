interface TabItem {
  key: string;
  label: string;
  page: string;
}
interface RouteConstants {
  [key: string]: string;
}
interface OrderListResponse {
  id: number;
  bookName: string;
}

interface complexDataType {
  key: React.Key;
  captionName: string;
  captionID: string;
  directoryCode: string;
  subsection: string;
}
interface SelectOptionType {
  name: string;
  value: string | number;
}
interface FormData {
  [key: string]: string | boolean | number;
}
interface FormPropType {
  state: FormData;
  setstate: React.Dispatch<React.SetStateAction<FormData>>;
}
interface CheckBoxType {
  label:string;
  checked: boolean;
  isVisible: boolean;
  name:string;
}
export type {
  TabItem,
  RouteConstants,
  complexDataType,
  OrderListResponse,
  SelectOptionType,
  FormData,
  FormPropType,
  CheckBoxType,
};

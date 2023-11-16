import React, { useEffect, useState } from "react";
import ListDetails from "@/components/DirectListing/ListDetails";
import Indicators from "@/components/DirectListing/Indicators";
import { FormData } from "@/constants/types";
import Table, { ColumnsType } from "antd/es/table";
import ListName from "@/components/DirectListing/ListName";
import General from "@/components/DirectListing/General";
import { DataTable, Icons } from "@/components/common";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";

interface DataType {
  key: React.Key;
  tn: string;
  listName: string;
  listAddress: string;
  additionalList: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "TN",
    dataIndex: "tn",
    key: "tn",
  },
  {
    title: "List Name",
    dataIndex: "listName",
    key: "listName",
  },
  {
    title: "List Address",
    dataIndex: "listAddress",
    key: "listAddress",
  },
  {
    title: "Additional List",
    dataIndex: "additionalList",
    key: "additionalList",
  },
  { title: "Column 1", dataIndex: "additionalList", key: "1" },
  { title: "Column 2", dataIndex: "additionalList", key: "2" },
  { title: "Column 3", dataIndex: "additionalList", key: "3" },
  { title: "Column 4", dataIndex: "additionalList", key: "4" },
  { title: "Column 5", dataIndex: "additionalList", key: "5" },
  { title: "Column 6", dataIndex: "additionalList", key: "6" },
  { title: "Column 7", dataIndex: "additionalList", key: "7" },
  { title: "Column 8", dataIndex: "additionalList", key: "8" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <div className="flex justify-between">
        <Icons type="edit" />
        <Icons type="delete" />
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    tn: "800-422-2319",
    listName: "Virginia Commonwealth",
    listAddress: "Abingdon VA-242102833",
    additionalList: "AL",
  },
  {
    key: "2",
    tn: "276-386-312",
    listName: "Virginia Commonwealth",
    listAddress: "Abingdon VA-242102833",
    additionalList: "AL",
  },
];
const DirectListing = () => {
  const [formData, setFormData] = useState<FormData>({});
  const {orderList} = useAppSelector((state: RootState) => state.application);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState({
    data: [],
    header: "",
  });

  const expandableColumnData = [
    { label: "Customer", field: "customer", sortable: true },
    { label: "Date", field: "date", sortable: true },
  ];
  const expandableKey = "orders";
  const rowSelectionToggle = (row) => {
    let message={
      data:row.value
    }
    window.parent.postMessage(message,'*')
  };

  console.log("baseState", orderList);
  
  return (
    <div className="directListing mx-12">
      <div className=" p-5 bg-white mb-4">
        {/* <Table columns={columns} dataSource={data} scroll={{ x: 2400 }} /> */}
        <DataTable
          rowData={orderList}
          pagination={true}
          isExpandable={true}
          actionRequired={true}
          expandableColumnData={expandableColumnData}
          expandableKey={expandableKey}
          onRowSelection={rowSelectionToggle}
          setData={setData}
          tableData={tableData} isLoading={undefined} searchPlaceholder={undefined}        />
      </div>
      <div className="flex justify-between w-full">
        <div className="w-[64%]">
          <ListDetails state={formData} setstate={setFormData} />
          <ListName state={formData} setstate={setFormData} />
        </div>
        <Indicators state={formData} setstate={setFormData} />
      </div>
      <General state={formData} setstate={setFormData} />
    </div>
  );
};

export default DirectListing;

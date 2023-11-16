import React, { useCallback, useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { generateID } from "../../../utils/generateId";
import './DataTable.css'

export const renderStatusButton = (rowData, field) => {
  const value = rowData[field];
  const isPaid = rowData[field] === "Paid";
  return (
    <div
      className={`statusBtn--${
        isPaid ? "paid" : "pending"
      } px-3 py-2 text-center`}
    >
      {value}
    </div>
  );
};

export const DataTablePOC=({
  rowData,
  pagination,
  isLoading,
  searchPlaceholder,
  actionRequired,
  expandableColumnData,
  expandableKey,
  onRowSelection,
  isExpandable,
  setData,
  tableData,
}) => {
  const [columnData, setColumnData] = useState([]);
  const [availableColumn, setColumn] = useState([]);
  const UID = generateID();
  const initialCriteriaData = [
    {
      id: `criteria${UID}`,
      items: [
        {
          itemId: `item${UID}`,
          relationship: "",
          queries: [
            {
              queriId: `queri${UID}`,
              relationship: "",
              columnName: "",
              condition: "",
              value: "",
            },
          ],
        },
      ],
    },
  ];
  const [criteriaData, setCriteriaData] = useState(initialCriteriaData);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);

  const search = (event) => {
    setItems(availableColumn?.map((item) => item?.label));
  };

  const filterSearch = (data) => {
    setFilterItems(data);
  };

  const filterState = [
    { name: "is", code: "is" },
    { name: "is not", code: "isNot" },
    { name: "is empty", code: "isEmpty" },
    { name: "is not empty", code: "isNotEmpty" },
    { name: "starts with", code: "startsWith" },
    { name: "ends with", code: "endsWith" },
    { name: "contains", code: "contains" },
    { name: "does not contain", code: "doesNotContain" },
    { name: "is anything", code: "isAnything" },
    { name: "is same as", code: "isSameAs" },
    { name: "is different from", code: "isDiffFrom" },
    { name: "is empty string", code: "isEmptyString" },
    { name: "is (dynamic)", code: "isDynamic" },
  ];
  const spiltBtnReferance = useRef({});
  const [globalValue, setGlobalValue] = useState({
    globalFilterValue: "",
    globalFilterFields: [],
  });
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});

  const _renderCondition = (filterCriteria, status) => {
    let filterRecord = [];
    let filterTableData = [...tableData];
    switch (status) {
      case "is":
        filterRecord = tableData.filter((a) =>
          filterCriteria[0].items[0].queries.some(
            (b) => b.value === a[filterCode(b.columnName, a)]
          )
        );
        break;
      case "isNot":
        filterRecord = tableData.filter((a) =>
          filterCriteria[0].items[0].queries.some(
            (b) => b.value !== a[filterCode(b.columnName, a)]
          )
        );
      case "startsWith":
        filterRecord = tableData.filter((a) =>
          filterCriteria[0].items[0].queries.some((b) => {
            return a[filterCode(b.columnName, a)]
              .toLowerCase()
              .startsWith(b.value.toLowerCase());
          })
        );
      case "endsWith":
        filterRecord = tableData.filter((a) =>
          filterCriteria[0].items[0].queries.some((b) => {
            return a[filterCode(b.columnName, a)]
              .toLowerCase()
              .endsWith(b.value.toLowerCase());
          })
        );
      case "isEmpty":
        filterRecord = filterTableData.forEach((item) => {
          return (item[filterCriteria[0].items[0].queries[0].columnName] = "");
        });
        break;

      default:
        break;
    }
    return filterRecord;
  };

  const filterCode = (name, a) => {
    const filterName = Object.keys(a).find((i) => i === name);
    return filterName;
  };

  const handleFilter = () => {
    const emptyRelationShip = criteriaData.map(
      (criteria) => criteria.items.find((item) => item).relationship
    )[0];
    // const condition =
    if (!emptyRelationShip) {
      let filterCriteria = criteriaData.map((criteria) => {
        return {
          ...criteria,
          items: [...criteria.items],
        };
      });
      const filterData = _renderCondition(
        filterCriteria,
        filterCriteria[0].items[0].queries[0].condition.code
      );
      setData({
        data: !filterCriteria[0].items[0].queries[0].value.trim()
          ? tableData
          : filterData,
      });
    }
    setVisible(false);
  };

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        severity="secondary"
        className="border-round-3xl"
        text
        raised
        onClick={() => setVisible(false)}
      />
      <Button
        label="Ok"
        className="border-round-3xl bg-yellow-500 border-0 confirm"
        onClick={() => handleFilter()}
      />
    </div>
  );

  const actionMenus = [
    {
      items: [
        {
          label: "Update",
          icon: PrimeIcons.PENCIL,
          command: () => {
            console.log(selectedRow);
          },
        },
        {
          label: "Delete",
          icon: PrimeIcons.TRASH,
          command: () => {
            console.log(selectedRow);
          },
        },
      ],
    },
  ];

  const textEditor = (option) => {
    return (
      <InputText
        type="text"
        value={option.value}
        onChange={(e) => option.editorCallback(e.target.value)}
      />
    );
  };

  const toggleAction = (e, data) => {
    const id = data && data.id;
    setSelectedRow(data);
    spiltBtnReferance.current &&
      spiltBtnReferance.current[id] &&
      spiltBtnReferance.current[id].toggle(e);
  };

  const renderActions = (data, props) => {
    return (
      <div>
        <Menu
          model={actionMenus}
          popup
          ref={(ref) => (spiltBtnReferance.current[data.id] = ref)}
        />
        <Button
          icon="pi pi-ellipsis-v"
          rounded
          text
          raised
          severity="secondary"
          onClick={(e) => toggleAction(e, data)}
        />
      </div>
    );
  };
  const renderCellBody = (rowData,rowKey) => {
   return <div>{rowData[rowKey] ? rowData[rowKey] : "-" }</div>
  }
  const renderColumn = (colData = []) => {
    return colData.map((col, index) => {
      const { isCustom, body } = col;
      return (
        <Column
          key={`col-${index}`}
          field={col.field}
          header={col.label}
          headerStyle={{ textTransform: "capitalize" }}
          filter
          sortable
          filterPlaceholder={col.filterPlaceholder || ""}
          style={{ fontSize: "0.9rem" }}
          body={(row)=>renderCellBody(row,col.field)}
          editor={(option) => textEditor(option)}
        />
      );
    });
  };

  const handleSearch = (value) => {
    let filtersData = { ...filter };
    filtersData["global"].value = value;
    setFilter(filtersData);
    setGlobalValue((prev) => ({ ...prev, globalFilterValue: value }));
  };

  const updateColumn = (e) => {
    setColumn(e.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex align-items-center justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalValue.globalFilterValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
          <i
            className="pi pi-filter ml-2 cursor-pointer"
            style={{ fontSize: "1.5rem" }}
            onClick={() => {
              setVisible(true);
            }}
          ></i>
        </span>
        <MultiSelect
          value={availableColumn}
          onChange={updateColumn}
          options={columnData}
          optionLabel="label"
          placeholder="Select Column"
          className="w-20rem"
          filter
          fixedPlaceholder={true}
          maxSelectedLabels={0}
        />
      </div>
    );
  };

  const allowExpansion = (rowData, key) => {
    if ( rowData && rowData[key] && Array.isArray(rowData[key]) && rowData[key].length) {
      return rowData[key].length > 0;
    }
    //  else {
    //   return Object.keys(rowData[key])?.length > 0;
    // }
  };

  const rowExpansionTemplate = (data, expandableColumnData, expandableKey) => {
    console.log(data, "data");
    if (data[expandableKey]?.length) {
      return (
        <DataTable value={data[expandableKey]}>
          {expandableColumnData &&
            expandableColumnData.map((item, index) => {
              return (
                <Column
                  key={`col-${index}`}
                  field={item.field}
                  header={item.label}
                />
              );
            })}
        </DataTable>
      );
    } else {
      const gridData = data[expandableKey];
      console.log(gridData, "gridData");
      let keys = [];
      for (const key in gridData) {
        keys.push(key);
      }
      if (keys.length) {
        return (
          <>
            <div className="info-card-section">
              {keys && keys.length > 0 ? (
                keys.map((keys, index) => {
                  if (typeof gridData[keys] === "object") {
                    return null;
                  }
                  return (
                    <div key={index}>
                      <p className="grid-head">{keys}</p>
                      <p>{gridData[keys]}</p>
                    </div>
                  );
                })
              ) : (
                <div>No Data</div>
              )}
            </div>

            {/* <div
            className="gridView"
          >
            {keys.map((keys, index) => {
              if (typeof gridData[keys] === "object") {
                return null;
              }
              return (
                <div className="gridDetailsAlign"
                  key={index}
                >
                  <div
                    className="subHeading textCapitalize"
                  >
                    {keys}
                  </div>
                  <div>
                    <p className="margin-0">{gridData[keys]}</p>
                  </div>
                </div>
              );
            }
            )}
          </div> */}
          </>
        );
      }
    }
  };

  const updateKeyfilters = (Fields) => {
    const updatedKey = {};
    for (const fieldKey of Fields) {
      updatedKey[fieldKey] = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      };
    }
    setFilter((prev) => ({ ...prev, ...updatedKey }));
  };

  const updateColumnData = useCallback(() => {
    const colData = [];
    for (const rowKey of Object.keys(rowData[0])) {
      const value = rowData[0][rowKey];
      if (typeof value === "string" || typeof value === "number") {
        colData.push({
          field: rowKey,
          label: rowKey.includes("_") ? rowKey.split("_").join(" ") : rowKey,
        });
      }
    }
    setColumnData(colData);
  }, [rowData]);

  useEffect(() => {
    if (columnData && columnData.length > 0) {
      const globalFields = columnData.map((values) => values.field);
      updateKeyfilters(globalFields);
      setGlobalValue((prev) => ({ ...prev, globalFilterFields: globalFields }));
      if (availableColumn.length === 0) {
        setColumn(columnData);
      }
    }
  }, [columnData, availableColumn]);

  useEffect(() => {
    if (rowData && rowData.length > 0) {
      updateColumnData();
    }
  }, [rowData, updateColumnData]);

  const renderValueField = (
    criteriaId,
    itemId,
    queriId,
    columnName,
    condition
  ) => {
    const renderData = tableData.map((item) => item[columnName]);
    let newCriteriaData = criteriaData.map((item) => {
      return { ...item, items: [...item.items] };
    });
    if (condition == "isAnything" || condition == "isEmpty") {
      return false;
    }
    switch (columnName) {
      case "id":
        return (
          <InputText
            className="w-17rem"
            type="number"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "text")
            }
          />
        );
      case "code":
        return (
          <AutoComplete
            className="w-18rem"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            suggestions={filterItems}
            completeMethod={() => filterSearch(renderData)}
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "drop")
            }
            dropdown
            placeholder="-- choose field --"
          />
        );
      case "name":
        return (
          <InputText
            className="w-17rem"
            type="text"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "text")
            }
          />
        );
      case "description":
        return (
          <InputText
            className="w-17rem"
            type="text"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "text")
            }
          />
        );
      case "image":
        return (
          <AutoComplete
            className="w-18rem"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            suggestions={filterItems}
            completeMethod={() => filterSearch(renderData)}
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "drop")
            }
            dropdown
            placeholder="-- choose field --"
          />
        );
      case "price":
        return (
          <InputText
            className="w-17rem"
            type="number"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "text")
            }
          />
        );
      case "category":
        return (
          <AutoComplete
            className="w-18rem"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            suggestions={filterItems}
            completeMethod={() => filterSearch(renderData)}
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "drop")
            }
            dropdown
            placeholder="-- choose field --"
          />
        );
      case "quantity":
        return (
          <AutoComplete
            className="w-18rem"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            suggestions={filterItems}
            completeMethod={() => filterSearch(renderData)}
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "drop")
            }
            dropdown
            placeholder="-- choose field --"
          />
        );
      case "inventory Status":
        return (
          <AutoComplete
            className="w-18rem"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            suggestions={filterItems}
            completeMethod={() => filterSearch(renderData)}
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "drop")
            }
            dropdown
            placeholder="-- choose field --"
          />
        );
      case "rating":
        return (
          <AutoComplete
            className="w-18rem"
            value={
              newCriteriaData[criteriaId].items[itemId].queries[queriId].value
            }
            suggestions={filterItems}
            completeMethod={() => filterSearch(renderData)}
            onChange={(e) =>
              handleValue(e, criteriaId, itemId, queriId, "drop")
            }
            dropdown
            placeholder="-- choose field --"
          />
        );
      default:
        break;
    }
  };

  const handleColumnName = (value, criteriaId, itemId, queriId) => {
    let newCriteriaData = criteriaData.map((data) => {
      return {
        ...data,
        items: [...data.items],
      };
    });
    newCriteriaData[criteriaId].items[itemId].queries[queriId].value = "";
    newCriteriaData[criteriaId].items[itemId].queries[queriId].columnName =
      value;
    newCriteriaData[criteriaId].items[itemId].queries[queriId].condition =
      filterState[0];
    setCriteriaData(newCriteriaData);
  };
  const handleCondition = (value, criteriaId, itemId, queriId) => {
    let newCriteriaData = criteriaData.map((data) => {
      return {
        ...data,
        items: [...data.items],
      };
    });
    newCriteriaData[criteriaId].items[itemId].queries[queriId].condition =
      value;
    setCriteriaData(newCriteriaData);
  };

  const handleValue = (e, criteriaId, itemId, queriId, type) => {
    let newCriteriaData = criteriaData.map((data) => {
      return {
        ...data,
        items: [...data.items],
      };
    });
    if ((type = "text")) {
      newCriteriaData[criteriaId].items[itemId].queries[queriId].value =
        e.target.value;
    } else {
      newCriteriaData[criteriaId].items[itemId].queries[queriId].value =
        e.target.value.value;
    }
    setCriteriaData(newCriteriaData);
  };
  const handleAND = (criteriaId, itemId, queriId, relationship) => {
    let newCriteriaData = criteriaData.map((data) => {
      return {
        ...data,
        items: [...data.items],
      };
    });
    if (newCriteriaData[criteriaId].items[itemId].queries.length == 1) {
      newCriteriaData[criteriaId].items[itemId].relationship = "AND";
      newCriteriaData[criteriaId].items[itemId].queries[queriId].relationship =
        "AND";
      newCriteriaData[criteriaId].items[itemId].queries = [
        ...newCriteriaData[criteriaId].items[itemId].queries,
        {
          queriId: `queri${UID}`,
          relationship: "AND",
          columnName: "",
          condition: "",
          value: "",
        },
      ];
      setCriteriaData(newCriteriaData);
    } else if (relationship == "AND") {
      newCriteriaData[criteriaId].items[itemId].queries = [
        ...newCriteriaData[criteriaId].items[itemId].queries,
        {
          queriId: `queri${UID}`,
          relationship: "AND",
          columnName: "",
          condition: "",
          value: "",
        },
      ];
      setCriteriaData(newCriteriaData);
    } else {
      newCriteriaData[criteriaId].items = [
        ...newCriteriaData[criteriaId].items,
        {
          itemId: `item${UID}`,
          relationship: "AND",
          queries: [
            {
              queriId: `queri${UID}`,
              relationship: "AND",
              columnName: "",
              condition: "",
              value: "",
            },
          ],
        },
      ];
      setCriteriaData(newCriteriaData);
    }
  };

  const handleOR = (criteriaId, itemId, queriId, relationship, id, itemID) => {
    let newCriteriaData = criteriaData.map((data) => {
      return {
        ...data,
        items: [...data.items],
      };
    });
    if (newCriteriaData[criteriaId].items[itemId].queries.length == 1) {
      const newORData =
        newCriteriaData[criteriaId].items[itemId].queries[queriId];
      newCriteriaData[criteriaId].items[itemId].relationship = "OR";
      newCriteriaData[criteriaId].items[itemId].queries[queriId].relationship =
        "OR";
      newCriteriaData[criteriaId].items[itemId].queries = [
        ...newCriteriaData[criteriaId].items[itemId].queries,
        {
          queriId: `queri${UID}`,
          relationship: "OR",
          columnName: newORData.columnName,
          condition: newORData.condition,
          value: "",
        },
      ];
      setCriteriaData(newCriteriaData);
    } else if (relationship == "OR") {
      const newORData =
        newCriteriaData[criteriaId].items[itemId].queries[queriId];
      newCriteriaData[criteriaId].items[itemId].queries.splice(queriId, 0, {
        queriId: `queri${UID}`,
        relationship: "OR",
        columnName: newORData.columnName,
        condition: newORData.condition,
        value: "",
      });
      setCriteriaData(newCriteriaData);
    } else if (relationship == "AND") {
      const newORData =
        newCriteriaData[criteriaId].items[itemId].queries[queriId];
      const removeANDData = newCriteriaData[criteriaId].items.filter(
        (data) => data.itemId !== itemID
      );

      const removeItemIndexOF = newCriteriaData[criteriaId].items[
        itemId
      ].queries
        .map((item) => item.queriId)
        .indexOf(id);
      const beforeRemoveData = newCriteriaData[criteriaId].items[
        itemId
      ].queries.slice(0, removeItemIndexOF);
      const afterRemoveData = newCriteriaData[criteriaId].items[
        itemId
      ].queries.slice(
        removeItemIndexOF + 1,
        newCriteriaData[criteriaId].items[itemId].queries.length
      );

      if (newCriteriaData[criteriaId].items.length == 1) {
        newCriteriaData[criteriaId].items = [
          beforeRemoveData.length > 0 && {
            itemId: `item-1-${UID}`,
            relationship: "AND",
            queries: beforeRemoveData,
          },
          {
            itemId: `item-2-${UID}`,
            relationship: "OR",
            queries: [
              {
                queriId: `queri${id}`,
                relationship: "OR",
                columnName: newORData.columnName,
                condition: newORData.condition,
                value: "",
              },
              {
                queriId: `queri-1-${UID}`,
                relationship: "OR",
                columnName: newORData.columnName,
                condition: newORData.condition,
                value: "",
              },
            ],
          },
          afterRemoveData.length > 0 && {
            itemId: `item-4-${UID}`,
            relationship: "AND",
            queries: afterRemoveData,
          },
        ].filter(Boolean);
        setCriteriaData(newCriteriaData);
      } else {
        newCriteriaData[criteriaId].items = removeANDData;
        newCriteriaData[criteriaId].items = [
          ...newCriteriaData[criteriaId].items,
          beforeRemoveData.length > 0 && {
            itemId: `item-1-${UID}`,
            relationship: "AND",
            queries: beforeRemoveData,
          },
          {
            itemId: `item-2-${UID}`,
            relationship: "OR",
            queries: [
              {
                queriId: `queri${id}`,
                relationship: "OR",
                columnName: newORData.columnName,
                condition: newORData.condition,
                value: "",
              },
              {
                queriId: `queri-1-${UID}`,
                relationship: "OR",
                columnName: newORData.columnName,
                condition: newORData.condition,
                value: "",
              },
            ],
          },
          afterRemoveData.length > 0 && {
            itemId: `item-4-${UID}`,
            relationship: "AND",
            queries: afterRemoveData,
          },
        ].filter(Boolean);
        setCriteriaData(newCriteriaData);
      }
    }
  };

  const handleDelete = (criteriaId, itemId, id, itemID, criteriaID) => {
    let newCriteriaData = criteriaData.map((data) => {
      return {
        ...data,
        items: [...data.items],
      };
    });
    const removeQueriData = newCriteriaData[criteriaId].items[
      itemId
    ].queries.filter((data) => data.queriId !== id);
    if (
      newCriteriaData[criteriaId].items[itemId].queries.length > 1 ||
      newCriteriaData[criteriaId].items.length > 1 ||
      newCriteriaData.length > 1
    ) {
      if (removeQueriData.length > 0) {
        newCriteriaData[criteriaId].items[itemId].queries = removeQueriData;
        setCriteriaData(newCriteriaData);
      } else {
        const removeItemData = newCriteriaData[criteriaId].items.filter(
          (data) => data.itemId !== itemID
        );
        newCriteriaData[criteriaId].items = removeItemData;
        if (newCriteriaData[criteriaId].items == 0) {
          const removeCriteriaData = newCriteriaData.filter(
            (data) => data.id !== criteriaID
          );
          newCriteriaData = removeCriteriaData;
          setCriteriaData(newCriteriaData);
        } else {
          setCriteriaData(newCriteriaData);
        }
      }
    } else {
      setCriteriaData(initialCriteriaData);
    }
  };

  return isLoading ? (
    // <TeamTableLoader />
    <></>
  ) : (
    <main>
      <DataTable
        value={rowData}
        paginator={pagination}
        rows={8}
        dataKey="id"
        responsiveLayout="scroll"
        filters={filter}
        filterDisplay="menu"
        loading={isLoading}
        selectionMode="single"
        onSelectionChange={onRowSelection}
        editMode="row"
        onRowEditComplete={() => {}}
        globalFilterFields={globalValue.globalFilterFields}
        header={renderHeader}
        emptyMessage="No Data Found."
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={(e) =>
          rowExpansionTemplate(e, expandableColumnData, expandableKey)
        }
      >
        {isExpandable && expandableKey && (
          <Column
            expander={(e) => allowExpansion(e, expandableKey)}
            style={{ width: "5rem" }}
          />
        )}
        {renderColumn(availableColumn)}
        {actionRequired === true && (
          <Column
            field=""
            header="Action"
            align="center"
            style={{ width: "2.5rem" }}
            body={(data, props) => renderActions(data, props)}
          />
        )}
      </DataTable>
      <Dialog
        header="Set Filter"
        visible={visible}
        position={"top"}
        footer={footerContent}
        style={{ width: "80vw" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        {criteriaData.map((item, criteriaId) => (
          <div className="creteria-main">
            <p>All of these conditions must be met</p>
            {item.items.map(
              ({ queries, itemId: itemID, relationship }, itemId) => (
                <div className="items">
                  {queries.map((itemdata, queriId) => (
                    <div className="filter-sec">
                      <div class="grid">
                        <div class="col-3">
                          <div className="card flex-0 justify-content-center sec">
                            <AutoComplete
                              className="w-18rem"
                              value={itemdata?.columnName}
                              suggestions={items}
                              completeMethod={search}
                              onChange={(e) =>
                                handleColumnName(
                                  e.value,
                                  criteriaId,
                                  itemId,
                                  queriId
                                )
                              }
                              dropdown
                              placeholder="-- choose field --"
                            />
                          </div>
                        </div>
                        <div class="col-3">
                          <div className="card flex-0 justify-content-center sec">
                            <Dropdown
                              value={itemdata.condition}
                              onChange={(e) =>
                                handleCondition(
                                  e.value,
                                  criteriaId,
                                  itemId,
                                  queriId
                                )
                              }
                              options={itemdata.columnName && filterState}
                              optionLabel="name"
                              className="w-18rem"
                            />
                          </div>
                        </div>
                        <div class="col-3">
                          <div className="card flex-0 justify-content-center sec">
                            {renderValueField(
                              criteriaId,
                              itemId,
                              queriId,
                              itemdata.columnName,
                              itemdata.condition?.code
                            )}
                          </div>
                        </div>
                        <div class="col-3">
                          <div className="card flex justify-content-center sec">
                            <Button
                              onClick={() =>
                                handleDelete(
                                  criteriaId,
                                  itemId,
                                  itemdata.queriId,
                                  itemID,
                                  item.id
                                )
                              }
                              icon="pi pi-minus-circle"
                              severity="secondary"
                              className="border-round-3xl mr-2 icon minus"
                              size="small"
                              text
                              raised
                              tooltip="Remove this condition"
                              tooltipOptions={{ position: "bottom" }}
                            />
                            <Button
                              onClick={() =>
                                handleOR(
                                  criteriaId,
                                  itemId,
                                  queriId,
                                  itemdata.relationship,
                                  itemdata.queriId,
                                  itemID
                                )
                              }
                              label="OR"
                              severity="secondary"
                              className="border-round-3xl mr-2 bg-yellow-100 icon"
                              text
                              raised
                              tooltip="Add OR condition"
                              tooltipOptions={{ position: "bottom" }}
                            />
                            <Button
                              disabled={
                                itemdata.relationship == "OR" &&
                                criteriaData[criteriaId].items[itemId].queries
                                  .length -
                                  1 !==
                                  queriId
                              }
                              onClick={() =>
                                handleAND(
                                  criteriaId,
                                  itemId,
                                  queriId,
                                  itemdata.relationship
                                )
                              }
                              label="AND"
                              severity="secondary"
                              className="border-round-3xl  bg-cyan-200 icon"
                              text
                              raised
                              tooltip="Add AND condition"
                              tooltipOptions={{ position: "bottom" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {relationship && (
                    <Divider align="center" className="mt-3">
                      <div className="inline-flex align-items-center">
                        <b>{relationship}</b>
                      </div>
                    </Divider>
                  )}
                </div>
              )
            )}
          </div>
        ))}
        <div className="new-criteria">
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>or</b>
            </div>
          </Divider>
          <Button
            label="New Criteria"
            severity="secondary"
            className="border-round-3xl"
            text
            raised
            onClick={() =>
              setCriteriaData([
                ...criteriaData,
                {
                  id: `criteria${UID}`,
                  items: [
                    {
                      itemId: `item${UID}`,
                      queries: [
                        {
                          queriId: `queri${UID}`,
                          relationship: "",
                          columnName: "",
                          condition: "",
                          value: "",
                        },
                      ],
                    },
                  ],
                },
              ])
            }
          />
        </div>
      </Dialog>
    </main>
  );
}
export default DataTablePOC;

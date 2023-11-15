import React, { memo, useEffect, useState } from "react";
import { Input, Select } from "@/components/common";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  SelectOptionType,
  FormPropType,
  CheckBoxType,
} from "../../../constants/types";
import JSON from "../../../constants/data.json";

const Indicators: React.FC<FormPropType> = ({ state, setstate }) => {
  const [checkBoxField, setCheckBoxField] = useState<CheckBoxType[]>([]);
  const handleInputValue = (e: SelectOptionType) => {
    const { name, value } = e;
    setstate({ ...state, [name]: value });
  };
  useEffect(() => {
    if (JSON.checkboxFields.length) {
      setCheckBoxField(JSON.checkboxFields);
      const updatedFormData = { ...state };
      JSON.checkboxFields.forEach((data) => {
        updatedFormData[data.name as string] = data.checked;
      });
      setstate(updatedFormData);
    }
  }, []);

  const handleCheckbox = (e: CheckboxChangeEvent) => {
    const { name, checked } = e.target;
    setCheckBoxField((prevField: CheckBoxType[]) => {
      const updatedCheckBox = [...prevField];
      const idx = updatedCheckBox.findIndex((fields) => fields.name === name);
      updatedCheckBox[idx].checked = checked;
      return updatedCheckBox;
    });
    setstate({ ...state, [name as string]: checked });
  };

  return (
    <div className="w-[28rem]">
      <h1 className="font-bold text-xl text-gray-700 py-3">Indicators</h1>
      <form
        className="flex flex-wrap justify-between p-5 bg-white rounded-md"
        onSubmit={(e) => console.log(e)}
      >
        <Select
          name="recordType"
          label={"Record Type"}
          inputValue={handleInputValue}
          inputSize="small"
          inputAction={true}
          options={JSON.selectOptions.recordType}
        />
        <Select
          name="styleCode"
          label={"Style Code"}
          inputValue={handleInputValue}
          inputSize="small"
          inputAction={true}
          options={JSON.selectOptions.styleCode}
        />
        <Input
          name="tn"
          label={"TN"}
          inputValue={handleInputValue}
          inputSize="large"
        />
        <Input
          name="mtn"
          label={"MTN"}
          inputValue={handleInputValue}
          inputSize="large"
        />
        <Input
          name="nonStdTn"
          label={"Non-Std TN"}
          inputValue={handleInputValue}
          inputSize="large"
        />
        <div className="flex justify-between flex-col w-full">
          {checkBoxField?.map((o: CheckBoxType) => (
            <div key={o.name} className="flex justify-between py-3">
              <label
                htmlFor={o.label}
                className={`${
                  !o.isVisible ? "text-gray-200" : "text-gray-600"
                } block text-sm font-semibold`}
              >
                {o.label}
              </label>
              <Checkbox
                name={o.name}
                disabled={!o.isVisible}
                checked={o.checked}
                onChange={handleCheckbox}
              ></Checkbox>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default memo(Indicators);

import React, { memo } from "react";
import { SelectOptionType, FormPropType } from "../../../constants/types";
import JSON from "../../../constants/data.json";
import { Button, Input, Select } from "@/components/common";

const General: React.FC<FormPropType> = ({ state, setstate }) => {
  const handleInputValue = (e: SelectOptionType) => {
    const { name, value } = e;
    setstate({ ...state, [name]: value });
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-gray-700 py-3">General</h1>
      <div className="flex flex-wrap justify-between p-5 bg-white rounded-md">
        <Select
          options={JSON.selectOptions.textType}
          name="textType"
          inputValue={handleInputValue}
          inputAction={true}
          label="Text Type"
          inputSize="medium"
        />
        <Select
          options={JSON.selectOptions.listingType}
          name="listingType"
          inputValue={handleInputValue}
          inputAction={true}
          label="Listing Type"
          inputSize="medium"
        />
        <Select
          options={JSON.selectOptions.acctType}
          name="acctType"
          inputValue={handleInputValue}
          inputAction={true}
          label="Acct Type"
          inputSize="medium"
        />
        <Select
          options={JSON.selectOptions.recArea}
          name="recArea"
          inputValue={handleInputValue}
          inputAction={true}
          label="REC Area"
          inputSize="medium"
        />
        <Input
          name="fdn"
          inputValue={handleInputValue}
          label="FDN"
          inputSize="medium"
        />
        <Input
          name="fdnSection"
          inputValue={handleInputValue}
          label="FDN Section"
          inputSize="medium"
        />
        <Input
          name="yphCode"
          inputValue={handleInputValue}
          label="YPH Code"
          inputSize="medium"
        />
        <Input
          name="lde"
          inputValue={handleInputValue}
          label="LDE"
          inputSize="medium"
        />
        <div className="flex flex-wrap w-full justify-between">
          <Input
            name="textLine"
            inputValue={handleInputValue}
            inputSize="xLarge"
            label="Text Line"
          />
          <Input
            name="sicCode"
            inputValue={handleInputValue}
            inputSize="xLarge"
            label="Sic Code"
          />
        </div>
        <div className="flex justify-center gap-5 w-full py-6">
            <Button title="Clear" btnType="secondary" />
            <Button title="Save"  btnType="primary"/>
        </div>
      </div>
    </div>
  );
};

export default memo(General);

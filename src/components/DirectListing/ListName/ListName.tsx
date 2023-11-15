import React, { memo } from "react";
import { Input } from "@/components/common";
import { SelectOptionType, FormPropType } from "../../../constants/types";

const listName: React.FC<FormPropType> = ({ state, setstate }) => {
  const handleInputValue = (e: SelectOptionType) => {
    const { name, value } = e;
    setstate({ ...state, [name]: value });
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-gray-700 py-3">Listed Name</h1>
      <form className="flex flex-wrap justify-between p-5 bg-white rounded-md">
        <Input
          name="firstName"
          inputValue={handleInputValue}
          label="First Name"
          inputSize="large"
        />
        <Input
          name="lastName"
          inputValue={handleInputValue}
          label="Last Name"
          inputSize="large"
        />
        <Input
          name="addressOne"
          inputValue={handleInputValue}
          label="Address Title 1"
          inputSize="large"
        />
        <Input
          name="addressTwo"
          inputValue={handleInputValue}
          label="Address Title 1"
          inputSize="large"
        />
        <Input
          name="pla"
          inputValue={handleInputValue}
          label="PLA"
          inputSize="large"
        />
        <Input
          name="linageTitle"
          inputValue={handleInputValue}
          label="Lineage Title"
          inputSize="large"
        />
        <Input
          name="designation"
          inputValue={handleInputValue}
          label="Designation"
          inputSize="large"
        />
        <Input
          name="state"
          inputValue={handleInputValue}
          label="State"
          inputSize="large"
        />
      </form>
    </div>
  );
};

export default memo(listName);

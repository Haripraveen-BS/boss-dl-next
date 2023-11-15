import React from 'react';
import Image from 'next/image';
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";
import Save from "../../../assets/svg/check.svg";
import Close from "../../../assets/svg/close.svg";
import Open from "../../../assets/svg/expand.svg";

interface IconType {
  [key: string]: JSX.Element;
}

interface IconProps extends React.HTMLProps<HTMLDivElement> {
  type: "edit" | "delete" | "save" | "close" | "open";
  classname?: string;
}
// eslint-disable-next-line react/prop-types
const Icons: React.FC<IconProps> = ({ type='edit', classname, ...restProps }) => {
  const icons: IconType = {
    edit: Edit,
    delete: Delete,
    save: Save,
    close: Close,
    open: Open,
  };

  return (
    <div className={`${classname}  p-1.5 bg-blue-200 rounded-md`} {...restProps}>
      <Image 
          src={icons[type]}
          alt="profile"
        />
    </div>
  );
};
export default Icons;

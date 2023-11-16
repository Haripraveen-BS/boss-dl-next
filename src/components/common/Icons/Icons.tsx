import React from 'react';
import Image from 'next/image';
import EditIcon from "@/assets/svg/edit.svg";
import DeleteIcon from "@/assets/svg/delete.svg";
import SaveIcon from "@/assets/svg/check.svg";
import CloseIcon from "@/assets/svg/close.svg";
import OpenIcon from "@/assets/svg/expand.svg";
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface IconType {
  [key: string]: StaticImport;
}

interface IconProps extends React.HTMLProps<HTMLDivElement> {
  type: "edit" | "delete" | "save" | "close" | "open";
  classname?: string;
}

const Icons: React.FC<IconProps> = ({ type = 'edit', classname, ...restProps }) => {
  const icons: IconType = {
    edit: EditIcon,
    delete: DeleteIcon,
    save: SaveIcon,
    close: CloseIcon,
    open: OpenIcon,
  };

  return (
    <div className={`${classname} p-1.5 bg-yellow-200 rounded-md`} {...restProps}>
      <Image 
        src={icons[type]}
        alt={type}
        width={18}
        height={18}
      />
    </div>
  );
};

export default Icons;

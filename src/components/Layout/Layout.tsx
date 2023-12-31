import React, { useEffect } from "react";
import {Tabs, Header} from "@/components/common";
import { ROUTE_CONSTANTS } from "../../constants/routeConstants";
import { TabItem } from "../../constants/types";
import { useAppDispatch } from "../../hooks";
import { setActiveTab } from "../../reducers/baseSlice";
import { useRouter } from "next/router";
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}:LayoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const items: TabItem[] = [
    {
      key: "1",
      label: "Listing Search",
      page: "HOME",
      path: "/"
    },
    {
      key: "2",
      label: "Direct Listing",
      page: "DIRECT_LISTING",
      path: "/directListing"
    },
    {
      key: "3",
      label: "Complex Listing",
      page: "COMPLEX_LISTING",
      path: '/complexListing'
    },
  ];
    
  useEffect(()=>{
    items.find((item: TabItem) => item.path == router.pathname && dispatch(setActiveTab(item.key)));
  },[router.pathname]);
  const handleTabChange = (tab: TabItem) => {
    dispatch(setActiveTab(tab.key));
    router.push(ROUTE_CONSTANTS[tab.page]);
  };
  return (
    <div className="w-full bg-gray-50">
      <div className="fixedContainer h-44">
        <Header />
        <Tabs
          items={items}
          tabchange={handleTabChange}
        />
      </div>
      <div className="childContainer w-full h-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;

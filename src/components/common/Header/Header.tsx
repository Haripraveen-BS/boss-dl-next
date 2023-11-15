import React from "react";
import Image from 'next/image';

import Profile from '@/assets/svg/profile.svg'
import Logout from '@/assets/svg/logout.svg'

function Header() {
  const nav = ["Help"];
  return (
    <div className="bg-blue-700 w-full h-12 text-white flex justify-between items-center px-12">
      <div className="text-2xl font-bold">BOSS DL</div>
      <div className="flex gap-5">
        <div className="navigations flex gap-5 mr-10 ">
          {nav?.map((n, i) => (
            <a href={"#"} className="font-semibold" key={i}>
              {n}
            </a>
          ))}
        </div>
        <Image 
          src={Profile}
          alt="profile"
        />
        <Image 
          src={Logout}
          alt="logout"
        />
      </div>
    </div>
  );
}

export default Header;

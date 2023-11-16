import React from "react";
import Image from 'next/image';

import Profile from '@/assets/svg/profile.svg'
import Logout from '@/assets/svg/logout.svg'
import Logo from '@/assets/svg/logo.svg'

function Header() {
  const nav = ["Home", " Data Extract"];
  return (
    <div className="text-black w-full h-20 fixed bg-white z-30 flex justify-between items-center pb-1 px-12 py-3 shadow-md border-black">
      <div className="flex">
        <Image
          src={Logo}
          alt="Logo"
        />
        <span className="font-bold text-black text-5xl ml-4">BOSS DL</span>
      </div>
      <div className="flex items-center gap-5">
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
          width={40}
        />
        <Image
          src={Logout}
          alt="logout"
          width={40}
        />
      </div>
    </div>
  );
}

export default Header;

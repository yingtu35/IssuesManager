'use client'

import { SignOut } from "@/components/auth-components"
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";

// TODO: make dropdown close when user clicks outside of the dropdown, but stay open when user clicks inside the dropdown
export default function UserIcon({ user } : { user: User }) {
  const [showMenu, setShowMenu] = useState(false);
  const profileImage = user.image ? user.image : "/user.png";
  return (
    <div className="relative inline-block">
      <button 
        onFocus={() => setShowMenu(true)}
        // onBlur={() => setShowMenu(false)}
        onClick={() => setShowMenu(!showMenu)}
        type="button"
      >
        <Image
          src={profileImage}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>

  {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
      { showMenu && 
        <div className="absolute w-32 right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
          <div className="py-1 text-right" role="none">
            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
            <p className="text-gray-700 block px-4 py-2 text-sm" tabIndex={-1} id="menu-header">Sign in as <br /> <strong>{user.name}</strong></p>
          </div>
          <div className="py-1" role="none">
            <SignOut />
          </div>
        </div>
      }
    </div>
    // <div className="flex items-center">
    //   <Image
    //     src={profileImage}
    //     alt="user avatar"
    //     width={40}
    //     height={40}
    //     className="rounded-full"
    //   />
    //   <p>{user.name}</p>
    //   <SignOut />
    // </div>
  )
}
import { FiMenu } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import Image from "../Image";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Header({ onMenuClick }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="bg-[#FFFFFF] flex items-center px-6 py-3.5 relative border-b border-[#E5E7EB]">
      <button
        onClick={onMenuClick}
        className="2xl:hidden p-2 rounded bg-[#2563EB] text-white cursor-pointer"
      >
        <FiMenu size={22} />
      </button>

      <div className="flex items-center justify-between w-full">

        <div className="  hidden md:block relative ">

          <input
            type="text"
            placeholder="Search..."
            className="px-10 py-2.5 rounded-full border border-[#E2E8F0] outline-none  focus:ring-[#2563EB] w-[450px] text-[#64748B] placeholder:text-[#64748B]"
          />

          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-[#64748B]"/>
        </div>



        <div className="flex items-center ml-auto gap-4">
        <IoIosNotificationsOutline className="w-9 h-9 text-[#0F172A] cursor-pointer" />

        {/* Profile Section */}
        <div className="relative">
          <div
            className="flex items-center gap-3  px-3 py-2  rounded-lg cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <Image
              src="/logo.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-base text-[#0F172A] font-medium font-montserrat">John Doe</p>
              {/* <p className="text-xs text-white">Admin</p> */}
            </div>

            <FaAngleDown
              className={`w-4 h-4 text-[#0F172A] transition-transform duration-200 ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown */}
          {openDropdown && (
            <div className="absolute w-full right-0 mt-2  bg-white rounded-lg shadow-lg border border-[#A0A0A0] z-50">
              {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </button> */}
              <Link to="/settings" onClick={() => setOpenDropdown(false)}>
              <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-[#0A0A0A] hover:bg-[#2D468A] hover:text-white transition cursor-pointer">
                <Icon
                  icon="material-symbols:settings"
                  width="20"
                />
                Settings
              </button>
              </Link>
              <button onClick={() => setOpenDropdown(false)} className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-[#E7000B] hover:bg-[#2D468A] hover:text-white transition cursor-pointer">
                <Icon icon="material-symbols:logout" width="20" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}

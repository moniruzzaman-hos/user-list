"use client";

import useWindowDimensions from "@/utilities/useWindowDimentions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

const Header = () => {
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const [show, setShow] = useState(false);

  const isContact = pathname === "/contact";
  const isUsers = pathname === "/users";
  const isHome = pathname === "/";

  const menuItem = (
    <div className="flex absolute left-5 top-12 z-10 cursor-pointer select-none rounded-lg text-accent justify-end gap-2 flex-col items-end bg-slate-400 p-2">
      <Link
        className="h-8 flex px-4 justify-center rounded-lg items-center hover:bg-teal-500 w-full"
        href={"/"}
      >
        Home
      </Link>
      <Link
        className="h-8 flex px-4 justify-center rounded-lg items-center hover:bg-teal-500 w-full"
        href={"/users"}
      >
        Users
      </Link>
      <Link
        className="h-8 flex px-4 justify-center rounded-lg items-center hover:bg-teal-500 w-full"
        href={"/contact"}
      >
        Contact
      </Link>
    </div>
  );

  return (
    <header>
      {width < 768 ? (
        <div className="bg-gray-200 p-4 flex items-center">
          <div onClick={() => setShow(!show)}>
            <MdMenu size={32} className="cursor-pointer" />
          </div>
          {show && menuItem}
        </div>
      ) : (
        <nav className="px-6 h-12 bg-gray-200 flex items-center">
          <ul className="w-full flex md:justify-between flex-col md:flex-row gap-4">
            <li
              className={`w-24 text-center py-2 cursor-pointer hover:bg-neutral-500 rounded-lg ${
                isHome ? "border-teal-700 border-2" : ""
              }`}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className={`w-24 text-center py-2 cursor-pointer hover:bg-neutral-500 rounded-lg ${
                isUsers ? "border-teal-700 border-2" : ""
              }`}
            >
              <Link href={"/users"}>Users</Link>
            </li>
            <li
              className={`w-24 text-center py-2 cursor-pointer hover:bg-neutral-500 rounded-lg ${
                isContact ? "border-teal-700 border-2" : ""
              }`}
            >
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

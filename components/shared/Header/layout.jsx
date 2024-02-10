"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const isUsers = pathname === "/users";
  const isHome = pathname === "/";
  return (
    <header>
      <nav className="px-6 h-12 bg-gray-200 flex md:items-center">
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
    </header>
  );
};

export default Header;

"use client";
import { useState } from "react";
import Link from "next/link";
import { CircleUserRound, LogOut } from "lucide-react";
 // Replace with the actual icon library you're using

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-white py-4">
      <nav className="container mx-auto px-8">
        <ul className="flex justify-between items-center">
          {/* Logo */}
          <li>
            <Link href="/">
              <img
                src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FzekoLogo.52f03e08.svg&w=256&q=75"
                className="h-5 lg:h-8"
                alt="Logo"
              />
            </Link>
          </li>

          {/* Profile Icon */}
          <li className="relative">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
               <CircleUserRound size={
                  window.innerWidth >= 1024 // Desktop (>=1024px)
                    ? 40
                    : window.innerWidth >= 640 // Tablet (>=640px)
                    ? 32
                    : 24 // Mobile (<640px)
                }/>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div
                className="absolute right-0 mt-2 bg-white border rounded shadow-md "
                role="menu"
                aria-label="User menu"
              >
                {/* <button
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                  onClick={() => alert("Sign Up")}
                >
                  Sign Up
                </button> */}
                <button
                  className="gap-8 flex  w-full px-2 py-2 text-left text-black hover:bg-gray-100"
                  onClick={() => alert("Sign Out")}
                >
                  Logout
                  <LogOut color="grey"/>
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

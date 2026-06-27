import React from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/" },
  { id: 3, name: "Kids Wear", link: "/kids" },
  { id: 4, name: "Mens Wear", link: "/mens" },
  { id: 5, name: "Electronics", link: "/" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/" },
  { id: 2, name: "Best Selling", link: "/" },
  { id: 3, name: "Top Rated", link: "/" },
];

const Navbar = ({ handleOrderPopup }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">

      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">

          {/* Logo */}
          <div>
            <Link
              to="/"
              className="font-bold text-2xl sm:text-3xl flex gap-2"
            >
              <img src={Logo} alt="Logo" className="w-10" />
              ClothNest
            </Link>
          </div>

          {/* Search + Cart + Dark Mode */}
          <div className="flex items-center gap-4">

            {/* Search Bar */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search Products..."
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none"
              />
              <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Order Button */}
            <button
              onClick={() => handleOrderPopup?.()}
              className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-2"
            >
              <span>Order</span>
              <FaCartShopping />
            </button>

            {/* Dark Mode */}
            <DarkMode />

          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">

          {Menu.map((data) => (
            <li key={data.id}>
              <Link
                to={data.link}
                className="inline-block px-4 py-2 hover:text-primary duration-200"
              >
                {data.name}
              </Link>
            </li>
          ))}

          {/* Dropdown */}
          <li className="group relative cursor-pointer">
            <span className="flex items-center gap-1 py-2">
              Trending Products
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </span>

            <div className="absolute z-50 hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      to={data.link}
                      className="block rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Sign Out Button */}
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </li>

        </ul>
      </div>

    </div>
  );
};

export default Navbar;

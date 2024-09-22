import { useState } from 'react';
import { Button, Navbar, TextInput } from "flowbite-react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar className="border-b-2 py-2">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <Link
          to="/"
          className="self-center font-serif font-semibold text-xl sm:text-2xl dark:text-white flex-shrink-0"
        >
          <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Real
          </span>
          <span>Estate</span>
        </Link>

        <div className="flex items-center lg:order-last">
          <Button
            className="h-10 w-10 p-2 mr-2"
            color="gray"
            pill
          >
            <FaMoon />
          </Button>

          <Link to="/login">
            <Button gradientDuoTone="purpleToBlue" outline size="sm">
              Login
            </Button>
          </Link>

          <Button
            className="lg:hidden ml-2 h-10 w-10 p-2"
            color="gray"
            pill
            onClick={toggleMenu}
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </Button>
        </div>

        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="lg:flex-grow lg:flex lg:items-center lg:justify-center">
            <form className="mt-4 lg:mt-0 lg:mr-4">
              <TextInput
                type="text"
                placeholder="Search..."
                rightIcon={AiOutlineSearch}
                className="w-full lg:w-64"
              />
            </form>
            <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "text-red-600 dark:text-red-500"
                      : "text-gray-800 dark:text-white"
                  } text-lg`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "text-red-600 dark:text-red-500"
                      : "text-gray-800 dark:text-white"
                  } text-lg`
                }
              >
                About
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
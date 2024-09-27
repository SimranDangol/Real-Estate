import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // Getting currentUser from state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <Navbar className="py-2 border-b-2">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link
          to="/"
          className="self-center flex-shrink-0 font-serif text-xl font-semibold sm:text-2xl dark:text-white"
        >
          <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Real
          </span>
          <span>Estate</span>
        </Link>

        <div className="flex items-center lg:order-last">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img={currentUser?.data?.image} // Use optional chaining with fallback
                  rounded
                  alt="User Profile"
                />
              }
            >
              <Dropdown.Item>
                <Link to="/profile"> View Profile</Link>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button gradientDuoTone="purpleToBlue" outline>
                Login
              </Button>
            </Link>
          )}

          <Button
            className="w-10 h-10 p-2 ml-2 lg:hidden"
            color="gray"
            pill
            onClick={toggleMenu}
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </Button>
        </div>

        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="lg:flex-grow lg:flex lg:items-center lg:justify-center">
            <form onSubmit={handleSubmit} className="mt-4 lg:mt-0 lg:mr-4">
              <TextInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                rightIcon={AiOutlineSearch}
                className="w-full lg:w-64"
              />
            </form>
            <div className="flex flex-col gap-4 mt-4 lg:flex-row lg:mt-0">
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

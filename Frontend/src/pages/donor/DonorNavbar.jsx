import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplets, User, LogOut, UserCircle } from "lucide-react";
import { FaBell } from "react-icons/fa";

const DonorNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-red-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/donor" className="flex items-center space-x-3 text-red-700">
          <Droplets className="w-8 h-8" />
          <span className="text-2xl font-bold">BloodDonation</span>
        </Link>

        {/* Right: All nav links and buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/find-camps"
            className="hover:text-red-600 text-sm font-medium transition duration-150"
          >
            Find Camps
          </Link>
          <Link
            to="/request-blood"
            className="hover:text-red-600 text-sm font-medium transition duration-150"
          >
            Request Blood
          </Link>

          {/* Notification Bell */}
          <Link to="/donor-notifications" className="relative group">
            <FaBell className="text-lg text-red-700 hover:text-red-600 transition duration-200" />
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping border border-white" />
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="rounded-full bg-red-700 text-white p-1.5 focus:outline-none shadow-sm hover:shadow-md transition"
            >
              <UserCircle className="h-7 w-7" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 origin-top-right">
                <Link
                  to="/donor-profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="mr-2 text-red-500 w-4 h-4" /> View Profile
                </Link>
                <hr />
                <button
                  onClick={logout}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-2 text-red-500 w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DonorNavbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Shield, 
  LogOut, 
  Menu, 
  X, 
  Users, 
  Building2, 
  BarChart3
} from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { to: "/manage", icon: <Building2 className="w-4 h-4" />, label: "Manage Camps" },
    { to: "/manage-donors", icon: <Users className="w-4 h-4" />, label: "Manage Donors" }
  ];

  return (
    <nav className="bg-white text-black shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

          {/* Logo/Brand */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-2xl font-bold text-red-600"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-md">
                
              </div>
              <span className="hidden sm:block">Admin Dashboard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-gray-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Logout button */}
          <div className="flex items-center ml-4">
            <button 
              onClick={logout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 border border-transparent hover:border-gray-300"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Mobile logout */}
          <button 
            onClick={logout}
            className="flex items-center space-x-3 w-full text-left text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 border border-transparent hover:border-red-300"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

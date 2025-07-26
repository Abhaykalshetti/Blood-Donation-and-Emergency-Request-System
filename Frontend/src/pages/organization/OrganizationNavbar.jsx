
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Calendar, Users, LogOut, Menu } from "lucide-react";
import { FaBell } from "react-icons/fa";

const OrganizationNavbar = () => {
  const navigate = useNavigate();
 const [hasNotifications, setHasNotifications] = useState(false);


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-red-100 shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="relative flex items-center justify-between h-16">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-3">
        <div className="bg-red-600 p-2 rounded-lg">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <div>
          <Link to="/organization" className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors">
            BloodLink
          </Link>
          <p className="text-sm text-gray-600">Organization Portal</p>
        </div>
      </div>

      {/* Spacer pushes the next content to the right */}
      <div className="flex-grow"></div>

      {/* Right-side Nav Links and Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/camp-details"
          className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-gray-300 group"
        >
          <Calendar size={18} />
          <span>Post Camp</span>
        </Link>
        <Link
          to="/manage-registration"
          className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
        >
          <Users size={18} />
          <span>Manage Registrations</span>
        </Link>
           {/* Notification Bell */}
                   <Link to="/organization-notifications" className="relative group">
                     <FaBell className="text-lg text-red-700 hover:text-red-600 transition duration-200" />
                     {hasNotifications && (
                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping border border-white" />
                     )}
                   </Link>
        <button
          onClick={logout}
          className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm font-medium"
        >

          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-gray-700 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </div>

    {/* Mobile Navigation */}
    <div className="md:hidden mt-4 pt-4 border-t border-red-100">
      <div className="flex flex-col space-y-2">
        <Link
          to="/camp-details"
          className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
        >
          <Calendar size={18} />
          <span>Post Camp</span>
        </Link>
        <Link
          to="/manage-registration"
          className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
        >
          <Users size={18} />
          <span>Manage Registrations</span>
        </Link>
      </div>
    </div>
  </div>
</nav>

  );
};

export default OrganizationNavbar;
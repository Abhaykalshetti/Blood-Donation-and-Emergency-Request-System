
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  CalendarPlus,
  Users,
  Mail,
  Award,
  LogOut,
  CheckSquare,
  Hospital,
  Info,
} from "lucide-react";

const OrganizationDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/organization", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessage(response.data.message);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-red-100">
          <div className="text-center">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hospital className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to Your Dashboard
            </h2>
            {message && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block mb-4 font-medium">
                {message}
              </div>
            )}
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage your blood donation campaigns, connect with donors, and make a difference in your community.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<CalendarPlus className="h-8 w-8 text-red-600" />}
            title="Post Blood Camps"
            description="Create and schedule upcoming blood donation events with detailed information and requirements."
            gradient="from-red-500 to-red-600"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Manage Donor Registrations"
            description="View, verify, and manage registered donors for your blood donation campaigns."
            gradient="from-blue-500 to-blue-600"
          />
          <FeatureCard
            icon={<Mail className="h-8 w-8 text-green-600" />}
            title="Send Notifications"
            description="Keep donors informed with event updates, reminders, and important announcements."
            gradient="from-green-500 to-green-600"
          />
          <FeatureCard
            icon={<Award className="h-8 w-8 text-purple-600" />}
            title="Generate Certificates"
            description="Create and distribute digital certificates to appreciate donor contributions."
            gradient="from-purple-500 to-purple-600"
          />
          <FeatureCard
            icon={<Hospital className="h-8 w-8 text-indigo-600" />}
            title="Partner Hospitals"
            description="Manage relationships with hospitals and medical institutions in your network."
            gradient="from-indigo-500 to-indigo-600"
          />
          <FeatureCard
            icon={<CheckSquare className="h-8 w-8 text-orange-600" />}
            title="Track Participation"
            description="Monitor donation statistics, analyze trends, and measure campaign success."
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        {/* Responsibilities Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-3 rounded-lg">
              <Info className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Your Role & Responsibilities
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ResponsibilityItem text="Host and manage verified blood donation drives" />
              <ResponsibilityItem text="Collaborate with hospitals and certified institutions" />
              <ResponsibilityItem text="Maintain communication with registered users via email" />
            </div>
            <div className="space-y-4">
              <ResponsibilityItem text="Send digital certificates of participation to donors" />
              <ResponsibilityItem text="Verify donor age, health details, and previous donations" />
              <ResponsibilityItem text="Monitor and analyze donation statistics and camp activity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable FeatureCard component
const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className={`bg-gradient-to-r ${gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <div className="text-white">
        {icon}
      </div>
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Responsibility Item component
const ResponsibilityItem = ({ text }) => (
  <div className="flex items-start space-x-3">
    <div className="bg-green-100 rounded-full p-1 mt-0.5">
      <CheckSquare className="h-4 w-4 text-green-600" />
    </div>
    <p className="text-gray-700 leading-relaxed">{text}</p>
  </div>
);

export default OrganizationDashboard;

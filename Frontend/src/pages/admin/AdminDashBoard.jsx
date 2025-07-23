
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Users, 
  Building, 
  Activity, 
  BarChart3, 
  CheckCircle, 
  LogOut,
  UserCheck,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/admin", {
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System Administration & Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        {message && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">{message}</p>
            </div>
          </div>
        )}


        {/* Feature Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Administrative Functions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<UserCheck className="h-8 w-8 text-red-600" />}
              title="Approve Blood Camps"
              description="Review and verify new camp requests from organizations."
              bgColor="bg-red-50"
              borderColor="border-red-200"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-blue-600" />}
              title="Manage Donors"
              description="View all registered donors and validate their eligibility (18+)."
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            />
            <FeatureCard
              icon={<Building className="h-8 w-8 text-green-600" />}
              title="Validate Organizations"
              description="Review organization certificates and approve genuine ones."
              bgColor="bg-green-50"
              borderColor="border-green-200"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-purple-600" />}
              title="Emergency Blood Requests"
              description="Monitor and respond to emergency blood requests quickly."
              bgColor="bg-purple-50"
              borderColor="border-purple-200"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-orange-600" />}
              title="Analytics & Reports"
              description="View data trends: donation stats, active users, camp count."
              bgColor="bg-orange-50"
              borderColor="border-orange-200"
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-teal-600" />}
              title="User Role Validation"
              description="Ensure roles are properly assigned: Donor, Org, Admin."
              bgColor="bg-teal-50"
              borderColor="border-teal-200"
            />
          </div>
        </div>

        {/* Admin Responsibilities Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Admin Responsibilities</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Approve or reject blood donation camp proposals.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Validate age (18+) and eligibility of blood donors.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Review organization registration and certificate validity.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Manage and monitor all emergency blood requests.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Track system-wide analytics and participation stats.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">Manage roles and permissions of users and organizations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Feature Card
const FeatureCard = ({ icon, title, description, bgColor, borderColor }) => (
  <div className={`${bgColor} ${borderColor} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;

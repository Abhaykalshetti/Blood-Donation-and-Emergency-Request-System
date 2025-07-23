
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Building2, Activity, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import TabNavigation from './TabNavigation';
import DonorTable from './DonorTable';
import DonorDialog from './DonorDialog';
import api from '../../services/api';

function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const [activeTab, setActiveTab] = useState('individuals');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  // Fetch donors data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/getAllDonors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setDonors(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching donors:', err);
        setError('Failed to load donors. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter donors based on active tab
  const filteredDonors = React.useMemo(() => {
    return donors.filter(donor => {
      if (activeTab === 'individuals') {
        return donor.userType === 'donor';
      } else {
        return donor.userType === 'bloodbank';
      }
    });
  }, [donors, activeTab]);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const individualDonors = donors.filter(d => d.userType === 'donor').length;
    const bloodBanks = donors.filter(d => d.userType === 'bloodbank').length;
    const totalRegistrations = donors.length;
    const activeToday = donors.filter(d => {
      const today = new Date().toDateString();
      return new Date(d.createdAt || d.registrationDate).toDateString() === today;
    }).length;

    return [
      {
        title: 'Individual Donors',
        value: individualDonors,
        icon: <Users className="w-6 h-6 text-blue-600" />,
        color: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-900'
      },
      {
        title: 'Blood Banks',
        value: bloodBanks,
        icon: <Building2 className="w-6 h-6 text-green-600" />,
        color: 'bg-green-50 border-green-200',
        textColor: 'text-green-900'
      },
      {
        title: 'Total Registered',
        value: totalRegistrations,
        icon: <Activity className="w-6 h-6 text-purple-600" />,
        color: 'bg-purple-50 border-purple-200',
        textColor: 'text-purple-900'
      },
      {
        title: 'New Today',
        value: activeToday,
        icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
        color: 'bg-orange-50 border-orange-200',
        textColor: 'text-orange-900'
      }
    ];
  }, [donors]);

  // Handle dialog open
  const handleOpenProfile = (donor) => {
    setSelectedDonor(donor);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDonor(null);
  };

  // Handle donor deletion
  const handleDelete = async (id) => {
    try {
      // In a real application, you would make an API call to delete the donor
      // await axios.delete(`/api/donors/${id}`);
      
      // Update local state after successful deletion
      setDonors((prev) => prev.filter((donor) => donor._id !== id));
    } catch (err) {
      console.error('Error deleting donor:', err);
      alert('Failed to delete donor. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donor Management</h1>
              <p className="text-gray-600 mt-1">Manage registered donors and blood banks</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Activity className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} border rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Registered Users</h2>
                <p className="text-sm text-gray-600 mt-1">
                  View and manage all registered donors and blood banks
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredDonors.length} of {donors.length} users
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>

          <div className="px-6 pb-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading donors...</h3>
                <p className="text-gray-600">Please wait while we fetch the latest data</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
                  <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
                    {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredDonors.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} found</h3>
                <p className="text-gray-600">
                  {activeTab === 'individuals' 
                    ? 'No individual donors have registered yet.' 
                    : 'No blood banks have registered yet.'}
                </p>
              </div>
            ) : (
              <DonorTable 
                donors={filteredDonors} 
                donorType={activeTab}
                onViewProfile={handleOpenProfile} 
                onDelete={handleDelete} 
              />
            )}
          </div>
        </div>
      </div>

      {selectedDonor && (
        <DonorDialog 
          open={openDialog}
          donor={selectedDonor}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}

export default ManageDonors;


import React, { useEffect, useState } from 'react';
import { Eye, Check, X, Calendar, MapPin, User, Building, Clock, Users } from 'lucide-react';
import axios from "axios";
import CampDetails from './CampDetails';
import api from '../../services/api';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};

function Manage() {
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [camps, setCamps] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let res = await api.get('/api/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCamps(res.data);
      console.log(res.data);
      
    }
    fetchData();
  }, [])

  const handleAccept = async (campId) => {
    console.log(campId);
    
    try {
      const response = await api.patch(`/api/camps/${campId}`, { status: "accepted" }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
    } catch (error) {
      throw new Error(`Failed to update camp status: ${error.message}`);
    }
    setCamps(camps.map(camp => 
      camp._id === campId ? { ...camp, status: 'accepted' } : camp
    ));
  };

  const handleReject = async (campId) => {
    try {
      const response2 = await api.patch(`/api/camps/${campId}`, { status: "rejected" }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
    } catch (error) {
      throw new Error(`Failed to update camp status: ${error.message}`);
    }
    setCamps(camps.map(camp => 
      camp._id === campId ? { ...camp, status: 'rejected' } : camp
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blood Donation Camp Applications
          </h1>
          <p className="text-lg text-gray-600">
            Review and manage blood donation camp requests from organizations
          </p>
          <div className="mt-6 flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-gray-700">Pending Review</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-700">Accepted</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              <span className="text-gray-700">Rejected</span>
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{camps.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-800">
                  {camps.filter(camp => camp.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-800">
                  {camps.filter(camp => camp.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Camp Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <div 
              key={camp._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {camp.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <User className="h-4 w-4 mr-2 text-red-500" />
                      <span className="text-sm font-medium">{camp.organizer}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    camp.status === 'accepted' ? 'bg-green-100 text-green-700 border border-green-200' :
                    camp.status === 'rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                    'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {camp.status === 'accepted' ? 'Approved' : 
                     camp.status === 'rejected' ? 'Rejected' : 'Pending'}
                  </span>
                </div>

                {/* Camp Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-3 text-red-500" />
                    <span>{formatDate(camp.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-red-500" />
                    <span>{camp.city || 'Location not specified'}</span>
                  </div>
                  {camp.expectedDonors && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-3 text-red-500" />
                      <span>Expected: {camp.expectedDonors} donors</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => setSelectedCamp(camp)}
                    className="w-full flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Details
                  </button>
                  
                  {camp.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAccept(camp._id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(camp._id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {camps.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Applications Yet</h3>
              <p className="text-gray-600">
                Blood donation camp applications will appear here for your review.
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedCamp && (
        <CampDetails
          camp={selectedCamp}
          onClose={() => setSelectedCamp(null)}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default Manage;

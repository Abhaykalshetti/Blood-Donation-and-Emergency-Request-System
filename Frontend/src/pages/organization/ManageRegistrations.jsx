
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Users, Eye, Trash2, User, Phone, Mail, Clock, Building, FileText, Activity } from 'lucide-react';
import api from '../../services/api';
import url from '../../services/url.js';
// ... keep existing code (formatDate function)
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

const UserProfileModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative">
                <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-xl">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-lg"
                    >
                        ×
                    </button>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{user.fullName || 'User Profile'}</h2>
                            <p className="text-red-100">Blood Donor Information</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                <User className="h-5 w-5 mr-2 text-red-600" />
                                Personal Information
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Full Name</p>
                                    <p className="font-semibold text-gray-800">{user.fullName || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">User Type</p>
                                    <p className="font-semibold text-gray-800">{user.userType || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Date of Birth</p>
                                    <p className="font-semibold text-gray-800">{user.dateOfBirth || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Gender</p>
                                    <p className="font-semibold text-gray-800">{user.gender || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Age</p>
                                    <p className="font-semibold text-gray-800">{user.age || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-red-600" />
                                Medical Information
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                    <p className="text-sm text-gray-600">Blood Group</p>
                                    <p className="font-bold text-red-600 text-lg">{user.bloodGroup || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Weight</p>
                                    <p className="font-semibold text-gray-800">{user.weight || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-red-600" />
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Phone Number</p>
                                    <p className="font-semibold text-gray-800">{user.phoneNumber || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-semibold text-gray-800">{user.email || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Address</p>
                                    <p className="font-semibold text-gray-800">{user.address || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">City & State</p>
                                    <p className="font-semibold text-gray-800">{user.cityState || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Pincode</p>
                                    <p className="font-semibold text-gray-800">{user.pincode || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-4 md:col-span-2 lg:col-span-3">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-red-600" />
                                Emergency Contact
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Emergency Contact Name</p>
                                    <p className="font-semibold text-gray-800">{user.emergencyContactName || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Relationship</p>
                                    <p className="font-semibold text-gray-800">{user.emergencyContactRelationship || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Emergency Phone</p>
                                    <p className="font-semibold text-gray-800">{user.emergencyContactPhone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CampCard = ({ camp, onView }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-80 flex-shrink-0 border border-gray-100 hover:-translate-y-1">
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{camp.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-red-500" />
                            {formatDate(camp.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 mr-2 text-red-500" />
                            {camp.city || 'N/A'}
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        camp.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        camp.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        camp.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-700'
                    }`}>
                        {camp.status || 'N/A'}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
                        <div className="flex items-center justify-center mb-1">
                            <Users className="h-4 w-4 text-red-600" />
                        </div>
                        <p className="text-xs text-gray-600">Expected</p>
                        <p className="font-bold text-red-600">{camp.expectedDonors || '0'}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                        <div className="flex items-center justify-center mb-1">
                            <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-600">Registered</p>
                        <p className="font-bold text-blue-600">{camp.registeredUsers?.length || '0'}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <button
                onClick={() => onView(camp)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
            </button>
        </div>
    </div>
);

const ManageRegistrations = () => {
    // ... keep existing code (state variables and functions)
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const token = localStorage.getItem('token');

    const handleDeleteUser = async (campId, userId) => {
        if (!window.confirm("Are you sure you want to remove this applicant?")) return;

        try {
            await api.put(`/api/remove-registered-user/${campId}`, { userId },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
            alert("Applicant removed successfully!");
            // Refresh data
            setSelectedCamp(null); // close modal
            const res = await api.get('/api/organization/camps', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCamps(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to remove applicant.");
        }
    };

    const handleViewUser = async (userId) => {
        try {
            const res = await api.get(`/api/profile/${userId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
            setSelectedUser(res.data);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch user profile.');
        }
    };

    useEffect(() => {
        const fetchOrganizationCamps = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/organization/camps', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCamps(response.data.data);
                console.log(response.data);
                
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to load camps.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrganizationCamps();
        } else {
            setError('Authentication token not found. Please log in.');
            setLoading(false);
        }
    }, [token]);

    const CampDetailsModal = ({ camp, onClose }) => {
        if (!camp) return null;

        return (//<div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-0 z-50 overflow-y-auto">

            <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-start justify-center p-0 z-50 overflow-y-auto">
                <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-lg"
                        >
                            ×
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <Building className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">{camp.name}</h2>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {formatDate(camp.date)}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {camp.time || 'N/A'}
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        camp.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                        camp.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        camp.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {camp.status || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Camp Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                    <Building className="h-5 w-5 mr-2 text-red-600" />
                                    Basic Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Organizer</p>
                                        <p className="font-semibold text-gray-800">{camp.organizer || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Contact</p>
                                        <p className="font-semibold text-gray-800">{camp.contact || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Emergency Contact</p>
                                        <p className="font-semibold text-gray-800">{camp.emergencyContact || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location & Logistics */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-red-600" />
                                    Location & Logistics
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">City</p>
                                        <p className="font-semibold text-gray-800">{camp.city || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-semibold text-gray-800">{camp.location || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Equipment Available</p>
                                        <p className="font-semibold text-gray-800">{camp.equipmentAvailable || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Targets & Medical */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                    <Activity className="h-5 w-5 mr-2 text-red-600" />
                                    Targets & Medical
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                        <p className="text-sm text-gray-600">Expected Donors</p>
                                        <p className="font-bold text-red-600 text-lg">{camp.expectedDonors || 'N/A'}</p>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <p className="text-sm text-gray-600">Target Bottles</p>
                                        <p className="font-bold text-blue-600 text-lg">{camp.targetBottles || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Medical Officer</p>
                                        <p className="font-semibold text-gray-800">{camp.medicalOfficerName || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Blood Bank Information */}
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                                    <FileText className="h-5 w-5 mr-2 text-red-600" />
                                    Blood Bank Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Blood Bank Name</p>
                                        <p className="font-semibold text-gray-800">{camp.bloodBankName || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">License Number</p>
                                        <p className="font-semibold text-gray-800">{camp.licenseNumber || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="font-semibold text-gray-800">{camp.bloodBankAddress || 'N/A'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">License Expiry</p>
                                        <p className="font-semibold text-gray-800">{formatDate(camp.licenseExpiry)}</p>
                                    </div>
                                    {camp.licenseDocument && (
      <div className="flex items-center gap-3 text-gray-700">
        <FileText className="w-5 h-5 text-red-500" />
        <span className="font-medium">License Document:</span>
        <a
          href={`${url}uploads/documents/${camp.licenseDocument}`} // Correct path for web
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          View PDF
        </a>
      </div>
    )}
                                </div>
                            </div>

                            {/* Additional Notes */}
                            {camp.additionalNotes && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Notes</h3>
                                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                        <p className="text-gray-800">{camp.additionalNotes}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Registered Applicants Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xl font-bold text-gray-800 flex items-center">
                                    <Users className="h-6 w-6 mr-2 text-red-600" />
                                    Registered Applicants
                                </h4>
                                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                                    {camp.registeredUsers?.length || 0} Registered
                                </div>
                            </div>
                            
                            {camp.registeredUsers?.length > 0 ? (
                                <div className="grid gap-4 max-h-96 overflow-y-auto">
                                    {camp.registeredUsers.map(user => (
                                        <div key={user._id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                            <User className="h-5 w-5 text-red-600" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-gray-800">{user.username}</h5>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                <span className="flex items-center">
                                                                    <Activity className="h-4 w-4 mr-1 text-red-500" />
                                                                    {user.bloodType || 'N/A'}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                                                    {user.location || 'N/A'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => handleViewUser(user._id)} 
                                                        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span>View</span>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteUser(camp._id, user._id)} 
                                                        className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">No applicants registered yet</p>
                                    <p className="text-gray-400 text-sm">Applicants will appear here once they register for this camp</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ... keep existing code (loading and error states)
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading camps...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Activity className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Camps</h3>
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="p-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Manage Blood Drive Registrations
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Monitor and manage all your blood donation camps and registered applicants in one place
                    </p>
                </div>

                {camps.length > 0 ? (
                    <div className="max-w-7xl mx-auto">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Building className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Total Camps</p>
                                        <p className="text-2xl font-bold text-gray-800">{camps.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Users className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Total Registrations</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {camps.reduce((total, camp) => total + (camp.registeredUsers?.length || 0), 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <Activity className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Expected Donors</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {camps.reduce((total, camp) => total + (parseInt(camp.expectedDonors) || 0), 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Camps Grid */}
                        <div className="flex overflow-x-auto space-x-6 px-4 pb-6">
                            {camps.map(camp => (
                                <CampCard key={camp._id} camp={camp} onView={setSelectedCamp} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building className="h-10 w-10 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Blood Drive Camps Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't created any blood drive camps yet. Start by creating your first camp to begin accepting registrations.</p>
                            <button 
                                onClick={() => window.location.href = '/camp-details'}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Create Your First Camp
                            </button>
                        </div>
                    </div>
                )}

                {selectedCamp && (
                    <CampDetailsModal camp={selectedCamp} onClose={() => setSelectedCamp(null)} />
                )}

                {selectedUser && (
                    <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
                )}
            </div>
        </div>
    );
};

export default ManageRegistrations;

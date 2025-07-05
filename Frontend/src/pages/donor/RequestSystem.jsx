import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Heart, Calendar, Clock, AlertCircle, X,
    Building2 as Hospital, Phone, FileText, User, Droplet, Users
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const getUserIdFromToken = (token) => {
    try {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        return payload.id || payload._id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

function RequestSystem() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem("token");
    const currentUserId = getUserIdFromToken(token);
    const userBloodType = "O+";
    const lastDonation = "2024-02-15";
    const nextEligible = "2024-05-15";
    const userName = "Current User";

    const [myRequests, setMyRequests] = useState([]);
    const [otherRequests, setOtherRequests] = useState([]);
    const [loadingMy, setLoadingMy] = useState(true);
    const [loadingOthers, setLoadingOthers] = useState(true);

    const [formData, setFormData] = useState({
        patientName: userName,
        bloodType: "",
        urgency: "Normal",
        hospital: "",
        doctorContact: "",
        reason: "",
        status: "Pending",
        requestDate: new Date().toISOString().split('T')[0],
        userId: currentUserId,
    });

    const fetchRequests = async () => {
        if (!currentUserId || !token) {
            console.warn("User not authenticated or token missing. Cannot fetch requests.");
            setLoadingMy(false);
            setLoadingOthers(false);
            return;
        }

        setLoadingMy(true);
        try {
            const myRequestsRes = await axios.get("/api/requests/my", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyRequests(myRequestsRes.data);
        } catch (err) {
            console.error("Error fetching my requests:", err);
            toast.error("Failed to load your requests.");
        } finally {
            setLoadingMy(false);
        }

        setLoadingOthers(true);
        try {
            const otherRequestsRes = await axios.get("/api/requests/others", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOtherRequests(otherRequestsRes.data);
        } catch (err) {
            console.error("Error fetching other requests:", err);
            toast.error("Failed to load other emergency requests.");
        } finally {
            setLoadingOthers(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [currentUserId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUserId || !token) {
            toast.error("You must be logged in to submit a request.");
            return;
        }

        try {
            const requestData = { ...formData, userId: currentUserId };

            await axios.post('/api/requests', requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Request submitted successfully!");

            setFormData({
                patientName: userName,
                bloodType: "",
                urgency: "Normal",
                hospital: "",
                doctorContact: "",
                reason: "",
                status: "Pending",
                requestDate: new Date().toISOString().split('T')[0],
                userId: currentUserId,
            });
            setIsModalOpen(false);
            fetchRequests();
        } catch (error) {
            console.error('Error submitting request:', error.response?.data || error.message);
            toast.error("Failed to submit request");
        }
    };

    const handleAccept = async (requestId,requestUser) => {
        if (!currentUserId || !token) {
            toast.error("You must be logged in to accept a request.");
            return;
        }
        try {
            await axios.put(`/api/requests/${requestId}/${"Accepted"}`, { donorId: currentUserId,requestOwner: requestUser }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`You have accepted Request ${requestId}!`);
            fetchRequests();
        } catch (error) {
            console.error('Error accepting request:', error.response?.data || error.message);
            toast.error("Failed to accept request.");
        }
    };


    // Handler for declining a request
    const handleDecline = async (requestId,requestUser) => {
        if (!currentUserId || !token) {
            toast.error("You must be logged in to accept a request.");
            return;
        }
        try {
            await axios.put(`/api/requests/${requestId}/${"Cancelled"}`, { donorId: currentUserId,requestOwner: requestUser }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`You have Declined Request ${requestId}!`);
            fetchRequests();
        } catch (error) {
            console.error('Error declining request:', error.response?.data || error.message);
            toast.error("Failed to Decline request.");
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            Pending: "bg-yellow-100 text-yellow-800",
            "Donor Found": "bg-blue-100 text-blue-800",
            Accepted: "bg-green-100 text-green-800",
            Cancelled: "bg-red-100 text-red-800",
        };
        return colors[status];
    };

    const getUrgencyColor = (urgency) => {
        const colors = {
            Critical: "text-red-600",
            Urgent: "text-orange-600",
            Normal: "text-blue-600",
        };
        return colors[urgency] || "text-gray-600";
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData({
            patientName: userName,
            bloodType: "",
            urgency: "Normal",
            hospital: "",
            doctorContact: "",
            reason: "",
            status: "Pending",
            requestDate: new Date().toISOString().split('T')[0],
            userId: currentUserId,
        });
    };

    // Component for displaying a single request card
    const RequestCard = ({ request, isMyRequest }) => (
        <div key={request._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-red-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{request.patientName}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {request.requestDate}
                        </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                        </span>
                        <span className={`text-sm font-semibold ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                        </span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center bg-red-50 p-4 rounded-lg">
                        <Droplet className="w-5 h-5 text-red-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Blood Type</p>
                            <p className="font-semibold text-gray-800">{request.bloodType}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-red-50 p-4 rounded-lg">
                        <Hospital className="w-5 h-5 text-red-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Hospital</p>
                            <p className="font-semibold text-gray-800">{request.hospital}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-red-50 p-4 rounded-lg">
                        <Phone className="w-5 h-5 text-red-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Doctor Contact</p>
                            <p className="font-semibold text-gray-800">{request.doctorContact}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-red-50 p-4 rounded-lg">
                        <FileText className="w-5 h-5 text-red-600 mr-3" />
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Reason</p>
                            <p className="font-semibold text-gray-800">{request.reason}</p>
                        </div>
                    </div>
                </div>
                
                {!isMyRequest & request.status==='Pending' && (
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => handleAccept(request._id,request.userId)}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleDecline(request._id,request.userId)}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium"
                        >
                            Decline
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-red-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl shadow-lg mb-8 mx-6 mt-6">
                <div className="max-w-7xl mx-auto py-8 px-6">
                    <div className="flex items-center justify-center mb-4">
                        <Heart className="w-12 h-12 mr-4" />
                        <h1 className="text-4xl font-bold">Blood Request System</h1>
                    </div>
                    <p className="text-xl text-red-100 text-center">Connect donors with those in need - Save lives together</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pb-12">
                {/* User Dashboard Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-red-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-red-600">{userBloodType}</h2>
                                <p className="text-gray-600 font-medium">Your Blood Type</p>
                            </div>
                            <div className="h-12 w-px bg-gray-300"></div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-red-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Last Donation</p>
                                        <p className="font-semibold text-gray-800">{lastDonation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-red-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Next Eligible Date</p>
                                        <p className="font-semibold text-gray-800">{nextEligible}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (!isModalOpen) {
                                  setIsModalOpen(true);
                                }
                            }}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center font-semibold shadow-md hover:shadow-lg"
                        >
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Emergency Request
                        </button>
                    </div>
                </div>

                {/* My Blood Requests Section */}
                <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-red-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <User className="w-6 h-6 text-red-600 mr-3" />
                        My Blood Requests
                    </h2>
                    {loadingMy ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Loading your requests...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {myRequests.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-lg">You haven't made any blood requests yet.</p>
                                </div>
                            ) : (
                                myRequests.map((request) => (
                                    <RequestCard key={request._id} request={request} isMyRequest={true} />
                                ))
                            )}
                        </div>
                    )}
                </section>

                {/* Requests from Other Donors Section */}
                <section className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <Users className="w-6 h-6 text-red-600 mr-3" />
                        Emergency Requests from Others
                    </h2>
                    {loadingOthers ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Loading emergency requests...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {otherRequests.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-lg">No active emergency requests at the moment.</p>
                                </div>
                            ) : (
                                otherRequests.map((request) => (
                                    <RequestCard key={request._id} request={request} isMyRequest={false} />
                                ))
                            )}
                        </div>
                    )}
                </section>
            </main>

            {/* Modal for Emergency Request */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Emergency Blood Request</h2>
                            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                                    <div className="flex items-center border-2 border-red-100 rounded-lg px-3 py-2 bg-red-50 focus-within:border-red-500">
                                        <User className="w-5 h-5 text-red-600 mr-2" />
                                        <input
                                            type="text"
                                            name="patientName"
                                            value={formData.patientName}
                                            onChange={handleInputChange}
                                            className="bg-transparent w-full focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Blood Type</label>
                                    <select
                                        name="bloodType"
                                        value={formData.bloodType}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-red-100 rounded-lg px-3 py-2 bg-red-50 focus:outline-none focus:border-red-500"
                                        required
                                    >
                                        <option value="">Select Blood Type</option>
                                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                                    <select
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-red-100 rounded-lg px-3 py-2 bg-red-50 focus:outline-none focus:border-red-500"
                                        required
                                    >
                                        <option value="Critical">Critical</option>
                                        <option value="Urgent">Urgent</option>
                                        <option value="Normal">Normal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                                    <div className="flex items-center border-2 border-red-100 rounded-lg px-3 py-2 bg-red-50 focus-within:border-red-500">
                                        <Hospital className="w-5 h-5 text-red-600 mr-2" />
                                        <input
                                            type="text"
                                            name="hospital"
                                            value={formData.hospital}
                                            onChange={handleInputChange}
                                            className="bg-transparent w-full focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Contact</label>
                                    <div className="flex items-center border-2 border-red-100 rounded-lg px-3 py-2 bg-red-50 focus-within:border-red-500">
                                        <Phone className="w-5 h-5 text-red-600 mr-2" />
                                        <input
                                            type="text"
                                            name="doctorContact"
                                            value={formData.doctorContact}
                                            onChange={handleInputChange}
                                            className="bg-transparent w-full focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-red-100 rounded-lg px-3 py-2 bg-red-50 focus:outline-none focus:border-red-500"
                                        rows={3}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-md hover:shadow-lg"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RequestSystem;

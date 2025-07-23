
import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'sonner';
import { Pencil, Trash2, Eye, Upload, Calendar, Clock, Users, Droplets, MapPin, Phone, FileText, Building, User, AlertCircle, Save, Plus } from 'lucide-react';
import api from '../../services/api';


function CampDetails() {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    organizer: '',
    date: '',
    time: '',
    contact: '',
    expectedDonors: '',
    licenseNumber: '',
    licenseExpiry: '',
    licenseDocument: null,
    bloodBankName: '',
    bloodBankAddress: '',
    medicalOfficerName: '',
    medicalOfficerRegistration: '',
    targetBottles: '',
    city: '',
    location: '',
    equipmentAvailable: '',
    emergencyContact: '',
    additionalNotes: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    console.log(formData);
    
    e.preventDefault();

    if (editingId !== null) {
      setCamps(camps.map(camp =>
        camp.id === editingId ? { ...formData, id: editingId } : camp
      ));
      toast.success('Camp updated successfully!');
      setEditingId(null);
    } else {
      setCamps([...camps, { ...formData, id: Date.now() }]);
      toast.success('Camp added successfully!');
    }

    let form=new FormData();
    
     form.append('pdffile',formData.licenseDocument);
    form.append('textData',JSON.stringify(formData));
   console.log(formData.licenseDocument);
   
    try {
      await api.post("/api/camp-details", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
    } catch (error) {
      console.error('Error submitting camp data:', error);
    }

    setFormData({
      name: '',
      organizer: '',
      date: '',
      time: '',
      contact: '',
      expectedDonors: '',
      licenseNumber: '',
      licenseExpiry: '',
      licenseDocument: null,
      bloodBankName: '',
      bloodBankAddress: '',
      medicalOfficerName: '',
      medicalOfficerRegistration: '',
      targetBottles: '',
      city: '',
      location: '',
      equipmentAvailable: '',
      emergencyContact: '',
      additionalNotes: ''
    });
  };

  const handleEdit = (camp) => {
    setFormData(camp);
    setEditingId(camp.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setCamps(camps.filter(camp => camp.id !== id));
    toast.success('Camp deleted successfully!');
  };

  const handleFileChange = (e) => {
       setFormData( ({ ...formData, licenseDocument: e.target.files[0]}));   
     
  };

  const CampCard = ({ camp }) => (
    <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{camp.name}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Building className="h-4 w-4 mr-3 text-red-500" />
              <span className="font-medium">{camp.organizer}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-3 text-red-500" />
              <span>{camp.city}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-3 text-red-500" />
              <span>{camp.contact}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(camp)}
            className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
            title="Edit camp"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSelectedCamp(camp)}
            className="p-3 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110"
            title="View details"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(camp.id)}
            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
            title="Delete camp"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <Calendar className="h-5 w-5 text-red-600 mr-2" />
            <h4 className="font-semibold text-gray-900">Date & Time</h4>
          </div>
          <p className="text-gray-700 font-medium">{new Date(camp.date).toLocaleDateString()}</p>
          <p className="text-gray-600">{camp.time}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-gray-900">Target</h4>
          </div>
          <p className="text-gray-700 font-medium">{camp.expectedDonors} donors</p>
          <p className="text-gray-600">{camp.targetBottles} bottles</p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-gray-600">Medical Officer:</span>
            <span className="text-sm font-semibold text-gray-900 ml-2">{camp.medicalOfficerName}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-gray-600">License:</span>
            <span className="text-sm font-semibold text-gray-900 ml-2">{camp.licenseNumber}</span>
          </div>
        </div>
      </div>

      {camp.additionalNotes && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">{camp.additionalNotes}</p>
        </div>
      )}
    </div>
  );

  const DetailView = ({ camp, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-6xl shadow-2xl m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Camp Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camp Information */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 mr-3 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">Camp Information</h3>
            </div>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{camp.name}</span></div>
              <div><span className="font-semibold text-gray-700">Organizer:</span> <span className="text-gray-900">{camp.organizer}</span></div>
              <div><span className="font-semibold text-gray-700">Venue:</span> <span className="text-gray-900">{camp.city}</span></div>
              <div><span className="font-semibold text-gray-700">Address:</span> <span className="text-gray-900">{camp.location}</span></div>
              <div><span className="font-semibold text-gray-700">Date:</span> <span className="text-gray-900">{new Date(camp.date).toLocaleDateString()}</span></div>
              <div><span className="font-semibold text-gray-700">Time:</span> <span className="text-gray-900">{camp.time}</span></div>
            </div>
          </div>
  
          {/* Blood Bank Details */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Droplets className="h-6 w-6 mr-3 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Blood Bank Details</h3>
            </div>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{camp.bloodBankName}</span></div>
              <div><span className="font-semibold text-gray-700">Address:</span> <span className="text-gray-900">{camp.bloodBankAddress}</span></div>
              <div><span className="font-semibold text-gray-700">License:</span> <span className="text-gray-900">{camp.licenseNumber}</span></div>
              <div><span className="font-semibold text-gray-700">Expiry:</span> <span className="text-gray-900">{new Date(camp.licenseExpiry).toLocaleDateString()}</span></div>
              {camp.licenseDocument && (
                <div><span className="font-semibold text-gray-700">Document:</span> <span className="text-gray-900">{camp.licenseDocument.name}</span></div>
              )}
            </div>
          </div>
  
          {/* Medical Officer */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 mr-3 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Medical Officer</h3>
            </div>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{camp.medicalOfficerName}</span></div>
              <div><span className="font-semibold text-gray-700">Registration:</span> <span className="text-gray-900">{camp.medicalOfficerRegistration}</span></div>
            </div>
          </div>
  
          {/* Targets & Equipment */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 mr-3 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Targets & Equipment</h3>
            </div>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Expected Donors:</span> <span className="text-gray-900">{camp.expectedDonors}</span></div>
              <div><span className="font-semibold text-gray-700">Target Bottles:</span> <span className="text-gray-900">{camp.targetBottles}</span></div>
              <div><span className="font-semibold text-gray-700">Equipment:</span> <span className="text-gray-900">{camp.equipmentAvailable}</span></div>
              <div><span className="font-semibold text-gray-700">Emergency Contact:</span> <span className="text-gray-900">{camp.emergencyContact}</span></div>
            </div>
          </div>
  
          {/* Additional Notes */}
          {camp.additionalNotes && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 md:col-span-2">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 mr-3 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">Additional Notes</h3>
              </div>
              <p className="text-gray-700">{camp.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Blood Donation Camp Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create, manage, and monitor your blood donation campaigns with comprehensive details and tracking.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-red-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Camp Details' : 'Add New Camp'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-red-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Camp Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Enter camp name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Organizer</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* License and Blood Bank Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-red-600" />
                License and Blood Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Enter license number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">License Expiry Date</label>
                  <input
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">License Document</label>
                  <label className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-400 cursor-pointer transition-colors">
                    <Upload className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-600">Upload Document</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  {formData.licenseDocument && (
                    <p className="mt-2 text-sm text-green-600 font-medium">{formData.licenseDocument.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Bank Name</label>
                  <input
                    type="text"
                    value={formData.bloodBankName}
                    onChange={(e) => setFormData({ ...formData, bloodBankName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Blood bank name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Bank Address</label>
                  <textarea
                    value={formData.bloodBankAddress}
                    onChange={(e) => setFormData({ ...formData, bloodBankAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows="2"
                    placeholder="Complete address of the blood bank"
                  />
                </div>
              </div>
            </div>

            {/* Medical Officer Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-red-600" />
                Medical Officer Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Medical Officer Name</label>
                  <input
                    type="text"
                    value={formData.medicalOfficerName}
                    onChange={(e) => setFormData({ ...formData, medicalOfficerName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number</label>
                  <input
                    type="text"
                    value={formData.medicalOfficerRegistration}
                    onChange={(e) => setFormData({ ...formData, medicalOfficerRegistration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Medical registration number"
                  />
                </div>
              </div>
            </div>

            {/* Camp Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-red-600" />
                Camp Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Donors</label>
                  <input
                    type="number"
                    value={formData.expectedDonors}
                    onChange={(e) => setFormData({ ...formData, expectedDonors: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Blood Bottles</label>
                  <input
                    type="number"
                    value={formData.targetBottles}
                    onChange={(e) => setFormData({ ...formData, targetBottles: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Camp Venue</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Community Center, City Hall"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Emergency contact number"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Address</label>
                  <textarea
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows="2"
                    placeholder="Complete address of the camp venue"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Available</label>
                  <textarea
                    value={formData.equipmentAvailable}
                    onChange={(e) => setFormData({ ...formData, equipmentAvailable: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows="2"
                    placeholder="Blood collection monitors, Tube sealers, Refrigeration units, etc."
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows="3"
                    placeholder="Any additional information about the camp (special requirements, accessibility, etc.)"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
              >
                <Save className="h-5 w-5" />
                <span>{editingId ? 'Update Camp' : 'Add Camp'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Camps List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Registered Camps</h2>
          {camps.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-red-100">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No camps registered yet</h3>
              <p className="text-gray-600">Start by adding your first blood donation camp above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {camps.map((camp) => (
                <CampCard key={camp.id} camp={camp} />
              ))}
            </div>
          )}
        </div>

        {selectedCamp && (
          <DetailView camp={selectedCamp} onClose={() => setSelectedCamp(null)} />
        )}
      </div>
    </div>
  );
}

export default CampDetails;
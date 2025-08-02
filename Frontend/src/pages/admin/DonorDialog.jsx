
import React from 'react';
import { X, User, Building2, Phone, Mail, MapPin, Activity, Calendar, FileText, Shield, Clock, Database } from 'lucide-react';
import { url } from '../../services/api';

function DonorDialog({ open, donor, onClose }) {
  if (!open || !donor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true"></div>
        
        {/* Modal dialog */}
        <div 
          className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg">
  {donor.photo ? (
    <img
      src={`${url}uploads/images/${donor.photo}`}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-red-600">
      {donor.fullName?.charAt(0)?.toUpperCase() || (donor.fullName === 'donor' ? 'D' : 'B')}
    </span>
  )}
</div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {donor.userType === 'donor' ? 'Donor Profile' : 'Blood Bank Profile'}
                  </h3>
                  <p className="text-blue-100 text-sm">{donor.fullName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6 bg-gray-50">
            {donor.userType === 'donor' ? (
              <IndividualDonorDetails donor={donor} />
            ) : (
              <BloodBankDetails donor={donor} />
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndividualDonorDetails({ donor }) {
  const sections = [
    {
      title: 'Personal Information',
      icon: <User className="w-5 h-5 text-blue-600" />,
      fields: [
        { label: 'Full Name', value: donor.fullName, icon: <User className="w-4 h-4" /> },
        { label: 'Age', value: `${donor.age} years`, icon: <Calendar className="w-4 h-4" /> },
        { label: 'Weight', value: donor.weight, icon: <Activity className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Contact Information',
      icon: <Phone className="w-5 h-5 text-green-600" />,
      fields: [
        { label: 'Email Address', value: donor.email, icon: <Mail className="w-4 h-4" /> },
        { label: 'Phone Number', value: donor.phoneNumber, icon: <Phone className="w-4 h-4" /> },
        { label: 'Address', value: donor.address, icon: <MapPin className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Donation Information',
      icon: <Activity className="w-5 h-5 text-red-600" />,
      fields: [
        { 
          label: 'Blood Type', 
          value: donor.bloodGroup, 
          icon: <Activity className="w-4 h-4" />,
          special: 'bloodType'
        },
        { label: 'Last Donation', value: donor.lastDonation || 'Never', icon: <Calendar className="w-4 h-4" /> },
        { 
          label: 'Status', 
          value: donor.status || 'Active', 
          icon: <Shield className="w-4 h-4" />,
          special: 'status'
        },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            {section.icon}
            <h4 className="text-lg font-semibold text-gray-900">{section.title}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map((field) => (
              <div key={field.label} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  {field.icon}
                  <label className="text-sm font-medium">{field.label}</label>
                </div>
                <div className="ml-6">
                  {field.special === 'bloodType' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200">
                      <Activity className="w-3 h-3 mr-1" />
                      {field.value}
                    </span>
                  ) : field.special === 'status' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {field.value}
                    </span>
                  ) : (
                    <div className="text-gray-900 font-medium">{field.value || 'N/A'}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Medical Information Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <FileText className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-semibold text-gray-900">Medical Information</h4>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FileText className="w-4 h-4" />
            <label className="text-sm font-medium">Medical History</label>
          </div>
          <div className="ml-6 bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-gray-900 text-sm leading-relaxed">
              {donor.medicalHistory || 'No medical history information available at this time.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BloodBankDetails({ donor }) {
  const sections = [
    {
      title: 'Organization Information',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      fields: [
        { label: 'Organization Name', value: donor.fullName, icon: <Building2 className="w-4 h-4" /> },
        { label: 'License Number', value: donor.licenseNumber, icon: <Shield className="w-4 h-4" /> },
       {
  label: 'License Document',
  value: (
    <a
      href={`${url}uploads/documents/${donor.licensePdf}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      View PDF
    </a>
  ),
  icon: <FileText className="w-4 h-4 text-red-500" />,
}

      ]
    },
    {
      title: 'Contact Information',
      icon: <Phone className="w-5 h-5 text-green-600" />,
      fields: [
        { label: 'Email Address', value: donor.email, icon: <Mail className="w-4 h-4" /> },
        { label: 'Phone Number', value: donor.phoneNumber, icon: <Phone className="w-4 h-4" /> },
        { label: 'Address', value: donor.address, icon: <MapPin className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Operational Details',
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      fields: [
        { label: 'Operating Hours', value: donor.operatingHours || '24/7', icon: <Clock className="w-4 h-4" /> },
        { label: 'Storage Capacity', value: donor.storageCapacity || 'Not specified', icon: <Database className="w-4 h-4" /> },
        { label: 'Blood Types Available', value: 'All Types (A+, A-, B+, B-, AB+, AB-, O+, O-)', icon: <Activity className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            {section.icon}
            <h4 className="text-lg font-semibold text-gray-900">{section.title}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map((field) => (
              <div key={field.label} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  {field.icon}
                  <label className="text-sm font-medium">{field.label}</label>
                </div>
                <div className="ml-6">
                  {field.special === 'status' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {field.value}
                    </span>
                  ) : (
                    <div className="text-gray-900 font-medium">{field.value || 'N/A'}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Information Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <FileText className="w-5 h-5 text-orange-600" />
          <h4 className="text-lg font-semibold text-gray-900">Additional Information</h4>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-blue-900 mb-2">Certification & Compliance</h5>
              <p className="text-blue-800 text-sm leading-relaxed">
                This blood bank is registered in our system and is authorized to collect, store, and distribute blood donations according to health regulations. 
                The facility meets all safety standards and regulatory requirements for blood banking operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDialog;

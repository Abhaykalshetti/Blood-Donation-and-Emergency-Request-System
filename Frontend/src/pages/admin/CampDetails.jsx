
import React from 'react';
import { X, MapPin, Calendar, Clock, Phone, Users, FileCheck, Building, User, Droplet, PenTool as Tool, AlertCircle, FileText } from 'lucide-react';

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

function CampDetails({ camp, onClose, onAccept, onReject }) {
  const sections = [
    {
      title: 'Basic Information',
      icon: <Building className="w-6 h-6 text-red-600" />,
      bgColor: 'from-red-50 to-red-100',
      borderColor: 'border-red-200',
      fields: [
        { label: 'Camp Name', value: camp.name, icon: <FileText className="w-4 h-4 text-red-500" /> },
        { label: 'Organizer', value: camp.organizer, icon: <User className="w-4 h-4 text-red-500" /> },
        { label: 'Date', value: formatDate(camp.date), icon: <Calendar className="w-4 h-4 text-red-500" /> },
        { label: 'Time', value: camp.time, icon: <Clock className="w-4 h-4 text-red-500" /> },
        { label: 'Contact Number', value: camp.contact, icon: <Phone className="w-4 h-4 text-red-500" /> },
        {

    label: 'View File',
    value: (
      <a
        href={`http://localhost:3000/uploads/documents/${camp.licenseDocument}`} // Adjust path if needed
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
      { camp.licenseDocument }
      </a>
    ),
    icon: <FileText className="w-4 h-4 text-red-500" />
  }
      ]
    },
    {
      title: 'Camp Details',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      fields: [
        { label: 'Expected Donors', value: camp.expectedDonors, icon: <Users className="w-4 h-4 text-blue-500" /> },
        { label: 'Target Bottles', value: camp.targetBottles, icon: <Droplet className="w-4 h-4 text-blue-500" /> },
        { label: 'Camp Venue', value: camp.city, icon: <Building className="w-4 h-4 text-blue-500" /> },
        { label: 'Venue Address', value: camp.location, icon: <MapPin className="w-4 h-4 text-blue-500" /> },
        { label: 'Equipment Available', value: camp.equipmentAvailable, icon: <Tool className="w-4 h-4 text-blue-500" /> },
        { label: 'Emergency Contact', value: camp.emergencyContact, icon: <AlertCircle className="w-4 h-4 text-blue-500" /> }
      ]
    },
    {
      title: 'Legal & Medical Information',
      icon: <FileCheck className="w-6 h-6 text-green-600" />,
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      fields: [
        { label: 'License Number', value: camp.licenseNumber, icon: <FileCheck className="w-4 h-4 text-green-500" /> },
        { label: 'License Expiry', value: formatDate(camp.licenseExpiry), icon: <Calendar className="w-4 h-4 text-green-500" /> },
        { label: 'Blood Bank Name', value: camp.bloodBankName, icon: <Building className="w-4 h-4 text-green-500" /> },
        { label: 'Blood Bank Address', value: camp.bloodBankAddress, icon: <MapPin className="w-4 h-4 text-green-500" /> },
        { label: 'Medical Officer Name', value: camp.medicalOfficerName, icon: <User className="w-4 h-4 text-green-500" /> },
        { label: 'Medical Officer Registration', value: camp.medicalOfficerRegistration, icon: <FileText className="w-4 h-4 text-green-500" /> }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-start justify-center p-0 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl border border-gray-100 my-8">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 border-b border-red-200 flex justify-between items-start z-10 rounded-t-2xl">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">{camp.name}</h2>
            <div className="flex items-center space-x-4 text-red-100">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">Organized by {camp.organizer}</span>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  camp.status === 'accepted' ? 'bg-green-100 text-green-700 border border-green-200' :
                  camp.status === 'rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                  'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}>
                  {camp.status === 'accepted' ? 'Approved' : 
                   camp.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors p-2 hover:bg-red-600 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className={`bg-gradient-to-r ${section.bgColor} rounded-2xl p-8 border ${section.borderColor} shadow-lg`}>
                <div className="flex items-center gap-3 mb-6">
                  {section.icon}
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div key={field.label} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        {field.icon}
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">{field.label}</label>
                      </div>
                      <div className="text-gray-900 font-medium text-lg ml-7">{field.value || 'Not specified'}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {camp.additionalNotes && (
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Additional Notes</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">{camp.additionalNotes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {camp.status === 'pending' && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-12 -mx-8 px-8 py-6 flex justify-end gap-4 rounded-b-2xl">
              <button
                onClick={() => {
                  onReject(camp._id);
                  onClose();
                }}
                className="flex items-center px-8 py-3 bg-white border-2 border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <X className="w-5 h-5 mr-2" />
                Reject Application
              </button>
              <button
                onClick={() => {
                  onAccept(camp._id);
                  onClose();
                }}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FileCheck className="w-5 h-5 mr-2" />
                Accept Application
              </button>
            </div>
          )}

          {/* Status Display for Non-Pending Camps */}
          {camp.status !== 'pending' && (
            <div className="mt-12 text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                camp.status === 'accepted' 
                  ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                  : 'bg-red-100 text-red-700 border-2 border-red-200'
              }`}>
                {camp.status === 'accepted' ? (
                  <>
                    <FileCheck className="w-5 h-5 mr-2" />
                    Application Approved
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 mr-2" />
                    Application Rejected
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampDetails;

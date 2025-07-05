
import React from 'react';
import { Eye, Trash2, Users, Building2, Phone, Calendar, Activity } from 'lucide-react';

function DonorTable({ donors, donorType, onViewProfile, onDelete }) {
  // Display message if no donors are found
  if (!donors || donors.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {donorType === 'individuals' ? (
            <Users className="w-8 h-8 text-gray-400" />
          ) : (
            <Building2 className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No {donorType === 'individuals' ? 'Individual Donors' : 'Blood Banks'} Found
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          {donorType === 'individuals' 
            ? 'No individual donors have been registered yet. New registrations will appear here.' 
            : 'No blood banks have been registered yet. New registrations will appear here.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {donorType === 'individuals' ? (
                // Headers for individual donors
                <>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Donor Name
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Blood Type
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Last Donation
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </>
              ) : (
                // Headers for blood banks
                <>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Blood Bank Name
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">License No.</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Operating Hours</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {donors.map((donor, index) => (
              <tr key={donor._id} className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
              } hover:bg-blue-50/50 transition-all duration-200 ease-in-out group`}>
                {donorType === 'individuals' ? (
                  // Cells for individual donors
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {donor.fullName?.charAt(0)?.toUpperCase() || 'D'}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{donor.fullName}</div>
                          <div className="text-sm text-gray-500">ID: {donor._id?.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200">
                        <Activity className="w-3 h-3 mr-1" />
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{donor.phoneNumber}</div>
                      <div className="text-sm text-gray-500">{donor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{donor.lastDonation || 'Never'}</div>
                      <div className="text-xs text-gray-500">
                        {donor.lastDonation ? 'Previous donation' : 'First time donor'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {donor.status || 'Active'}
                      </span>
                    </td>
                  </>
                ) : (
                  // Cells for blood banks
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {donor.fullName?.charAt(0)?.toUpperCase() || 'B'}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{donor.fullName}</div>
                          <div className="text-sm text-gray-500">Blood Bank</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {donor.licenseNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{donor.phoneNumber}</div>
                      <div className="text-sm text-gray-500">{donor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{donor.operatingHours || '24/7'}</div>
                      <div className="text-xs text-gray-500">Daily operations</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {donor.status || 'Active'}
                      </span>
                    </td>
                  </>
                )}
                
                {/* Actions column (same for both types) */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewProfile(donor)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-all duration-200 group-hover:shadow-md"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(donor._id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-all duration-200 group-hover:shadow-md"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonorTable;

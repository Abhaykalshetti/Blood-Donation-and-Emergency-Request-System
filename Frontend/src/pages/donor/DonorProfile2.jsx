import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Home, Calendar, Droplets, Edit, Clock, FileText, Building2 } from 'lucide-react';
import api from '../../services/api';
import url from '../../services/url';

function DonorProfile2() {
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType:'',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    cityState: '',
    pincode: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    weight: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    licenseNumber: '',
    licensePdf: null,
    storageCapacity: '',
    operatingHours: '',
    photo:null,
  });
  const [previewImage, setPreviewImage] = useState('');
  const [licensePdfName, setLicensePdfName] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const relationships = ['Parent', 'Sibling', 'Spouse', 'Friend', 'Relative', 'Other'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/get-profile', {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(`${url}/uploads/images/${res.data.photo}`);
        
        if (res.status === 201) {

          setPreviewImage(`${url}/uploads/images/${res.data.photo}`)
          setShowTypeSelection(false)
          setFormData(res.data);
          setIsEditing(true);
        } else {
          ShowSlection()
          setShowTypeSelection(true)
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    };
    fetchData();
  }, []);

  const handleTypeSelection=(type)=>{ 
    setFormData(prev => ({
    ...prev,
    userType: type
  }));
    console.log(formData);
    
    setShowTypeSelection(true)
  }

  const handleImageChange = (e) => {
      setFormData({ ...formData, photo: e.target.files[0] })
      console.log(formData);
      
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { 
      setLicensePdfName(file.name);
      setFormData(({ ...formData, licensePdf: e.target.files[0] }));      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form=new FormData();
    if(formData.userType==='donor'){
       form.append('textData',JSON.stringify(formData));
    form.append('file',formData.photo);
    }else{
    form.append('textData',JSON.stringify(formData));
    form.append('file',formData.licensePdf);
    }
    try {
      const response = await api.post('/api/profile', form, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      alert('Profile saved successfully!');
      setIsEditing(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const ProfileView = () => (
    <div className="space-y-8">
      {/* Header with Edit Button */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {formData.userType === 'donor' ? 'Donor Profile' : 'Blood Bank Profile'}
            </h1>
            <p className="text-red-100">Manage your profile information</p>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-semibold shadow-md"
          >
            <Edit size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-8 mb-8">
          <div className="w-32 h-32 rounded-full bg-red-100 overflow-hidden border-4 border-red-200">
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-red-400" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{formData.fullName}</h2>
            {formData.userType === 'donor' ? (
              <p className="text-red-600 flex items-center gap-2 text-lg font-semibold">
                <Droplets className="w-5 h-5" />
                Blood Group: {formData.bloodGroup}
              </p>
            ) : (
              <p className="text-red-600 flex items-center gap-2 text-lg font-semibold">
                <FileText className="w-5 h-5" />
                License No: {formData.licenseNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
          {formData.userType === 'donor' ? (
            <>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Date of Birth:</span>
                    <span>{new Date(formData.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <User className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Gender:</span>
                    <span className="capitalize">{formData.gender}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="font-medium">Weight:</span>
                    <span>{formData.weight} kg</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Blood Bank Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Building2 className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Storage Capacity:</span>
                    <span>{formData.storageCapacity} units</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Operating Hours:</span>
                    <span>{formData.operatingHours}</span>
                  </div>
                </div>
                 {formData.licensePdf && (
      <div className="flex items-center gap-3 text-gray-700">
        <FileText className="w-5 h-5 text-red-500" />
        <span className="font-medium">License Document:</span>
        <a
          href={`${url}/uploads/documents/${formData.licensePdf}`} // Correct path for web
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >

      {formData.licensePdf}
        </a>
      </div>
    )}
              </div>
            </>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Phone:</span>
                <span>{formData.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Email:</span>
                <span>{formData.email}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Home className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-medium">Address:</span>
                  <p className="mt-1">{formData.address}</p>
                  <p>{formData.cityState}, {formData.pincode}</p>
                </div>
              </div>
            </div>
          </div>

          {formData.userType === 'donor' && (
            <div className="md:col-span-2 bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Contact:</span>
                  <span>{formData.emergencyContactName} ({formData.emergencyContactRelationship})</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Phone:</span>
                  <span>{formData.emergencyContactPhone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDonorForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-40 h-40 rounded-full bg-red-100 overflow-hidden mb-6 border-4 border-red-200 shadow-lg">
                      {previewImage ? (
                        <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-20 h-20 text-red-400" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profile-picture"
                    />
                    <label
                      htmlFor="profile-picture"
                      className="cursor-pointer bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                      Upload Photo
                    </label>
                  </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            required
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            required
            value={formData.weight}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
          <select
            name="bloodGroup"
            required
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Emergency Contact Section */}
        <div className="md:col-span-2 pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency Contact
          </h2>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            required
            value={formData.emergencyContactName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
          <select
            name="emergencyContactRelationship"
            required
            value={formData.emergencyContactRelationship}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <option value="">Select Relationship</option>
            {relationships.map(relation => (
              <option key={relation} value={relation}>{relation}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyContactPhone"
            required
            pattern="[0-9]{10}"
            value={formData.emergencyContactPhone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>
      </div>
    </>
  );

  const renderBloodBankForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Bank Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            required
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">License Document (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
          {licensePdfName && (
            <p className="mt-2 text-sm text-red-600 font-medium">{licensePdfName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Storage Capacity (units)</label>
          <input
            type="number"
            name="storageCapacity"
            required
            value={formData.storageCapacity}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Operating Hours</label>
          <input
            type="text"
            name="operatingHours"
            required
            value={formData.operatingHours}
            onChange={handleInputChange}
            placeholder="e.g., Mon-Fri: 9 AM - 6 PM"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {isEditing ? (
          <ProfileView />
        ) : (
        <>
        { !showTypeSelection ? (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-2xl shadow-2xl">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Select Profile Type</h1>
                <p className="text-gray-600">Choose your role to get started</p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => handleTypeSelection('donor')}
                  className="w-full flex items-center justify-center px-8 py-6 border-2 border-red-500 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <User className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-bold text-lg">Individual Donor</div>
                    <div className="text-sm text-red-500">Help save lives by donating blood</div>
                  </div>
                </button>
                <button
                  onClick={() => handleTypeSelection('bloodbank')}
                  className="w-full flex items-center justify-center px-8 py-6 border-2 border-blue-500 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <Building2 className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-bold text-lg">Blood Bank</div>
                    <div className="text-sm text-blue-500">Manage blood inventory and requests</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          ):(
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8">
                <h1 className="text-4xl font-bold text-center mb-2">
                  {formData.userType === 'donor' ? 'Complete Donor Profile' : 'Complete Blood Bank Profile'}
                </h1>
                <p className="text-center text-red-100">Fill in your information to get started</p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Dynamic Form Content */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    {formData.userType === 'donor' ? renderDonorForm() : renderBloodBankForm()}
                  </div>

                  {/* Contact Information */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
                      <Phone className="w-6 h-6" />
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          pattern="[0-9]{10}"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City & State</label>
                        <input
                          type="text"
                          name="cityState"
                          required
                          value={formData.cityState}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          pattern="[0-9]{6}"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-12 py-4 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}

export default DonorProfile2;

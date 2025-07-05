
import { useState, useEffect } from 'react'
import axios from 'axios';
import DonorNavbar from './DonorNavbar';
import { Search, MapPin, Calendar, Clock, Phone, Users, Building, Filter } from 'lucide-react';

function FindCamps() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [bloodCamps, setBloodCamps] = useState([]);

  const cities = [...new Set(bloodCamps.map(camp => camp.city))];

  const handleRegister = async (campId) => {
    console.log(campId);
    const res = await axios.get('/api/get-profile', {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    try {
      const response = await axios.put(`/api/update-registered-users/${campId}`, {
        registeredUsers: [
          {
            username: res.data.fullName,
            bloodType: res.data.bloodGroup,
            location: res.data.cityState,
            _id: res.data._id
          }
        ]
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert('User registered successfully');
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data.message || error.response.statusText);
        alert(`Failed to register user: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        console.error('Error setting up request:', error.message);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/findcamps', {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
        setBloodCamps(response.data)
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    };
    fetchDashboardData();
  }, []);

  const handleSearch = async () => {
    setHasSearched(true);
  };

  const filteredCamps = bloodCamps.filter(camp => {
    const matchesSearch = camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camp.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || camp.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header Section */}
        <header className="bg-red-50 pt-2">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-red-700 mb-2">
              Blood Donation Camps
            </h2>
            <p className="text-gray-700 text-lg">
              Find nearby blood donation centers and make a difference in your community.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 grid gap-6 pb-12">
          {/* Search Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-start space-x-4 mb-6">
              <div className="text-3xl text-red-600">
                <Search />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Find Donation Centers
                </h3>
                <p className="text-gray-600">
                  Search for blood donation camps in your area
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  Search Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your location, camp name, or area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-red-50 border-2 border-red-200 focus:ring-3 focus:ring-red-100 focus:border-red-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-red-500" />
                  Filter by City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-red-50 border-2 border-red-200 focus:ring-3 focus:ring-red-100 focus:border-red-400 transition-all duration-300 text-gray-700"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-3">
                <button
                  onClick={handleSearch}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Camps
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {!hasSearched ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="text-4xl text-red-500 mb-4 flex justify-center">
                  <Building />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Donation Centers</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Enter your location above to discover nearby blood donation camps and make a difference in your community.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="flex flex-col items-center text-center p-4 bg-red-50 rounded-lg">
                    <Users className="w-8 h-8 text-red-600 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-2">Community Impact</h3>
                    <p className="text-gray-600 text-sm">Help save lives in your community</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-red-50 rounded-lg">
                    <Clock className="w-8 h-8 text-red-600 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-2">Quick Process</h3>
                    <p className="text-gray-600 text-sm">Simple and efficient donation</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-red-50 rounded-lg">
                    <Building className="w-8 h-8 text-red-600 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-2">Professional Care</h3>
                    <p className="text-gray-600 text-sm">Safe and professional environment</p>
                  </div>
                </div>
              </div>
            </div>
          ) : filteredCamps.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-3xl text-gray-400 mb-4 flex justify-center">
                <MapPin />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No Camps Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any blood donation camps in this location. Try searching for a different area.
              </p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCity(''); setHasSearched(false);}}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-200"
              >
                Search Again
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Found {filteredCamps.length} Blood Donation Camp{filteredCamps.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-gray-600">Choose a camp and register to donate blood</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCamps.map((camp) => (
                  <div
                    key={camp._id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                  >
                    <div className="bg-red-600 p-4 text-white">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-bold flex-1 mr-3 leading-tight">{camp.name}</h2>
                        <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                          {camp.city}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-white/80" />
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start text-gray-700">
                          <MapPin className="w-4 h-4 mr-3 mt-1 text-red-500 flex-shrink-0" />
                          <div>
                            <span className="font-semibold block text-xs text-gray-500 mb-1">Location</span>
                            <span className="text-gray-800 text-sm">{camp.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start text-gray-700">
                          <Calendar className="w-4 h-4 mr-3 mt-1 text-red-500 flex-shrink-0" />
                          <div>
                            <span className="font-semibold block text-xs text-gray-500 mb-1">Date</span>
                            <span className="text-gray-800 text-sm">{camp.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start text-gray-700">
                          <Clock className="w-4 h-4 mr-3 mt-1 text-red-500 flex-shrink-0" />
                          <div>
                            <span className="font-semibold block text-xs text-gray-500 mb-1">Time</span>
                            <span className="text-gray-800 text-sm">{camp.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start text-gray-700">
                          <Phone className="w-4 h-4 mr-3 mt-1 text-red-500 flex-shrink-0" />
                          <div>
                            <span className="font-semibold block text-xs text-gray-500 mb-1">Contact</span>
                            <span className="text-gray-800 text-sm">{camp.contact}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleRegister(camp._id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105 flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Register to Donate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default FindCamps;
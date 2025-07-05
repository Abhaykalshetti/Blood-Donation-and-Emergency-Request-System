import { FaUserPlus, FaHospital, FaUserShield } from 'react-icons/fa';
import { MdLocationOn, MdEmergency } from 'react-icons/md';
import { BsCalendarCheck, BsSearch } from 'react-icons/bs';
import { BiDonateBlood } from 'react-icons/bi';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BiDonateBlood className="text-primary text-3xl" />
              <span className="ml-2 text-xl font-semibold text-gray-800">BloodConnect</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary">Find Donors</a>
              <a href="#" className="text-gray-600 hover:text-primary">Donation Camps</a>
              <a href="#" className="text-gray-600 hover:text-primary">About Us</a>
              <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
             <Link to={"/"}> <button className="text-gray-600 hover:text-primary">Login</button></Link>
             <Link to={"/register"}> <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-red-700 transition"/></Link>
                Register
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Blood Donation & Emergency Request System
            </h1>
            <p className="mt-4 text-xl">
              Connecting blood donors with those in need
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Donate Blood
              </button>
              <button className="bg-red-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-800 transition">
                Emergency Request
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* User Dashboard Section */}
      <section className="dashboard-section">
        <h2 className="section-title">User (Donor) Dashboard</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <FaUserPlus className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Profile Setup</h3>
            <p className="text-gray-600">
              Register as a donor with your personal details, blood type, and location
            </p>
          </div>
          <div className="feature-card">
            <MdLocationOn className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Find Donation Camps</h3>
            <p className="text-gray-600">
              Discover active blood donation camps near you
            </p>
          </div>
          <div className="feature-card">
            <MdEmergency className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emergency Request</h3>
            <p className="text-gray-600">
              Quick blood request system for emergencies
            </p>
          </div>
          <div className="feature-card">
            <BsSearch className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Nearby</h3>
            <p className="text-gray-600">
              Find donors and hospitals in your vicinity
            </p>
          </div>
          <div className="feature-card">
            <BsCalendarCheck className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Donation History</h3>
            <p className="text-gray-600">
              Track your donations and check eligibility
            </p>
          </div>
        </div>
      </section>

      {/* Blood Donation Camp Dashboard */}
      <section className="dashboard-section">
        <h2 className="section-title">Blood Donation Camp Dashboard</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="feature-card">
            <BiDonateBlood className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Post Donation Camp</h3>
            <p className="text-gray-600">
              Organize and post details about upcoming blood donation camps
            </p>
          </div>
          <div className="feature-card">
            <FaHospital className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Participating Hospitals</h3>
            <p className="text-gray-600">
              View and manage participating healthcare organizations
            </p>
          </div>
        </div>
      </section>

      {/* Admin Dashboard */}
      <section className="dashboard-section pb-20">
        <h2 className="section-title">Admin Dashboard</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <FaUserShield className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
            <p className="text-gray-600">
              Oversee donors, organizers, and system users
            </p>
          </div>
          <div className="feature-card">
            <MdEmergency className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Monitor Requests</h3>
            <p className="text-gray-600">
              Track and manage emergency blood requests
            </p>
          </div>
          <div className="feature-card">
            <AiOutlineAreaChart className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">
              View comprehensive system statistics and reports
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 Blood Donation & Emergency Request System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
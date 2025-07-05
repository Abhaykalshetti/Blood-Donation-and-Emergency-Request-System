import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashBoard.jsx';
import DonorDashboard from './pages/donor/DonarDashBoard.jsx';
import DonorProfile from './pages/donor/DonorProfile2.jsx'
import OrganizationDashboard from './pages/organization/OrganizationDashBoard.jsx';
import ProtectedRoute from './components/ProtectedRoutes';
import CampDetails from './pages/organization/CampDetails.jsx';
import Manage from './pages/admin/Manage.jsx';
import FindCamps from './pages/donor/FindCamps.jsx';
import RequestSystem from './pages/donor/RequestSystem.jsx';
import ManageDonors from './pages/admin/ManageDonors.jsx';
import ManageRegistrations from './pages/organization/ManageRegistrations.jsx';
import Layout from './pages/Layout.jsx';
import Notifications from './pages/donor/Notifications.jsx';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        
        {/* Use ProtectedRoute for roles */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Manage/>
            </ProtectedRoute>
          }
        />
       <Route
          path="/manage-donors"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageDonors/>
            </ProtectedRoute>
          }
        />
        
        
        <Route
          path="/donor"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <DonorDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-profile"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <DonorProfile/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-camps"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <FindCamps/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-blood"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <RequestSystem/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/donor-notifications"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <Notifications/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedRoute allowedRoles={['organization']}>
              <OrganizationDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camp-details"
          element={
            <ProtectedRoute allowedRoles={['organization']}>
              <CampDetails/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-registration"
          element={
            <ProtectedRoute allowedRoles={['organization']}>
              <ManageRegistrations/>
            </ProtectedRoute>
          }
        />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;

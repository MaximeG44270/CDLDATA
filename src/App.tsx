import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from './hooks/useAdmin';
import { AdminLogin } from '../src/Components/Admin/AdminLogin';
import Home from '../src/pages/Home';
import AdminDashboard from './pages/AdminDashboard';

const AdminRoute = () => {
  const { isAdmin } = useAdmin();

  if (isAdmin === null) {
    return <div>Chargement...</div>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin-cdldata" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
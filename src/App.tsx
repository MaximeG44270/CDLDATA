import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from './hooks/useAdmin';
import { AdminLogin } from './Components/Admin/AdminLogin';
import Home from './pages/Home';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import AdminResultats from './Components/Admin/AdminResultats/AdminResultats';
import AdminCreation from './Components/Admin/AdminCreation/AdminCreation';

const AdminRoute = () => {
  const { isAdmin } = useAdmin();

  if (isAdmin === null) return <div>Chargement...</div>;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin-cdldata" element={<AdminDashboard />} />
        <Route path="/admin-resultats" element={<AdminResultats />} />
        <Route path="/admin-creation" element={<AdminCreation />} />
      </Route>
    </Routes>
  );
}

export default App;
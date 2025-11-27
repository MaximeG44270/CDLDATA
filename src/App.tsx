import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from './hooks/useAdmin';
import { AdminLogin } from './Components/Admin/AdminLogin';
import Home from './pages/Home';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import AdminResultats from './Components/Admin/AdminResultats/AdminResultats';
import AdminCreation from './Components/Admin/AdminCreation/AdminCreation';
import AdminSaison from './Components/Admin/AdminCreation/AdminSaison/AdminSaison';
import AdminEquipe from './Components/Admin/AdminCreation/AdminEquipe/AdminEquipe';
import AdminJoueurs from './Components/Admin/AdminCreation/AdminJoueur/AdminJoueurs';
import AdminMaps from './Components/Admin/AdminCreation/AdminMap/AdminMaps';

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
        <Route path="/admin-saison" element={<AdminSaison />} />
        <Route path="/admin-equipe" element={<AdminEquipe />} />
        <Route path="/admin-joueurs" element={<AdminJoueurs />} />
        <Route path='/admin-maps' element={<AdminMaps />} />
      </Route>
    </Routes>
  );
}

export default App;
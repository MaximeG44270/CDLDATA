import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Tableau de bord Admin</h1>
      <p>Bienvenue dans la zone administrateur. Ici, tu peux gérer les données sensibles.</p>

      <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h2>Statistiques</h2>
        <p>Nombre d'utilisateurs : 100</p>
        <p>Activité récente : Aucune alerte</p>
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h2>Actions rapides</h2>
        <button style={{ marginRight: '10px', padding: '8px 16px' }}>Ajouter un utilisateur</button>
        <button style={{ marginRight: '10px', padding: '8px 16px' }}>Gérer les rôles</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
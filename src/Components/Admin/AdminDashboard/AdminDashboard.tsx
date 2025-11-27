import { NavbarreAdmin } from "../Navbarre/NavbarreAdmin";
import { StatsCard } from "./StatsCard";
import { QuickActionCard } from "./QuickActionCard";
import { RecentTeamActivityList } from "../AdminDashboard/RecentTeamActivityList";
import { useRecentTeamActivities } from "../../../hooks/useRecentTeamActivities";

export default function AdminDashboard() {
  const teamActivities = useRecentTeamActivities();

  return (
    <div className="min-h-screen bg-[#f4f1f7]">
      <NavbarreAdmin />

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Bienvenue dans la zone administrateur</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Utilisateurs"
              value={100}
              description="Utilisateurs actifs"
              icon="👥"
              bgColor="bg-blue-100"
            />
            <StatsCard
              title="Équipes"
              value={24}
              description="Équipes enregistrées"
              icon="🏆"
              bgColor="bg-green-100"
            />
            <StatsCard
              title="Activité"
              value="85%"
              description="Taux d'activité"
              icon="⚡"
              bgColor="bg-yellow-100"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard label="Ajouter une saison" to="/admin-saison" />
              <QuickActionCard label="Ajouter une équipe" to="/admin-equipe" />
              <QuickActionCard label="Ajouter un joueur" to="/admin-joueurs" />
              <QuickActionCard label="Ajouter une map" to="/admin-maps" />
            </div>
          </div>

          <RecentTeamActivityList activities={teamActivities} />
        </div>
      </main>
    </div>
  );
}
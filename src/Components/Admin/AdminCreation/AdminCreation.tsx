import { useNavigate } from "react-router-dom";
import { NavbarreAdmin } from "../Navbarre/NavbarreAdmin";

export default function AdminCreation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f1f7] font-sans pt-16">
      <NavbarreAdmin />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Création</h1>

        <div
          onClick={() => navigate("/admin-saison")}
          className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition mb-4"
        >
          <p>Formulaire de création pour une saison</p>
        </div>

        <div
          onClick={() => navigate("/admin-equipe")}
          className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition mb-4"
        >
          <p>Formulaire de création pour une équipe</p>
        </div>

        <div
          onClick={() => navigate("/admin-joueurs")}
          className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition mb-4"
        >
          <p>Formulaire de création pour un joueur</p>
        </div>

        <div
          onClick={() => navigate("/admin-maps")}
          className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition"
        >
          <p>Formulaire de création pour une map</p>
        </div>
      </div>
    </div>
  );
}
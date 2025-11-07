import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarreAdmin } from "../../Navbarre/NavbarreAdmin";
import { supabase } from "../../../../lib/supabaseClient";
import { AdminAjoutJoueur } from "./AdminAjoutJoueur";
import { AdminTableauJoueur } from "./AdminTableauJoueurs";
import type { Joueur, Equipe, Saison } from "../../../../types/types";

type PlayerFromSupabase = {
  id: number;
  team_id: number;
  gamertag: string;
  role: string;
  first_name?: string;
  last_name?: string;
  birth_country?: string;
  birth_date?: string;
  teams: { name: string } | { name: string }[] | null;
};

export default function AdminJoueurs() {
  const navigate = useNavigate();
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [saisons, setSaisons] = useState<Saison[]>([]);
  const [saisonSelectionnee, setSaisonSelectionnee] = useState<number | "">("");
  const [teamChoisie, setTeamChoisie] = useState<number | "">("");
  const [gamertag, setGamertag] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<{ id: number; gamertag: string } | null>(null);

  const fetchSaisons = async () => {
    const { data, error } = await supabase
      .from("seasons")
      .select("id, name, start_date, end_date")
      .order("name", { ascending: false });

    if (error) {
      console.error("Erreur lors du chargement des saisons :", error);
      setMessage("❌ Erreur lors du chargement des saisons.");
      return;
    }

    if (data) {
      console.log("Saisons chargées :", data);
      setSaisons(data);
    }
  };

  const fetchEquipes = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("id, name, season_id, logo_url, franchise_name, structure_name, seasons(name)")
      .order("name");

    if (error || !data) {
      setMessage("❌ Erreur lors du chargement des équipes.");
      return;
    }

    const formatted: Equipe[] = data.map((eq) => {
      const seasons = eq.seasons as { name: string }[] | { name: string } | null;
      const seasonName =
        Array.isArray(seasons) && seasons.length > 0
          ? seasons[0].name
          : seasons && typeof seasons === "object" && "name" in seasons
          ? seasons.name
          : "Saison inconnue";

      return {
        id: eq.id,
        name: eq.name,
        season_id: eq.season_id,
        season_name: seasonName,
        logo_url: eq.logo_url ?? undefined,
        franchise_name: eq.franchise_name,
        structure_name: eq.structure_name ?? undefined,
      };
    });

    console.log("Équipes chargées :", formatted);
    setEquipes(formatted);
  };

  const fetchJoueurs = async () => {
    const { data, error } = await supabase
      .from("players")
      .select("id, team_id, gamertag, role, first_name, last_name, birth_country, birth_date, teams(name)")
      .order("id");

    if (error || !data) {
      setMessage("❌ Erreur lors du chargement des joueurs.");
      return;
    }

    const formatted: Joueur[] = (data as PlayerFromSupabase[]).map((j) => {
      let teamName = "Équipe inconnue";

      if (j.teams) {
        if (Array.isArray(j.teams)) {
          teamName = j.teams.length > 0 ? j.teams[0].name : "Équipe inconnue";
        } else if ("name" in j.teams) {
          teamName = j.teams.name;
        }
      }

      return {
        id: j.id,
        team_id: j.team_id,
        gamertag: j.gamertag,
        role: j.role,
        team_name: teamName,
        first_name: j.first_name,
        last_name: j.last_name,
        birth_country: j.birth_country,
        birth_date: j.birth_date,
      };
    });

    setJoueurs(formatted);
  };

  const addJoueur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gamertag.trim() || !teamChoisie || !role.trim() || !firstName.trim() || !lastName.trim()) {
      setMessage("⚠️ Veuillez remplir tous les champs obligatoires.");
      return setTimeout(() => setMessage(null), 3000);
    }
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("players")
        .insert([{ 
          team_id: Number(teamChoisie), 
          gamertag: gamertag.trim(), 
          role: role.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          birth_country: birthCountry.trim() || null,
          birth_date: birthDate || null,
        }]);
      if (error) throw error;
      
      setGamertag("");
      setRole("");
      setFirstName("");
      setLastName("");
      setBirthCountry("");
      setBirthDate("");
      setTeamChoisie("");
      setSaisonSelectionnee("");
      
      setMessage("✅ Joueur ajouté !");
      await fetchJoueurs();
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      setMessage("❌ Erreur lors de l'ajout du joueur.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const confirmDeleteJoueur = (id: number, gamertag: string) => setPopup({ id, gamertag });

  const deleteJoueur = async (id: number) => {
    setIsLoading(true);
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (error) setMessage("❌ Erreur lors de la suppression.");
    else {
      setMessage("🗑️ Joueur supprimé !");
      await fetchJoueurs();
    }
    setPopup(null);
    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    fetchSaisons();
    fetchEquipes();
    fetchJoueurs();
  }, []);

  const filteredJoueurs = teamChoisie ? joueurs.filter((j) => j.team_id === teamChoisie) : joueurs;

  return (
    <div className="min-h-screen bg-[#f4f1f7] font-cdl pt-16">
      <NavbarreAdmin />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des joueurs</h1>
          <button
            onClick={() => navigate("/admin-creation")}
            className="bg-[#2495d8] hover:bg-[#1a73b8] text-white px-4 py-2 rounded transition"
          >
            Retour à l'accueil création
          </button>
        </div>
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.includes("❌") || message.includes("⚠️")
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {message}
          </div>
        )}
        <AdminAjoutJoueur
          gamertag={gamertag}
          setGamertag={setGamertag}
          role={role}
          setRole={setRole}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          birthCountry={birthCountry}
          setBirthCountry={setBirthCountry}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          teamChoisie={teamChoisie}
          setTeamChoisie={setTeamChoisie}
          saisonSelectionnee={saisonSelectionnee}
          setSaisonSelectionnee={setSaisonSelectionnee}
          equipes={equipes}
          saisons={saisons}
          addJoueur={addJoueur}
          isLoading={isLoading}
        />
        <AdminTableauJoueur
          joueurs={filteredJoueurs}
          deleteJoueur={confirmDeleteJoueur}
          isLoading={isLoading}
          equipes={equipes}
          teamChoisie={teamChoisie}
          setTeamChoisie={setTeamChoisie}
        />
        {popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
              <p className="mb-4 text-gray-700">
                Supprimer le joueur <span className="font-semibold">{popup.gamertag}</span> ?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setPopup(null)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={() => deleteJoueur(popup.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-800 transition"
                  disabled={isLoading}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
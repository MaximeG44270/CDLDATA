import React from "react";
import type { Equipe, Saison } from "../../../../types/types";

interface Props {
  gamertag: string;
  setGamertag: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  birthCountry: string;
  setBirthCountry: (value: string) => void;
  birthDate: string;
  setBirthDate: (value: string) => void;
  teamChoisie: number | "";
  setTeamChoisie: (value: number | "") => void;
  saisonSelectionnee: number | "";
  setSaisonSelectionnee: (value: number | "") => void;
  equipes: Equipe[];
  saisons: Saison[];
  addJoueur: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const AdminAjoutJoueur: React.FC<Props> = ({
  gamertag,
  setGamertag,
  role,
  setRole,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthCountry,
  setBirthCountry,
  birthDate,
  setBirthDate,
  teamChoisie,
  setTeamChoisie,
  saisonSelectionnee,
  setSaisonSelectionnee,
  equipes = [],
  saisons = [],
  addJoueur,
  isLoading,
}) => {
  console.log("Saisons reçues dans AdminAjoutJoueur :", saisons);
  console.log("Équipes reçues dans AdminAjoutJoueur :", equipes);

  return (
    <div className="bg-white p-6 rounded shadow mb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Ajouter un joueur
      </h2>

      <form
        onSubmit={addJoueur}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="text"
          placeholder="Gamertag"
          value={gamertag}
          onChange={(e) => setGamertag(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="text"
          placeholder="Rôle"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="text"
          placeholder="Pays de naissance"
          value={birthCountry}
          onChange={(e) => setBirthCountry(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <select
          value={saisonSelectionnee}
          onChange={(e) =>
            setSaisonSelectionnee(
              e.target.value ? Number(e.target.value) : ""
            )
          }
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading || saisons.length === 0}
        >
          <option value="">Sélectionnez une saison</option>
          {saisons.length > 0 ? (
            saisons.map((saison) => (
              <option key={saison.id} value={saison.id}>
                {saison.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Aucune saison disponible
            </option>
          )}
        </select>

        <select
          value={teamChoisie}
          onChange={(e) =>
            setTeamChoisie(e.target.value ? Number(e.target.value) : "")
          }
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading || !saisonSelectionnee || equipes.length === 0}
        >
          <option value="">Sélectionnez une équipe</option>
          {equipes.length > 0 ? (
            equipes
              .filter(
                (eq) =>
                  !saisonSelectionnee || eq.season_id === saisonSelectionnee
              )
              .map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.season_name || "Saison inconnue"})
                </option>
              ))
          ) : (
            <option value="" disabled>
              Aucune équipe disponible
            </option>
          )}
        </select>

        <button
          type="submit"
          disabled={isLoading || !saisonSelectionnee || !teamChoisie}
          className="bg-[#2495d8] hover:bg-[#1a73b8] text-white px-4 py-2 rounded transition disabled:opacity-50 md:col-span-2"
        >
          {isLoading ? "Chargement..." : "Ajouter le joueur"}
        </button>
      </form>
    </div>
  );
};

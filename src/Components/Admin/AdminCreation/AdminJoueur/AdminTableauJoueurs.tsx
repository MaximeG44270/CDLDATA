import React, { useState } from "react";
import type { Joueur, Equipe } from "../../../../types/types";

interface Props {
  joueurs: Joueur[];
  deleteJoueur: (id: number, gamertag: string) => void;
  isLoading: boolean;
  equipes: Equipe[];
  teamChoisie: number | "";
  setTeamChoisie: (value: number | "") => void;
}

export const AdminTableauJoueur: React.FC<Props> = ({
  joueurs,
  deleteJoueur,
  isLoading,
  equipes,
  teamChoisie,
  setTeamChoisie,
}) => {
  const [saisonChoisie, setSaisonChoisie] = useState<string | "">("");
  const saisonsUniques = [...new Set(equipes.map(eq => eq.season_name))];

  const joueursFiltres = joueurs.filter(joueur => {
    const equipe = equipes.find(eq => eq.id === joueur.team_id);
    const saisonCorrespond = saisonChoisie === "" || equipe?.season_name === saisonChoisie;
    const equipeCorrespond = teamChoisie === "" || joueur.team_id === teamChoisie;
    return saisonCorrespond && equipeCorrespond;
  });

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4 space-x-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Liste des joueurs ({joueursFiltres.length})
        </h2>
        <select
          value={saisonChoisie}
          onChange={(e) => setSaisonChoisie(e.target.value || "")}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
        >
          <option value="">Toutes les saisons</option>
          {saisonsUniques.map((saison) => (
            <option key={saison} value={saison}>
              {saison}
            </option>
          ))}
        </select>
        <select
          value={teamChoisie}
          onChange={(e) => setTeamChoisie(e.target.value ? Number(e.target.value) : "")}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
        >
          <option value="">Toutes les équipes</option>
          {equipes
            .filter(eq => saisonChoisie === "" || eq.season_name === saisonChoisie)
            .map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name} ({eq.season_name})
              </option>
            ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left p-3 font-semibold text-gray-700">ID</th>
              <th className="text-left p-3 font-semibold text-gray-700">Prénom</th>
              <th className="text-left p-3 font-semibold text-gray-700">Nom</th>
              <th className="text-left p-3 font-semibold text-gray-700">Gamertag</th>
              <th className="text-left p-3 font-semibold text-gray-700">Rôle</th>
              <th className="text-left p-3 font-semibold text-gray-700">Pays</th>
              <th className="text-left p-3 font-semibold text-gray-700">Date de naissance</th>
              <th className="text-left p-3 font-semibold text-gray-700">Équipe</th>
              <th className="text-center p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {joueursFiltres.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-6 text-gray-500">Aucun joueur trouvé</td>
              </tr>
            ) : (
              joueursFiltres.map((joueur) => (
                <tr key={joueur.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-600">{joueur.id}</td>
                  <td className="p-3 text-gray-800">
                    {joueur.first_name || <span className="text-gray-400 italic">Non renseigné</span>}
                  </td>
                  <td className="p-3 text-gray-800">
                    {joueur.last_name || <span className="text-gray-400 italic">Non renseigné</span>}
                  </td>
                  <td className="p-3 font-semibold text-[#2495d8]">{joueur.gamertag}</td>
                  <td className="p-3 text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{joueur.role}</span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {joueur.birth_country || <span className="text-gray-400 italic">-</span>}
                  </td>
                  <td className="p-3 text-gray-600">
                    {joueur.birth_date ? new Date(joueur.birth_date).toLocaleDateString('fr-FR') : <span className="text-gray-400 italic">-</span>}
                  </td>
                  <td className="p-3 text-gray-600">{joueur.team_name}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteJoueur(joueur.id, joueur.gamertag)}
                      disabled={isLoading}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition disabled:opacity-50 text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden mt-4 space-y-4">
        {joueursFiltres.length === 0 ? (
          <div className="text-center p-6 text-gray-500">Aucun joueur trouvé</div>
        ) : (
          joueursFiltres.map((joueur) => (
            <div key={joueur.id} className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-[#2495d8] text-lg">{joueur.gamertag}</p>
                  <p className="text-sm text-gray-600">{joueur.first_name} {joueur.last_name}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{joueur.role}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p><span className="font-semibold">Équipe:</span> {joueur.team_name}</p>
                {joueur.birth_country && <p><span className="font-semibold">Pays:</span> {joueur.birth_country}</p>}
                {joueur.birth_date && <p><span className="font-semibold">Date de naissance:</span> {new Date(joueur.birth_date).toLocaleDateString('fr-FR')}</p>}
                <p className="text-xs text-gray-400">ID: {joueur.id}</p>
              </div>
              <button
                onClick={() => deleteJoueur(joueur.id, joueur.gamertag)}
                disabled={isLoading}
                className="w-full bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded transition disabled:opacity-50 text-sm"
              >
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
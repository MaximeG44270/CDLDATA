import React from "react";
import type { Equipe, Saison } from "./AdminEquipe";

export interface Props {
  equipes: Equipe[];
  deleteEquipe: (id: number, name: string) => void;
  isLoading: boolean;
  saisons: Saison[];
  saisonChoisie: number | "";
  setSaisonChoisie: React.Dispatch<React.SetStateAction<number | "">>;
}

export const AdminTableauTeam: React.FC<Props> = ({
  equipes,
  deleteEquipe,
  isLoading,
  saisons,
  saisonChoisie,
  setSaisonChoisie,
}) => {
  const equipesFiltrees = saisonChoisie
    ? equipes.filter((eq) => eq.season_id === saisonChoisie)
    : equipes;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Liste des équipes</h2>
        <select
          value={saisonChoisie}
          onChange={(e) =>
            setSaisonChoisie(e.target.value ? Number(e.target.value) : "")
          }
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        >
          <option value="">Toutes les saisons</option>
          {saisons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 border-b">Logo</th>
              <th className="p-3 border-b">Nom</th>
              <th className="p-3 border-b">Franchise</th>
              <th className="p-3 border-b">Structure</th>
              <th className="p-3 border-b">Saison</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipesFiltrees.map((eq) => (
              <tr key={eq.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  {eq.logo_url ? (
                    <img
                      src={eq.logo_url}
                      alt={eq.name}
                      className="w-[50px] h-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Aucun logo</span>
                  )}
                </td>
                <td className="p-3 border-b font-medium">{eq.name}</td>
                <td className="p-3 border-b">{eq.franchise_name}</td>
                <td className="p-3 border-b">{eq.structure_name || "-"}</td>
                <td className="p-3 border-b">{eq.season_name}</td>
                <td className="p-3 border-b text-center">
                  <button
                    onClick={() => deleteEquipe(eq.id, eq.name)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
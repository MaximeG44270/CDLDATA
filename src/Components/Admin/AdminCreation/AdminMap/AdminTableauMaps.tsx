import React from "react";
import type { Map, Saison } from "../../../../types/types";

interface Props {
  maps: Map[];
  deleteMap: (id: number, name: string) => void;
  isLoading: boolean;
  saisons: Saison[];
  saisonChoisie: number | "";
  setSaisonChoisie: (value: number | "") => void;
}

export const AdminTableauMaps: React.FC<Props> = ({
  maps,
  deleteMap,
  isLoading,
  saisons,
  saisonChoisie,
  setSaisonChoisie,
}) => {
  const mapsFiltrees = saisonChoisie 
    ? maps.filter((map) => map.season_id === saisonChoisie) 
    : maps;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Liste des maps ({mapsFiltrees.length})
        </h2>
        <select
          value={saisonChoisie}
          onChange={(e) => setSaisonChoisie(e.target.value ? Number(e.target.value) : "")}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
        >
          <option value="">Toutes les saisons</option>
          {saisons.map((saison) => (
            <option key={saison.id} value={saison.id}>
              {saison.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left p-3 font-semibold text-gray-700">Image</th>
              <th className="text-left p-3 font-semibold text-gray-700">Nom</th>
              <th className="text-left p-3 font-semibold text-gray-700">Saison</th>
              <th className="text-center p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mapsFiltrees.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  Aucune map trouvée
                </td>
              </tr>
            ) : (
              mapsFiltrees.map((map) => (
                <tr key={map.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img 
                      src={map.image_url || "https://via.placeholder.com/80x60?text=Map"} 
                      alt={map.name}
                      className="w-20 h-15 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/80x60?text=Map";
                      }}
                    />
                  </td>
                  <td className="p-3 font-semibold text-[#2495d8]">{map.name}</td>
                  <td className="p-3 text-gray-600">{map.season_name || "Saison inconnue"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteMap(map.id, map.name)}
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

      <div className="md:hidden space-y-4">
        {mapsFiltrees.length === 0 ? (
          <div className="text-center p-6 text-gray-500">Aucune map trouvée</div>
        ) : (
          mapsFiltrees.map((map) => (
            <div key={map.id} className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <img 
                  src={map.image_url || "https://via.placeholder.com/100x75?text=Map"} 
                  alt={map.name}
                  className="w-24 h-18 rounded object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100x75?text=Map";
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-[#2495d8] text-lg">{map.name}</p>
                  <p className="text-sm text-gray-600">{map.season_name || "Saison inconnue"}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {map.id}</p>
                </div>
              </div>
              <button
                onClick={() => deleteMap(map.id, map.name)}
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
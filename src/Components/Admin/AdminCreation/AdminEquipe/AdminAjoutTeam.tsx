import React, { useRef } from "react";
import type { Saison } from "./AdminEquipe";


interface Props {
  nomEquipe: string;
  setNomEquipe: (value: string) => void;
  franchiseName: string;
  setFranchiseName: (value: string) => void;
  structureName: string;
  setStructureName: (value: string) => void;
  saisonChoisie: number | "";
  setSaisonChoisie: (value: number | "") => void;
  saisons: Saison[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addEquipe: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const AdminAjoutTeam: React.FC<Props> = ({
  nomEquipe,
  setNomEquipe,
  franchiseName,
  setFranchiseName,
  structureName,
  setStructureName,
  saisonChoisie,
  setSaisonChoisie,
  saisons,
  handleFileChange,
  addEquipe,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    addEquipe(e);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Ajouter une équipe</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nom de l'équipe"
          value={nomEquipe}
          onChange={(e) => setNomEquipe(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="text"
          placeholder="Nom de la franchise"
          value={franchiseName}
          onChange={(e) => setFranchiseName(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <input
          type="text"
          placeholder="Nom de la structure (optionnel)"
          value={structureName}
          onChange={(e) => setStructureName(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <select
          value={saisonChoisie}
          onChange={(e) =>
            setSaisonChoisie(e.target.value ? Number(e.target.value) : "")
          }
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        >
          <option value="">Sélectionnez une saison</option>
          {saisons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2495d8] hover:bg-[#1a73b8] text-white px-4 py-2 rounded transition disabled:opacity-50 md:col-span-2"
        >
          {isLoading ? "Chargement..." : "Ajouter l'équipe"}
        </button>
      </form>
    </div>
  );
};
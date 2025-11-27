import React, { useRef, useState } from "react";
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
  const [preview, setPreview] = useState<string>("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    addEquipe(e);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview("");
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Ajouter une équipe
      </h2>

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

        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Logo de l'équipe
          </h2>

          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                disabled={isLoading}
                className="hidden"
              />

              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:border-[#2495d8] transition">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="mt-2 text-sm text-gray-600">
                  {preview ? "Image sélectionnée" : "Cliquez pour sélectionner une image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP jusqu'à 5MB
                </p>
              </div>
            </label>

            {preview && (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 rounded object-cover border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

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

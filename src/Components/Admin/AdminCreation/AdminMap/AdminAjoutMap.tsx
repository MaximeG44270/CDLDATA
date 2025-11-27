import React from "react";
import type { Saison } from "../../../../types/types";

interface Props {
  name: string;
  setName: (value: string) => void;
  imageUrl: string;
  setImageUrl: (value: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  saisonSelectionnee: number | "";
  setSaisonSelectionnee: (value: number | "") => void;
  saisons: Saison[];
  addMap: (e: React.FormEvent) => void;
  isLoading: boolean;
  uploadProgress: number;
}

export const AdminAjoutMap: React.FC<Props> = ({
  name,
  setName,
  imageUrl,
  setImageUrl,
  imageFile,
  setImageFile,
  saisonSelectionnee,
  setSaisonSelectionnee,
  saisons = [],
  addMap,
  isLoading,
  uploadProgress,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImageUrl("");
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Ajouter une map
      </h2>

      <form onSubmit={addMap} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nom de la map"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image de la map
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
                id="map-image-upload"
              />
              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-[#2495d8] transition">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  {imageFile ? imageFile.name : 'Cliquez pour sélectionner une image'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF jusqu'à 5MB</p>
              </div>
            </label>
            
            {imageUrl && (
              <div className="relative">
                <img 
                  src={imageUrl} 
                  alt="Aperçu" 
                  className="w-32 h-32 rounded object-cover border-2 border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/128?text=?";
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isLoading}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#2495d8] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">Upload en cours... {uploadProgress}%</p>
            </div>
          )}
        </div>

        <div>
          <select
            value={saisonSelectionnee}
            onChange={(e) =>
              setSaisonSelectionnee(
                e.target.value ? Number(e.target.value) : ""
              )
            }
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#2495d8]"
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
        </div>

        <button
          type="submit"
          disabled={isLoading || !saisonSelectionnee || !name.trim()}
          className="w-full bg-[#2495d8] hover:bg-[#1a73b8] text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          {isLoading ? "Chargement..." : "Ajouter la map"}
        </button>
      </form>
    </div>
  );
};
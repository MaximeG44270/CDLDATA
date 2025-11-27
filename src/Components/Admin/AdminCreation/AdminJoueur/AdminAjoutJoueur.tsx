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
  imageUrl: string;
  setImageUrl: (value: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  teamChoisie: number | "";
  setTeamChoisie: (value: number | "") => void;
  saisonSelectionnee: number | "";
  setSaisonSelectionnee: (value: number | "") => void;
  equipes: Equipe[];
  saisons: Saison[];
  addJoueur: (e: React.FormEvent) => void;
  isLoading: boolean;
  uploadProgress: number;
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
  imageUrl,
  setImageUrl,
  imageFile,
  setImageFile,
  teamChoisie,
  setTeamChoisie,
  saisonSelectionnee,
  setSaisonSelectionnee,
  equipes = [],
  saisons = [],
  addJoueur,
  isLoading,
  uploadProgress,
}) => {
  console.log("Saisons reçues dans AdminAjoutJoueur :", saisons);
  console.log("Équipes reçues dans AdminAjoutJoueur :", equipes);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }
      setImageFile(file);
      // Créer un aperçu local
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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image du joueur
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
                id="image-upload"
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
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/96?text=?";
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
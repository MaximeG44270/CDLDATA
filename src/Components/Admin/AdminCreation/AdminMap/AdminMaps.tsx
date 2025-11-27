import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarreAdmin } from "../../Navbarre/NavbarreAdmin";
import { supabase } from "../../../../lib/supabaseClient";
import { AdminAjoutMap } from "./AdminAjoutMap";
import { AdminTableauMaps } from "./AdminTableauMaps";
import type { Map, Saison } from "../../../../types/types";

type MapFromSupabase = {
  id: number;
  season_id: number;
  name: string;
  image_url?: string;
  seasons: { name: string } | { name: string }[] | null;
};

export default function AdminMaps() {
  const navigate = useNavigate();
  const [maps, setMaps] = useState<Map[]>([]);
  const [saisons, setSaisons] = useState<Saison[]>([]);
  const [saisonSelectionnee, setSaisonSelectionnee] = useState<number | "">("");
  const [saisonChoisie, setSaisonChoisie] = useState<number | "">("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<{ id: number; name: string } | null>(null);

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

  const fetchMaps = async () => {
    const { data, error } = await supabase
      .from("maps")
      .select("id, season_id, name, image_url, seasons(name)")
      .order("id");

    if (error || !data) {
      setMessage("❌ Erreur lors du chargement des maps.");
      return;
    }

    const formatted: Map[] = (data as MapFromSupabase[]).map((m) => {
      let seasonName = "Saison inconnue";

      if (m.seasons) {
        if (Array.isArray(m.seasons)) {
          seasonName = m.seasons.length > 0 ? m.seasons[0].name : "Saison inconnue";
        } else if ("name" in m.seasons) {
          seasonName = m.seasons.name;
        }
      }

      return {
        id: m.id,
        season_id: m.season_id,
        name: m.name,
        image_url: m.image_url,
        season_name: seasonName,
      };
    });

    setMaps(formatted);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadProgress(10);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      setUploadProgress(30);

      const { error } = await supabase.storage
        .from('map-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Erreur lors de l'upload :", error);
        throw error;
      }

      setUploadProgress(70);

      const { data: urlData } = supabase.storage
        .from('map-images')
        .getPublicUrl(filePath);

      setUploadProgress(100);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error("Erreur upload :", error);
      setMessage("❌ Erreur lors de l'upload de l'image.");
      setTimeout(() => setMessage(null), 3000);
      return null;
    } finally {
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const addMap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !saisonSelectionnee) {
      setMessage("⚠️ Veuillez remplir tous les champs obligatoires.");
      return setTimeout(() => setMessage(null), 3000);
    }
    
    setIsLoading(true);
    
    try {
      let finalImageUrl = null;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
        if (!finalImageUrl) {
          setIsLoading(false);
          return;
        }
      }

      const { error } = await supabase
        .from("maps")
        .insert([{ 
          season_id: Number(saisonSelectionnee), 
          name: name.trim(),
          image_url: finalImageUrl,
        }]);
        
      if (error) throw error;
      
      setName("");
      setImageUrl("");
      setImageFile(null);
      setSaisonSelectionnee("");
      
      setMessage("✅ Map ajoutée avec succès !");
      await fetchMaps();
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      setMessage("❌ Erreur lors de l'ajout de la map.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const confirmDeleteMap = (id: number, name: string) => setPopup({ id, name });

  const deleteMap = async (id: number) => {
    setIsLoading(true);
    
    try {
      const map = maps.find(m => m.id === id);
      
      if (map?.image_url) {
        const urlParts = map.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        await supabase.storage
          .from('map-images')
          .remove([fileName]);
      }
      
      const { error } = await supabase.from("maps").delete().eq("id", id);
      
      if (error) throw error;
      
      setMessage("🗑️ Map supprimée avec succès !");
      await fetchMaps();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setMessage("❌ Erreur lors de la suppression.");
    } finally {
      setPopup(null);
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  useEffect(() => {
    fetchSaisons();
    fetchMaps();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f1f7] font-cdl pt-16">
      <NavbarreAdmin />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des maps</h1>
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
        
        <AdminAjoutMap
          name={name}
          setName={setName}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          imageFile={imageFile}
          setImageFile={setImageFile}
          saisonSelectionnee={saisonSelectionnee}
          setSaisonSelectionnee={setSaisonSelectionnee}
          saisons={saisons}
          addMap={addMap}
          isLoading={isLoading}
          uploadProgress={uploadProgress}
        />
        
        <AdminTableauMaps
          maps={maps}
          deleteMap={confirmDeleteMap}
          isLoading={isLoading}
          saisons={saisons}
          saisonChoisie={saisonChoisie}
          setSaisonChoisie={setSaisonChoisie}
        />
        
        {popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
              <p className="mb-4 text-gray-700">
                Supprimer la map <span className="font-semibold">{popup.name}</span> ?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setPopup(null)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={() => deleteMap(popup.id)}
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
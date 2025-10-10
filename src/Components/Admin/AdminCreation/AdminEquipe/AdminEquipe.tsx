import React, { useEffect, useState } from "react";
import { NavbarreAdmin } from "../../Navbarre/NavbarreAdmin";
import { supabase } from "../../../../lib/supabaseClient";
import { AdminAjoutTeam } from "./AdminAjoutTeam";
import { AdminTableauTeam } from "./AdminTableauTeam";

export interface Saison {
  id: number;
  name: string;
}

export interface Equipe {
  id: number;
  name: string;
  season_id: number;
  season_name: string;
  logo_url?: string;
  franchise_name: string;
  structure_name?: string;
}

interface RawTeamRow {
  id: number;
  name: string;
  season_id: number;
  logo_url: string | null;
  franchise_name: string;
  structure_name: string | null;
  seasons: { name: string }[] | { name: string } | null;
}

export default function AdminEquipe() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [saisons, setSaisons] = useState<Saison[]>([]);
  const [nomEquipe, setNomEquipe] = useState("");
  const [saisonChoisie, setSaisonChoisie] = useState<number | "">("");
  const [franchiseName, setFranchiseName] = useState("");
  const [structureName, setStructureName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<{ id: number; name: string } | null>(null);

  const fetchSaisons = async () => {
    const { data, error } = await supabase.from("seasons").select("*").order("id");
    if (error || !data) {
      setMessage("❌ Erreur lors du chargement des saisons.");
      return;
    }
    setSaisons(data as Saison[]);
  };

  const fetchEquipes = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("id, name, season_id, logo_url, franchise_name, structure_name, seasons(name)")
      .order("id");

    if (error || !data) {
      setMessage("❌ Erreur lors du chargement des équipes.");
      return;
    }

    const formatted: Equipe[] = (data as RawTeamRow[]).map((equipe) => {
      let seasonName = "Saison inconnue";
      if (equipe.seasons) {
        if (Array.isArray(equipe.seasons) && equipe.seasons.length > 0) {
          seasonName = equipe.seasons[0].name;
        } else if (!Array.isArray(equipe.seasons)) {
          seasonName = equipe.seasons.name;
        }
      }
      return {
        id: equipe.id,
        name: equipe.name,
        season_id: equipe.season_id,
        season_name: seasonName,
        logo_url: equipe.logo_url ?? undefined,
        franchise_name: equipe.franchise_name,
        structure_name: equipe.structure_name ?? undefined,
      };
    });
    setEquipes(formatted);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validExtensions = ["jpg", "jpeg", "png", "webp"];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt || !validExtensions.includes(fileExt)) {
      setMessage("❌ Seules les images (JPEG, PNG, WebP) sont autorisées.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage("❌ L'image ne doit pas dépasser 2 Mo.");
      return;
    }
    setLogoFile(file);
  };

  const addEquipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomEquipe.trim() || !saisonChoisie || !franchiseName.trim()) {
      setMessage("⚠️ Veuillez remplir le nom, la franchise et choisir une saison.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const existing = equipes.find(
      (eq) => eq.name.toLowerCase() === nomEquipe.trim().toLowerCase() && eq.season_id === Number(saisonChoisie)
    );
    if (existing) {
      setMessage("⚠️ Cette équipe existe déjà pour cette saison.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    let logo_url: string | undefined;
    if (logoFile) {
      try {
        const fileExt = logoFile.name.split(".").pop() ?? "png";
        const fileName = `${Date.now()}_${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("team-logos").upload(fileName, logoFile);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from("team-logos").getPublicUrl(fileName);
        logo_url = publicUrlData.publicUrl;
      } catch {
        setMessage("❌ Erreur lors de l'upload du logo.");
        setIsLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("teams").insert([
      {
        name: nomEquipe.trim(),
        season_id: Number(saisonChoisie),
        logo_url,
        franchise_name: franchiseName.trim(),
        structure_name: structureName.trim() || null,
      },
    ]);

    if (error) setMessage("❌ Erreur lors de l'ajout de l'équipe.");
    else {
      setNomEquipe("");
      setSaisonChoisie("");
      setFranchiseName("");
      setStructureName("");
      setLogoFile(null);
      setMessage("✅ Équipe ajoutée !");
      fetchEquipes();
    }

    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const confirmDeleteEquipe = (id: number, name: string) => setPopup({ id, name });

  const deleteEquipe = async (id: number) => {
    setIsLoading(true);
    const { error } = await supabase.from("teams").delete().eq("id", id);
    if (error) setMessage("❌ Erreur lors de la suppression.");
    else {
      setMessage("🗑️ Équipe supprimée !");
      fetchEquipes();
    }
    setPopup(null);
    setIsLoading(false);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    fetchSaisons();
    fetchEquipes();
  }, []);

  const filteredEquipes = saisonChoisie
    ? equipes.filter((eq) => eq.season_id === saisonChoisie)
    : equipes;

  return (
    <div className="min-h-screen bg-[#f4f1f7] font-cdl pt-16">
      <NavbarreAdmin />
      <div className="max-w-6xl mx-auto p-6">
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

        <AdminAjoutTeam
          nomEquipe={nomEquipe}
          setNomEquipe={setNomEquipe}
          franchiseName={franchiseName}
          setFranchiseName={setFranchiseName}
          structureName={structureName}
          setStructureName={setStructureName}
          saisonChoisie={saisonChoisie}
          setSaisonChoisie={setSaisonChoisie}
          saisons={saisons}
          handleFileChange={handleFileChange}
          addEquipe={addEquipe}
          isLoading={isLoading}
        />

        <AdminTableauTeam
          equipes={filteredEquipes}
          deleteEquipe={confirmDeleteEquipe}
          isLoading={isLoading}
          saisons={saisons}
          saisonChoisie={saisonChoisie}
          setSaisonChoisie={setSaisonChoisie}
        />

        {popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
              <p className="mb-4 text-gray-700">
                Supprimer l'équipe <span className="font-semibold">{popup.name}</span> ?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setPopup(null)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={() => deleteEquipe(popup.id)}
                  className="px-4 py-2 rounded bg-[#2495d8] text-white hover:bg-[#2495d8] transition"
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
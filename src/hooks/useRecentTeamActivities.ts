import { useState, useEffect } from "react";
import { supabase } from "../../src/lib/supabaseClient";

export interface TeamActivity {
  id: string;
  name: string;
  updated_at: string;
}

export function useRecentTeamActivities() {
  const [activities, setActivities] = useState<TeamActivity[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("id, name, updated_at")
        .order("updated_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error(error);
        return;
      }

      setActivities(data || []);
    };

    fetchTeams();
  }, []);

  return activities;
}
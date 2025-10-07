import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      console.log('Vérification du statut admin en cours...');

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Erreur lors de la récupération de l’utilisateur :', userError);
        setIsAdmin(false);
        return;
      }

      if (!user) {
        console.log('Aucun utilisateur connecté.');
        setIsAdmin(false);
        return;
      }

      console.log('Utilisateur connecté :', user);

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (roleError) {
        console.error('Erreur lors de la récupération du rôle :', roleError);
        setIsAdmin(false);
        return;
      }

      console.log('Rôle récupéré depuis la base :', roleData.role);

      if (roleData.role === 'admin') {
        console.log('Utilisateur est admin ✅');
        setIsAdmin(true);
      } else {
        console.log('Utilisateur n’est pas admin ❌');
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return { isAdmin };
};
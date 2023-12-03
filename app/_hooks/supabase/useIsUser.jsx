import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useIsUser() {
    const supabase = createClientComponentClient();
    const [isUser, setIsUser] = useState(null);
  
    useEffect(() => {
      const checkIsUser = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (data && data.session) {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
        if (error) {
          console.log(error);
        }
      };
      checkIsUser();
    }, []);
  
    const setSignOut = () => {
      setIsUser(false);
    };
  
    return { isUser, setSignOut };
  }
  
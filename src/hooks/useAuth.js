import { useEffect, useState } from "react";
import { onAuthStateChange } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初期化時にサブスクリプションを設定
    const subscription = onAuthStateChange((authUser, authSession) => {
      setUser(authUser);
      setSession(authSession);
      setIsLoading(false);
    });

    return () => {
      // クリーンアップ
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { user, session, isLoading };
};

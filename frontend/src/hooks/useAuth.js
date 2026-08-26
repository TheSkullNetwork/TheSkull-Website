import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config.js";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, { credentials: "include" });
      const data = await res.json();
      setUser(data.loggedIn ? data.user : null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    } finally {
      setUser(null);
    }
  }, []);

  return {
    user,
    isAdmin: Boolean(user?.isAdmin),
    loading,
    refresh,
    logout,
    loginUrl: `${BACKEND_URL}/auth/discord`
  };
}

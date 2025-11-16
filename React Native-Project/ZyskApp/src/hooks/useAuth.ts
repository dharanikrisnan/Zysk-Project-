import { useState, useEffect } from "react";
import { login, signup, verifyToken } from "@/src/api/auth";
import { saveToken, getToken, removeToken } from "@/src/utils/storage";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        if (token) {
          const res = await verifyToken(token);
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            await removeToken();
          }
        }
      } catch (err) {
        console.error(" Session restore failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signupUser = async (name: string, email: string, password: string) => {
    setLoading(true);
    const res = await signup(name, email, password);
    setLoading(false);

    if (res.success && res.token && res.user) {
      await saveToken(res.token);
      setUser(res.user);
    }

    return res;
  };

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success && res.token && res.user) {
      await saveToken(res.token);
      setUser(res.user);
    }

    return res;
  };

  const logoutUser = async () => {
    await removeToken();
    setUser(null);
  };

  return { user, loading, signupUser, loginUser, logoutUser };
}

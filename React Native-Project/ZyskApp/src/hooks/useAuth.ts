import { useState, useEffect } from "react";
import { login, signup, verifyToken } from "@/src/api/auth";
import { saveToken, getToken, removeToken } from "@/src/utils/storage";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      console.log("🔍 Checking stored user...");
      try {
        const token = await getToken();
        if (token) {
          console.log("📦 Found token:", token);
          const res = await verifyToken(token);
          console.log("✅ Token verified:", res);
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            await removeToken();
          }
        }
      } catch (err) {
        console.error("❌ Failed to restore session:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signupUser = async (name: string, email: string, password: string) => {
    console.log("📝 Signing up:", email);
    setLoading(true);
    const res = await signup(name, email, password);
    console.log("✅ Signup response:", res);
    setLoading(false);

    if (res.success && res.token && res.user) {
      await saveToken(res.token);
      setUser(res.user);
    }

    return res;
  };

  const loginUser = async (email: string, password: string) => {
    console.log("🔑 Logging in:", email);
    setLoading(true);
    const res = await login(email, password);
    console.log("✅ Login response:", res);
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

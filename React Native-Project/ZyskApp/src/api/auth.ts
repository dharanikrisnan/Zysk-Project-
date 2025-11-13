const API_URL = "http://192.168.1.8:4000";
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<ApiResponse> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const existing = await fetch(`${API_URL}/users?email=${email}`, {
      signal: controller.signal,
    });
    const existingUsers: User[] = await existing.json();
    clearTimeout(timeout);

    if (existingUsers.length > 0) {
      return { success: false, message: "Email already registered" };
    }

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error("Signup failed");

    const newUser: User = await response.json();
    const payload = { id: newUser.id, time: Date.now() };
    const token = btoa(JSON.stringify(payload));

    return { success: true, token, user: newUser };
  } catch (err) {
    console.error("Signup error:", err);
    return { success: false, message: "Network error — please try again" };
  }
}

export async function login(
  email: string,
  password: string
): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
    const data: User[] = await res.json();

    if (data.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = data[0];
    const payload = { id: user.id, time: Date.now() };
    const token = btoa(JSON.stringify(payload));

    return { success: true, token, user };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Network error" };
  }
}

export async function verifyToken(token: string): Promise<ApiResponse> {
  try {
    const decoded = JSON.parse(atob(token));
    const userId = decoded.id;

    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (now - decoded.time > sevenDays) {
      return { success: false, message: "Token expired" };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${API_URL}/users/${userId}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error("User not found");
    const user: User = await res.json();

    if (!user || !user.id) {
      return { success: false, message: "Invalid or expired token" };
    }

    return { success: true, user };
  } catch (err) {
    console.error("Token verification failed:", err);
    return { success: false, message: "Token invalid or network error" };
  }
}

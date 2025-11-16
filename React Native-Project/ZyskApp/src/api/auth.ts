import axios from "axios";

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
    const { data: existingUsers } = await axios.get(`${API_URL}/users`, {
      params: { email }
    });

    if (existingUsers.length > 0) {
      return { success: false, message: "Email already registered" };
    }

    const { data: newUser } = await axios.post(`${API_URL}/users`, {
      name,
      email,
      password,
    });

    const payload = { id: newUser.id, time: Date.now() };
    const token = btoa(JSON.stringify(payload));

    return { success: true, token, user: newUser };
  } catch (err) {
    console.error(" Signup error:", err);
    return { success: false, message: "Network error — try again" };
  }
}



export async function login(
  email: string,
  password: string
): Promise<ApiResponse> {
  try {
    const { data: users } = await axios.get(`${API_URL}/users`, {
      params: { email, password },
    });

    if (users.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = users[0];

    const payload = { id: user.id, time: Date.now() };
    const token = btoa(JSON.stringify(payload));

    return { success: true, token, user };
  } catch (err) {
    console.error(" Login error:", err);
    return { success: false, message: "Network error" };
  }
}



export async function verifyToken(token: string): Promise<ApiResponse> {
  try {
    const decoded = JSON.parse(atob(token));
    const userId = decoded.id;

    const now = Date.now();
    const expireTime = 7 * 24 * 60 * 60 * 1000;

    if (now - decoded.time > expireTime) {
      return { success: false, message: "Token expired" };
    }

    const { data: user } = await axios.get(`${API_URL}/users/${userId}`);

    if (!user || !user.id) {
      return { success: false, message: "Invalid token" };
    }

    return { success: true, user };
  } catch (err) {
    console.error(" Token verification error:", err);
    return { success: false, message: "Invalid token or server error" };
  }
}

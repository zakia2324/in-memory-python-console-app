import { useState, useEffect } from "react";

type AuthState = {
  token: string | null;
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
};

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userStr = localStorage.getItem(AUTH_USER_KEY);
      return {
        token,
        user: userStr ? JSON.parse(userStr) : null,
        isAuthenticated: !!token,
      };
    }
    return { token: null, user: null, isAuthenticated: false };
  });

  const login = (token: string, user: { id: string; email: string }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }
    setAuth({ token, user, isAuthenticated: true });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
    setAuth({ token: null, user: null, isAuthenticated: false });
  };

  return { auth, login, logout };
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

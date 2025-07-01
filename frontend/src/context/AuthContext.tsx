import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface UserData {
  compartilharGenero: boolean;
  receberEmails: boolean;
  nome?: string;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const fetchProfile = async () => {
    const res = await fetch("http://localhost:5000/profile", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser({
        nome: data.nome,
        email: data.email,
        is_admin: Boolean(data.is_admin),
        receberEmails: Boolean(data.receberEmails),
        compartilharGenero: Boolean(data.compartilharGenero),
      });
    } else {
      setUser(null);
    }
  };  

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await fetchProfile();
      return true;
    }

    return false;
  };

  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

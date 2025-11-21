import { createContext, useMemo, useState, type ReactNode } from "react";

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  setAuthData: (payload: { user: AuthUser; accessToken: string }) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setAuthData = (payload: { user: AuthUser; accessToken: string }) => {
    setUser(payload.user);
    setAccessToken(payload.accessToken);
  };

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      setAuthData,
      clearAuth,
    }),
    [user, accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

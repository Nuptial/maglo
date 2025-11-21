import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { refreshToken } from "@/features/auth/api/refresh-token";
import { getProfile } from "@/features/auth/api/profile";
import type { User } from "@/features/auth/types";
import { configureHttpClient } from "@/lib/http-client";

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  isRefreshing: boolean;
  setAuthData: (payload: { user: User; accessToken: string }) => void;
  setAccessToken: (token: string | null) => void;
  refreshSession: () => Promise<string | null>;
  fetchProfile: (tokenOverride?: string | null) => Promise<User | null>;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshPromiseRef = useRef<Promise<string | null> | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  const hasInitializedRef = useRef(false);

  const clearAuth = useCallback(() => {
    setUser(null);
    setAccessTokenState(null);
    accessTokenRef.current = null;
  }, []);

  const handleSetAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    accessTokenRef.current = token;
  }, []);

  const setAuthData = useCallback(
    (payload: { user: User; accessToken: string }) => {
      setUser(payload.user);
      handleSetAccessToken(payload.accessToken);
    },
    [handleSetAccessToken]
  );

  const fetchProfile = useCallback(
    async (tokenOverride?: string | null) => {
      const activeToken = tokenOverride ?? accessToken;
      if (!activeToken) {
        return null;
      }
      try {
        const response = await getProfile(activeToken);
        setUser(response.data);
        return response.data;
      } catch {
        return null;
      }
    },
    [accessToken]
  );

  const refreshSession = useCallback(async () => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    const refreshPromise = (async () => {
      setIsRefreshing(true);
      try {
        const data = await refreshToken();
        if (!data || !data.accessToken) {
          clearAuth();
          return null;
        }

        const nextToken = data.accessToken;
        handleSetAccessToken(nextToken);
        await fetchProfile(nextToken);
        return nextToken;
      } catch {
        clearAuth();
        return null;
      } finally {
        setIsRefreshing(false);
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = refreshPromise;
    return refreshPromise;
  }, [clearAuth, handleSetAccessToken, fetchProfile]);

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    configureHttpClient({
      getAccessToken: () => accessTokenRef.current,
      refreshSession,
      clearAuth,
    });
  }, [refreshSession, clearAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isRefreshing,
      setAuthData,
      setAccessToken: handleSetAccessToken,
      refreshSession,
      fetchProfile,
      clearAuth,
    }),
    [
      user,
      accessToken,
      isRefreshing,
      setAuthData,
      handleSetAccessToken,
      refreshSession,
      fetchProfile,
      clearAuth,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

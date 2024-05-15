import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoading?: boolean;
}

const TOKEN_KEY = 'jwt';
export const API_URL = 'http://10.0.2.2:5050/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  const { authState, onLogin, onLogout, isLoading } = useContext(AuthContext);
  return { authState, onLogin, onLogout, isLoading };
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      console.log(`${API_URL}/users/login`, {
        username,
        password,
      });

      const result = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      setIsLoading(false);

      return result;
    } catch (e) {
      setIsLoading(false);
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false,
    });
    setIsLoading(false);
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';


interface AuthContextType {
  account: string | null;
  login: (account: string) => void;
  logout: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
};


const AuthContext = createContext<AuthContextType|null>(null);


export function AuthProvider(props: AuthProviderProps) {
  const [account, setAccount] = useState<string | null>(null);

  const login = (username: string) => {
    setAccount(username)
  };

  const logout = () => {
    setAccount(null);
  };

  return (
    <AuthContext.Provider
      value={{ account, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};



export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
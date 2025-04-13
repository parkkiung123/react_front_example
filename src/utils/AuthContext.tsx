import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (json: SessJson) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

interface SessJson {
    id: string;
    role: string;
}

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const raw = sessionStorage.getItem('isLoggedIn');
    let isValid = false;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // 예: id와 role이 있는지 확인
        if (parsed.id && parsed.role) {
          isValid = true;
        }
      } catch (e) {
        // JSON 파싱 실패
        isValid = false;
      }
    }
    return isValid;
  });

  const login = (json: SessJson) => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(json));
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import AuthService from '@/services/auth.service';
import { TOKEN_KEY } from '@/utils/constants';
import Router from 'next/router';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    await AuthService.logout();
    setToken(null);
    await Router.push('/');
  };

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
  }, []);

  useEffect(async () => {
    if (!token) {
      setIsLoggedIn(false);
      localStorage.removeItem(TOKEN_KEY);
      return;
    }

    try {
      await AuthService.validate(token);
    } catch {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    localStorage.setItem(TOKEN_KEY, token);
  }, [token]);

  return { token, setToken, isLoggedIn, logout };
};

export default useAuth;

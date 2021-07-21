import { TOKEN_KEY } from '@/utils/constants';
import axios from 'axios';
import Router from 'next/router';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    await axios({ method: 'POST', url: '/logout' }, { admin: true });
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    await Router.push('/');
  };

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
  }, []);

  useEffect(() => {
    setIsLoggedIn(token != null);

    if (token != null) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }, [token]);

  return { token, setToken, isLoggedIn, logout };
};

export default useAuth;

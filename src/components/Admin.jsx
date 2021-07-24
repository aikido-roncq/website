import AuthContext from '@/contexts/auth';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const Admin = ({ children }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      const origin = encodeURI(router.asPath);
      router.push(`/login?next=${origin}`);
    }
  }, []);

  return auth.isLoggedIn ? children : null;
};

export default Admin;

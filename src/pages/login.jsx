import { Button, FormControl, FormLabel, Input, useBoolean } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/styles/Login.module.scss';
import { useRouter } from 'next/router';
import Head from '@/components/layouts/Head';
import AuthContext from '@/contexts/auth';
import Link from '@/components/Link';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import AuthService from '@/services/auth.service';
import Error from '@/components/Error';

const Login = () => {
  const [loading, setLoading] = useBoolean(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const auth = useContext(AuthContext);
  const router = useRouter();

  const onLogin = data => {
    const { username, password } = data;
    setLoading.on();
    setError(null);

    AuthService.login(username, password)
      .then(auth.setToken)
      .catch(e => {
        if (e.response?.status === 401) {
          setError(`Nom d'utilisateur ou mot de passe incorrect`);
        } else {
          setError('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      })
      .finally(setLoading.off);
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push(router.query.next || '/dashboard');
    }
  }, [auth]);

  if (auth.isLoggedIn) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head title="Connexion" description="Page de connexion" />

      <h1>🔒 Connexion</h1>

      {error && <Error mb={4}>{error}</Error>}

      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <FormControl>
          <FormLabel>Nom d'utilisateur</FormLabel>
          <Input name="username" label="Nom d'utilisateur" required ref={register} />
        </FormControl>
        <FormControl>
          <FormLabel>Mot de passe</FormLabel>
          <Input name="password" type="password" label="Mot de passe" required ref={register} />
        </FormControl>
        <Button type="submit" isLoading={loading} colorScheme="red">
          Connexion
        </Button>
      </form>

      <Link href="/" className={styles.home}>
        <Button variant="ghost">
          <ChevronLeftIcon /> Page d'accueil
        </Button>
      </Link>
    </div>
  );
};

export default Login;

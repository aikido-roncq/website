import Button from '@/components/inputs/Button'
import Input from '@/components/inputs/Input'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '@/styles/Login.module.scss'
import axios from 'axios'
import { MdLock } from 'react-icons/md'
import { useRouter } from 'next/router'
import Head from '@/components/layouts/Head'
import AuthContext from '@/contexts/auth-context'
import Alert from '@material-ui/lab/Alert'
import Link from '@/components/Link'
import { ChevronLeftIcon } from '@chakra-ui/icons'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { register, handleSubmit } = useForm()
  const auth = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = (data) => {
    const { login, password } = data
    const encodedCredentials = btoa(`${login}:${password}`)
    setLoading(true)
    setError(null)

    axios({
      url: '/login',
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    })
      .then((res) => auth.setToken(res.data.token))
      .catch((e) => {
        if (e.response?.status === 401) {
          setError("Nom d'utilisateur ou mot de passe incorrect")
        } else {
          setError('Une erreur est survenue. Veuillez réessayer plus tard.')
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push(router.query.next || '/dashboard')
    }
  }, [auth])

  if (auth.isLoggedIn) {
    return null
  }

  return (
    <div className={styles.container}>
      <Head title="Connexion" description="Page de connexion" />

      <h1>🔒 Connexion</h1>

      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input name="login" label="Nom d'utilisateur" required ref={register()} />
        <Input
          name="password"
          type="password"
          label="Mot de passe"
          required
          ref={register()}
        />
        <Button loading={loading} icon={<MdLock />}>
          Connexion
        </Button>
      </form>

      <Link href="/" className={styles.home}>
        <ChevronLeftIcon /> Page d'accueil
      </Link>
    </div>
  )
}

export default Login

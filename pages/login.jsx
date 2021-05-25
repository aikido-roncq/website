import Button from '@/components/inputs/Button'
import Input from '@/components/inputs/Input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '@/styles/Login.module.scss'
import axios from 'axios'
import { MdLock } from 'react-icons/md'
import Router from 'next/router'
import useToken from '@/hooks/useToken'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { token, saveToken } = useToken()
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const { login, password } = data
    const encodedCredentials = btoa(`${login}:${password}`)
    setLoading(true)

    axios({
      url: '/login',
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    })
      .then((res) => saveToken(res.data.token))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (token) {
      Router.push('/dashboard')
    }
  }, [token])

  if (token) {
    return null
  }

  return (
    <div className={styles.container}>
      <h1>🔒 Connexion</h1>

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
    </div>
  )
}

export default Login

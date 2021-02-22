import { FaCheckCircle } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import styles from '../styles/components/ContactForm.module.scss'
import { useState } from 'react'
import Input from './inputs/Input'
import Button from './inputs/Button'
import TextArea from './inputs/TextArea'
import Swal from 'sweetalert2'
import axios from 'axios'

const API_URL = process.env.API_URL

const ContactForm = () => {

  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const handleSuccess = () => {
    reset()
    Swal.fire({
      title: 'Message envoyé !',
      text: 'Nous avons bien reçu votre message.',
      icon: 'success',
      confirmButtonColor: 'green'
    })
  }

  const handleError = (e) => {
    const text = Object.values(e.response.data)
      .map(e => e[0] + '.').join(' ')

    Swal.fire({
      title: 'Une erreur est survenue',
      icon: 'error',
      confirmButtonColor: 'red',
      text,
    })
  }

  const onSubmit = (data) => {
    setLoading(true)
    axios.post(`${API_URL}/contact`, data)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

      <Input name="name" label="Prénom" placeholder="John" required
        ref={register({ required: true, maxLength: 50 })} />

      <Input name="email" label="Adresse mail" type="email" spellCheck="false"
        placeholder="john.doe@gmail.com" hint="Nécessaire pour vous recontacter"
        ref={register({ required: true, maxLength: 60 })} required />

      <TextArea name="content" label="Message" minLength={20} maxLength={500}
        hint="20 à 500 caractères" required
        ref={register({ required: true, minLength: 20, maxLength: 500 })} />

      <Button disabled={loading}>
        <FaCheckCircle /> Envoyer
      </Button>
    </form>
  )
}

export default ContactForm
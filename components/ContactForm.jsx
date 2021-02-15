import { FaCheckCircle } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import styles from '../styles/components/ContactForm.module.scss'
import { useState } from 'react'

const API_URL = process.env.API_URL

const ContactForm = () => {

  const { register, handleSubmit, reset } = useForm()
  const [error, setError] = useState(false)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = (body) => {
    setLoading(true)
    fetch(API_URL + '/contact', {
      body: JSON.stringify(body), method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(d => d.json())
      .then(setResponse)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="name" className="required">Prénom</label>
      <input type="text" name="name" placeholder="John" id="name" required ref={register({ required: true, maxLength: 50 })} />

      <label className="required" htmlFor="email">Adresse mail</label>
      <small>Nécessaire pour vous recontacter</small>
      <input type="email" name="email" id="email" placeholder="john.doe@gmail.com" spellCheck="false" required ref={register({ required: true })} />

      <label className="required" htmlFor="content">Message</label>
      <small>20 à 500 caractères</small>
      <textarea name="content" id="content" minLength="20" maxLength="500" required ref={register({ required: true, minLength: 20 })}></textarea>
      <div className="progress">
        <div className="bar"></div>
      </div>

      <div className="g-recaptcha" data-sitekey=""></div>

      <button className="btn btn-primary" disabled={loading}>
        <FaCheckCircle /> Envoyer
      </button>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {response && <p>{response.message}</p>}
    </form>
  )
}

export default ContactForm
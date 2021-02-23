import { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import Article from '../components/Article'
import Event from '../components/Event'
import Link from '../components/Link'
import Schedules from '../components/Schedules'
import Head from 'next/head'
import axios from 'axios'

const API_URL = process.env.API_URL
const FACEBOOK = process.env.FACEBOOK
const INSTAGRAM = process.env.INSTAGRAM

export default function Home() {

  const [articles, setArticles] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(API_URL + '/articles')
      .then(res => setArticles(res.data))
      .catch(e => console.log(e))
    axios.get(API_URL + '/events')
      .then(res => setEvents(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      <Head>
        <title>Accueil | Aïkido Roncq</title>
      </Head>
      <div className="container">
        <div className="articles">
          <h1>📝 Derniers articles</h1>
          {articles.length ? (
            articles.map(a => <Article key={a.slug} {...a} />)
          ) : (
              <span>Aucun article récent.</span>
            )}
        </div>
        <div className="social-networks">
          <h1>👥 Réseaux sociaux</h1>
          <div className="network">
            <FaFacebook /> <Link href={FACEBOOK}>Facebook</Link>
          </div>
          <div className="network">
            <FaInstagram /> <Link href={INSTAGRAM}>Instagram</Link>
          </div>
        </div>
        <div className="schedules">
          <h1>🕙 Horaires</h1>
          <Schedules />
        </div>
        <div className="events">
          <h1>📅 Évènements</h1>
          {events.length ? (
            events.map(event => <Event key={event.id} {...event} />)
          ) : (
              <span>Aucun événement à venir.</span>
            )}
        </div>
      </div>
    </>
  )
}

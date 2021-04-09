import Head from 'next/head'
import Image from 'components/Image'
import { useRef } from 'react'
import styles from 'styles/Aikido.module.scss'
import Layout from 'components/layouts/Layout'

const LINKS = {
  useshiba: 'https://fr.wikipedia.org/wiki/Morihei_Ueshiba',
  akh: 'https://www.aikido.fr/',
  hirokazu: 'https://fr.wikipedia.org/wiki/Hirokazu_Kobayashi',
  cognard: 'https://fr.wikipedia.org/wiki/André_Cognard',
  kokusai: 'https://aikido-kobayashi.org',
  dnbk: 'https://fr.wikipedia.org/wiki/Dai_Nippon_Butoku_Kai',
}

const Aikido = () => {
  const dnbk = useRef(<abbr title="Dai Nippon Butoku Kai">DNBK</abbr>)

  return (
    <Layout>
      <Head>
        <title>Découvrir l'Aïkido | Aïkido Roncq</title>
        <meta name="description" content="Découvrir l'Aïkdo : Qu'est-ce que l'Aïkido?" />
      </Head>

      <h1>Qu'est-ce que l'Aïkido ? 🥋</h1>

      <p className={styles.firstParagraph}>
        L’Aïkido est un art martial japonais traditionnel non violent, fondé par Ô sensei{' '}
        <a href={LINKS.useshiba}>Ueshiba Morihei</a>. Pratiqué sans compétition, son
        enseignement se base sur des principes d’équilibre des énergies et de respect du
        partenaire. Il s’adresse aux hommes et aux femmes, sans limite d’âge ni
        préparation spéciale. ✅
      </p>

      <p>
        Notre dojo suit les enseignements de l'académie autonome d'aïkido Kobayashi
        Hirokazu (aussi appelée <a href={LINKS.akh}>3aKH</a>), créée par{' '}
        <a href={LINKS.hirokazu}> Kobayashi Hirokazu</a>.
      </p>

      <Image
        className={styles.kobayashi}
        src="/images/kobayashi.png"
        caption="Kobayashi Hirokazu, fondateur de la 3aKH."
      />

      <p>
        Le pratiquant étudie des principes de base propres aux arts martiaux :
        déplacements, esquives, saisies, distances. Il aborde progressivement le travail à
        mains nues (taijustu d’aiki), techniques d’immobilisations, de projections et
        également le travail des armes (aikijo et aikiken) dans le cadre du dojo.
      </p>

      <p>
        Ces principes sont le respect de l’individu, la tolérance et la bienveillance. 🙏🏼
      </p>

      <p>
        <a href={LINKS.akh}>3aKH</a> est une école traditionnelle qui est à l’origine de
        la création de nombreux dojos en France et de plusieurs académies à l’étranger.
        Elle forme des enseignants qui se tiennent à votre disposition pour vous présenter
        leur discipline.
      </p>

      <p>
        Elle est reconnue « association d’amitié franco-japonaise » par l’ambassade du
        Japon. Le prix du ministre des affaires étrangères du Japon a été remis à{' '}
        <a href={LINKS.cognard}>André Cognard</a> en novembre 2016. 📅
      </p>

      <p>
        3aKH fait partie de{' '}
        <a href={LINKS.kokusai}>Kokusai Aïkido Kenshukai Kobayashi Hirokazu Ha</a>, une
        école créée au niveau international en 1998 dont la vocation est de diffuser et de
        développer l’Aïkido de Kobayashi Soshu, ainsi que l’Aïkishintaiso.
      </p>

      <p>
        Depuis 2012, la <a href={LINKS.dnbk}>{dnbk.current}</a> reconnaît le Kobayashi Ryu
        Aïkido comme Budo Officiel dont André Cognard est nommé So-Shihan puis Soke en
        2015. Il reçoit également le titre Samourai de <strong>Hanshi</strong> délivré par
        son altesse royale le prince Higashi Fushimi Jigo. 🥷🏽
      </p>

      <h1>L'Aïkido et l'enfant 🧒🏻</h1>

      <p>
        <strong>L'Aïkido</strong>, art pacifique par excellence, exclut toute compétition.
        Transformant <strong>l'énergie</strong> de l'agression en énergie créative, cet
        art est aussi bien adapté pour les adultes que pour les enfants.
      </p>

      <p>
        Il respecte la nature et le rythme de chaque enfant, et procure à la fois détente
        et bien-être. Une meilleure gestion de l'énergie permet un{' '}
        <strong>équilibre</strong> physique et psychologique.
      </p>

      <Image src="/images/kids.jpg" caption="Noah et Gaëtano - Kihon de base." />
    </Layout>
  )
}

export default Aikido

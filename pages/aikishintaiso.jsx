import Image from 'components/Image'
import Layout from 'components/layouts/Layout'
import Title from 'components/Title'
import Head from 'next/head'
import styles from 'styles/Aikishintaiso.module.scss'

const Aikishintaiso = () => {
  return (
    <Layout>
      <Head>
        <title>Découvrir l'Aïkishintaïso | Aïkido Roncq</title>
        <meta
          name="description"
          content="Découvrir l'Aïkishintaïso : Qu'est-ce que l'Aïkishintaïso?"
        />
      </Head>

      <Title emoji="🈴">Qu'est-ce que l'Aïkishintaïso?</Title>

      <p className={styles.firstParagraph}>
        L'Aïkishintaïso est une <strong>pratique corporelle</strong> qui permet de
        rétablir une circulation de l'énergie forte et harmonieuse. Il développe la
        conscience des axes du corps et de son organisation générale, son équilibre.
      </p>

      <p>
        Il permet de comprendre les liens entre corps et esprit, entre soi et l'entourage,
        entre passé et présent, entre conscience et inconscience. Il stimule les{' '}
        <strong>capacités corporelles</strong>, les facultés à observer, comprendre,
        concevoir.
      </p>

      <Image src="/images/aikishintaiso.jpg" />
    </Layout>
  )
}

export default Aikishintaiso

import styles from 'styles/components/Schedules.module.scss'

const Schedules = () => {
  return (
    <>
      <p>
        Cours dispensés par :
      </p>

      <ul>
        <li><strong>Gaëtano LEUCCI</strong> — 3<sup>ème</sup> Dan</li>
        <li><strong>Benjamin MARESCAUX</strong> — 1<sup>er</sup> Dan</li>
      </ul>

      <p>Cours enfants à partir de 6 ans.</p>

      <div className={styles.wrapper}>
        <table>
          <tbody>
            <tr>
              <td rowSpan={2}>Aïkido (Adultes)</td>
              <td>Lundi: 20h15 - 21h45</td>
            </tr>
            <tr>
              <td>Jeudi: 19h30 - 21h30</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td rowSpan={2}>Aïkido (Ados)</td>
              <td>Mercredi: 17h15 - 18h30</td>
            </tr>
            <tr>
              <td>Jeudi: 19h30 - 21h30</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Aïkido (Enfants)</td>
              <td>Mercredi: 17h15 - 18h30</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Aïkishintaïso</td>
              <td>Mercredi: 20h15 - 21h45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Schedules
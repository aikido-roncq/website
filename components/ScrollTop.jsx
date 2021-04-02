import { useState, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import styles from 'styles/components/ScrollTop.module.scss'

const THRESHOLD = 300

const ScrollTop = () => {
  const [hidden, setHidden] = useState(true)

  const scrollTop = () => window.scrollTo({ top: 0 })

  const handleScroll = () => {
    if (hidden && window.pageYOffset >= THRESHOLD) setHidden(false)
    else if (!hidden && window.pageYOffset < THRESHOLD) setHidden(true)
  }

  useEffect(() => {
    if (window.visualViewport.width < 900) return

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [hidden])

  return (
    <button onClick={scrollTop} className={styles.scroll} hidden={hidden}>
      <FaChevronUp />
    </button>
  )
}

export default ScrollTop

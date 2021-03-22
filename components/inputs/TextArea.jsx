import styles from 'styles/components/inputs/TextArea.module.scss'
import React, { useState } from 'react'

const TextArea = React.forwardRef((props, ref) => {

  const {
    name,
    label,
    hint = '',
    required = false,
    maxLength = 0,
    ...otherProps
  } = props

  const [width, setWidth] = useState(0)

  const className = required ? styles.required : ''

  const handleChange = (e) => {
    const { length } = e.target.value
    const percents = (length / maxLength) * 100
    setWidth(percents)
  }

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={className}>{label}</label>
      {hint && <small>{hint}</small>}
      <textarea id={name} name={name} required={required} ref={ref}
        onChange={maxLength ? handleChange : null} {...otherProps}>
      </textarea>
      {maxLength ? (
        <div className={styles.progress}>
          <div className={styles.bar} style={{ width: `${width}%` }}></div>
        </div>
      ) : null}
    </div>
  )
})

export default TextArea
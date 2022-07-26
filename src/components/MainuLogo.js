import styles from './MainuLogo.module.css'

export default function MainuLogo({margin}) {
  const s = {}

  if (margin) {
    s.margin = margin
  }

  return (
    <h1 style={s} className={styles['mainu-logo-font']}>Mainu</h1>
  )
}

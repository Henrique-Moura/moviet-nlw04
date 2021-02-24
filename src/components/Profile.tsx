import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/Henrique-Moura.png" alt="Henrique Moura"/>
      <div>
        <strong>Henrique Moura</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}
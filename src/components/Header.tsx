import rocket from '../assets/rocket.svg'
import logo from '../assets/logo.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocket} alt="Rocket" />
      <img src={logo} alt="Todo" />
    </header>
  )
}

import Link from 'next/link'
import DarkModeButton from './DarkModeButton'
import Modal from './Modal/Modal'
import Minisearch from '../components/Minisearch/index'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Left Menu */}
      <h1 className={styles.title}>
        <Link href="/" passHref legacyBehavior>
          <a className={styles.link}>ikmnjrd.github.io</a>
        </Link>
        <DarkModeButton className={styles.darkModeButton} />
      </h1>

      {/* Right Menu */}
      <nav className={styles.nav}>
        <Modal label="Search" labelClass={styles.navLink}>
          <Minisearch />
        </Modal>
        <Link href="/about" passHref legacyBehavior>
          <a className={styles.navLink}>About</a>
        </Link>
        <Link href="/tags" passHref legacyBehavior>
          <a className={styles.navLink}>Tags</a>
        </Link>
      </nav>
    </header>
  )
}

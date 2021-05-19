import styles from '../styles/Layout.module.css'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>{children}</main>
    </div>
  )
}

export default Layout

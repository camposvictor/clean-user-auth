import styles from '../styles/Alert.module.css'

type AlertType = 'danger'

interface Props {
  type?: AlertType
}

const Alert: React.FC<Props> = ({ type = 'danger', children }) => {
  return <div className={styles[type]}>{children}</div>
}

export default Alert

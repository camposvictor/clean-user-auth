import React, { ButtonHTMLAttributes } from 'react'
import styles from '../styles/Button.module.css'

type Variant = 'contained' | 'outlined'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean
  variant?: Variant
}

const Button: React.FC<Props> = ({
  children,
  fullWidth,
  variant = 'contained',
  ...props
}) => {
  return (
    <button
      className={`${styles[variant]} ${fullWidth && styles.fullWidth}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

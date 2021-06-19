import { InputHTMLAttributes, useState } from 'react'
import styles from '../styles/Input.module.css'
import { Eye, EyeOff, Info } from 'react-feather'
import React from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorText?: string
  register?: any
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, type, errorText, id, ...props },
  ref
) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input
          type={isPasswordVisible ? 'text' : type}
          id={id}
          required
          ref={ref}
          autoComplete="off"
          {...props}
        />
        <label htmlFor={id}>{label}</label>

        {type === 'password' && (
          <div
            className={styles.toggleVisibility}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </div>
        )}
      </div>
      {errorText && (
        <div className={styles.error}>
          <Info size={20} />
          <p>{errorText}</p>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps(context) {
  const id = Math.random().toFixed(15)

  return {
    props: {
      id
    }
  }
}

export default React.forwardRef(Input)

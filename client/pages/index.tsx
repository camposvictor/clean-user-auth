import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Pages.module.css'

import Layout from '../components/Layout'
import Title from '../components/Title'
import Button from '../components/Button'
import Input from '../components/Input'
import Alert from '../components/Alert'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

interface IFormFields {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(150).required()
})

const Login: React.FC = () => {
  const router = useRouter()
  const { signIn } = useAuth()
  const [responseErrors, setResponseErrors] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IFormFields>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async () => {
    const data = getValues()

    const errors = await signIn(data)

    if (errors) {
      setResponseErrors(errors)
      return
    }

    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <Title>Login</Title>
        {responseErrors && <Alert type="danger">{responseErrors}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            errorText={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            errorText={errors.password?.message}
            {...register('password')}
          />
          <div className={styles.buttonsContainer}>
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Button
              type="button"
              onClick={() => router.push('/register')}
              variant="outlined"
            >
              Register
            </Button>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Login

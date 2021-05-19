import Head from 'next/head'
import { useState } from 'react'
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

interface IFormFields {
  email: string
  password: string
  name: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(150).required(),
  name: yup.string().min(2).max(250).required()
})

const Register: React.FC = () => {
  const router = useRouter()
  const [responseErrors, setResponseErrors] = useState('')

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

    const response = await fetch('http://localhost:3333/signup', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })

    const { error } = await response.json()

    if (!response.ok) {
      setResponseErrors(Array.isArray(error) ? error.join(', ') : error)
      return
    }

    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Layout>
        <Title>Register</Title>

        {responseErrors && <Alert type="danger">{responseErrors}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            errorText={errors.name?.message}
            {...register('name')}
          />
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
              Create account
            </Button>
            <Button
              type="button"
              onClick={() => router.push('/')}
              variant="outlined"
            >
              Login
            </Button>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Register

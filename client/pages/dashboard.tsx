import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Title from '../components/Title'
import { useAuth } from '../contexts/AuthContext'
import { LogOut } from 'react-feather'
import Button from '../components/Button'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleClick = () => {
    signOut()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <Title>Hi, {user}</Title>
        <Button onClick={handleClick}>
          <LogOut />
          Logout
        </Button>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.headers.cookie

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

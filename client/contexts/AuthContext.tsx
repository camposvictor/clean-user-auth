import { createContext, useState, useContext } from 'react'
import Cookie from 'js-cookie'
import { addDays } from 'date-fns'

type SignInResult = void | string

interface IAuthContext {
  user: string
  signIn: (data: SignInDTO) => Promise<SignInResult>
  signOut: () => void
}

interface SignInDTO {
  email: string
  password: string
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState('')

  const signIn = async ({
    email,
    password
  }: SignInDTO): Promise<SignInResult> => {
    const data = JSON.stringify({
      email,
      password
    })

    const response = await fetch('http://localhost:3333/login', {
      method: 'post',
      body: data,
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })

    const { token, name, error } = await response.json()

    if (!response.ok) {
      return error
    }

    Cookie.set('token', token, {
      expires: addDays(new Date(), 1)
    })

    setUser(name)
  }

  const signOut = () => {
    Cookie.remove('token')
    setUser('')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

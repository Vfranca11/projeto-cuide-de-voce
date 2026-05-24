import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const usuarioSalvo = localStorage.getItem('usuario')
    if (token && usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo))
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
      }
    }
    setLoading(false)
  }, [])

  const entrar = (token, usuarioData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    setUsuario(usuarioData)
  }

  const sair = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

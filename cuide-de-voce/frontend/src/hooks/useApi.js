import { useState, useCallback } from 'react'

export function useApi(apiFn) {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const executar = useCallback(async (...args) => {
    setCarregando(true)
    setErro(null)
    try {
      const res = await apiFn(...args)
      setDados(res.data.dados)
      return res.data
    } catch (e) {
      const msg = e.response?.data?.mensagem || 'Erro inesperado'
      setErro(msg)
      throw e
    } finally {
      setCarregando(false)
    }
  }, [apiFn])

  return { dados, carregando, erro, executar }
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import RotaProtegida from './components/RotaProtegida'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import Conteudos from './pages/Conteudos'
import Artigos from './pages/Artigos'
import ArtigoLeitor from './pages/ArtigoLeitor'
import Dicas from './pages/Dicas'
import Respiracao from './pages/Respiracao'
import Quiz from './pages/Quiz'
import Resultado from './pages/Resultado'
import Historico from './pages/Historico'
import Ajuda from './pages/Ajuda'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Públicas */}
            <Route path="/login"    element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Protegidas */}
            <Route path="/" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
            <Route path="/conteudos" element={<RotaProtegida><Conteudos /></RotaProtegida>} />
            <Route path="/artigos"   element={<RotaProtegida><Artigos /></RotaProtegida>} />
            <Route path="/artigo/:id" element={<RotaProtegida><ArtigoLeitor /></RotaProtegida>} />
            <Route path="/dicas"     element={<RotaProtegida><Dicas /></RotaProtegida>} />
            <Route path="/respiracao" element={<RotaProtegida><Respiracao /></RotaProtegida>} />
            <Route path="/quiz"      element={<RotaProtegida><Quiz /></RotaProtegida>} />
            <Route path="/resultado" element={<RotaProtegida><Resultado /></RotaProtegida>} />
            <Route path="/historico" element={<RotaProtegida><Historico /></RotaProtegida>} />
            <Route path="/ajuda"     element={<RotaProtegida><Ajuda /></RotaProtegida>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'
import { AuthProvider } from '../contexts/AuthContext'

// Pages that don't require authentication
const publicPages = ['/login', '/demo', '/onboarding']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPublicPage = publicPages.includes(router.pathname)

  return (
    <AuthProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoute>
      )}
    </AuthProvider>
  )
}
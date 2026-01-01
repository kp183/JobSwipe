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

  // DEMO MODE: Skip authentication for static deployment
  const isDemoMode = typeof window !== 'undefined' && process.env.NODE_ENV === 'production'

  return (
    <AuthProvider>
      {isPublicPage || isDemoMode ? (
        isDemoMode && !isPublicPage ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )
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
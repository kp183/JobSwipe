import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { AuthProvider } from '../contexts/AuthContext'

// Pages that don't require layout
const noLayoutPages = ['/login', '/demo', '/onboarding']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const needsLayout = !noLayoutPages.includes(router.pathname)

  return (
    <AuthProvider>
      {needsLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  )
}
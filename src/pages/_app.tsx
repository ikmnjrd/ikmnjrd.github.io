import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  useUserContext,
  UserContext,
} from '../hooks/useUserContext'
import '../styles/globals.css'
import '../styles/variables.css'
import '../styles/preflight.css'
import styles from './app.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  const userContext = useUserContext()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0"
        />
        <meta
          name="google-site-verification"
          content="mSJsnnYDqT7YzaY5pkqKhPHifGmwW4pCr2B97rSnleU"
        />
      </Head>
      <UserContext.Provider value={userContext}>
        <main className={styles.container}>
          <Header />
          <Component {...pageProps} />
        </main>
        {/* アニメーションを含むためcontainerの範囲から外す */}
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default MyApp

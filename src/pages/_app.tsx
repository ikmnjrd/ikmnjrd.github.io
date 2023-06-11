// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { useUserContext } from '~/hooks/useUserContext'
import '~/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { UserContext, isDarkMode, handleChangeDarkMode } =
    useUserContext()

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

      <UserContext.Provider
        value={{ isDarkMode, handleChangeDarkMode }}
      >
        <Header />
        <main className="max-w-2xl md:mx-auto mx-4 flex flex-col">
          <Component {...pageProps} />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default MyApp

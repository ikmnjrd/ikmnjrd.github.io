// import App from "next/app";
import type {
  AppProps /*, AppContext */,
} from 'next/app'
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import '~/styles/globals.css'

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0"
        />
      </Head>

      <Header />
      <main className="max-w-2xl md:mx-auto mx-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default MyApp

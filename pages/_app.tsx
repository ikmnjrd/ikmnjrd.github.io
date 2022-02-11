// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import Header from 'components/Header'
import Footer from 'components/Footer'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="text-newmo-400 dark:text-newmo-100">
      <Header />
      <main className="max-w-2xl md:mx-auto mx-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
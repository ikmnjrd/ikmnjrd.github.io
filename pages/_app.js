import Header from '@components/Header'
import Footer from '@components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className=" text-newmo-400">
      <Header />
      <main className="max-w-2xl md:mx-auto mx-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp

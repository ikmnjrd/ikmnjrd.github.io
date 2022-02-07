import Header from '@components/Header'
import Footer from '@components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className=" text-newmo-400">
      <Header />
      <main className="container">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp

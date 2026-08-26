import '../styles/globals.css'
import ScrollObserver from '../components/ScrollObserver'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ScrollObserver />
      <Component {...pageProps} />
    </>
  )
}

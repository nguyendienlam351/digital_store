import '../styles/globals.css'
import { DataProvider } from '../store/GlobalState'
import Notify from '../components/Notify'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Notify />
      <Component {...pageProps} />
    </DataProvider>)
}

export default MyApp

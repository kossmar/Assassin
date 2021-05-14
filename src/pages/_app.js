import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'

require('../mocks')

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

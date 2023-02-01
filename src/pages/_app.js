import '@/styles/globals.css'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { Inter, IBM_Plex_Sans_Thai } from '@next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const ibm = IBM_Plex_Sans_Thai({ weight: ['400', '600'], subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box as='main' className={ibm.className}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

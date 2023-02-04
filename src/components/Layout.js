import Head from 'next/head'
import Footer from './Footer'
import { Box, Flex } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>AI Art Generator</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='column' minH='100vh'>
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Flex>
    </>
  )
}

export default Layout
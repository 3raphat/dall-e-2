import Layout from '@/components/Layout'
import { Button, Flex, Icon, IconButton, Image, Input, Skeleton, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { MdQrCode } from 'react-icons/md'
import mergeImages from 'merge-images'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageForPrint, setImageForPrint] = useState(null)

  const handleGenerate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // const response = await fetch('/api/generate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ prompt: prompt }),
      // })

      // const data = await response.json()

      // setImage(data.result)
      setImage('https://picsum.photos/256') // for testing

      setPrompt('')
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const Merge = () => {
    mergeImages([{ src: image, x: 0, y: 0 }, { src: '/assets/frame.png' }], {
      format: 'image/png',
      crossOrigin: 'anonymous',
      width: 256,
      height: 256,
    }).then((b64) => {
      setImageForPrint(b64)
    })
  }

  return (
    <Layout>
      <Stack>
        <Text>Start with a detailed description</Text>
        <Stack direction='row'>
          <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button colorScheme='green' onClick={handleGenerate} isLoading={isLoading} loadingText='Generating...'>
            Generate
          </Button>
        </Stack>
        <Flex align='center' justify='center' direction='column' gap={4}>
          {image && (
            <>
              <Skeleton isLoaded={!isLoading} mt={4}>
                <Image alt={prompt} src={image} width={256} height={256} />
              </Skeleton>
              <Stack direction='row' spacing={4}>
                <Button colorScheme='yellow' onClick={Merge}>
                  Print
                </Button>
                <IconButton as={MdQrCode} />
              </Stack>
            </>
          )}
          {imageForPrint && (
            <Stack>
              <Text>Preview เฉยๆ</Text>
              <Image alt={prompt} src={imageForPrint} width={256} height={256} />
            </Stack>
          )}
        </Flex>
      </Stack>
    </Layout>
  )
}

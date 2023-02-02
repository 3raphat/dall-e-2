import Layout from "@/components/Layout";
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdQrCode } from "react-icons/md";
import mergeImages from "merge-images";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageForPrint, setImageForPrint] = useState(null);

  const Merge = (image) => {
    mergeImages([{ src: image, x: 0, y: 0 }, { src: "/assets/frame.png" }], {
      format: "image/png",
      crossOrigin: "anonymous",
      width: 256,
      height: 256,
    }).then((b64) => {
      setImageForPrint(b64);
    });
    console.log(imageForPrint);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      setImage("https://picsum.photos/256"); // for testing

      Merge(image);
      setPrompt("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  

  

  const componentRef = useRef(null);

  const router = useRouter();

  const handlePrint = () => {
    router.push({
      pathname: "/print",
      query: { image: imageForPrint },
    });
  };

  return (
    <Layout>
      <Stack>
        <Text>Start with a detailed description</Text>
        <Stack direction="row">
          <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button
            colorScheme="green"
            onClick={handleGenerate}
            isLoading={isLoading}
            loadingText="Generating..."
          >
            Generate
          </Button>
        </Stack>
        <Flex align="center" justify="center" direction="column" gap={4}>
          {image && (
            <>
              <Skeleton isLoaded={!isLoading} mt={4}>
                <Image alt={prompt} src={image} width={256} height={256} />
              {imageForPrint && (
                <Stack direction="row" spacing={4}>
                  <>
                    <Stack>
                      <Text>Preview เฉยๆ</Text>
                      <Image
                        alt={prompt}
                        src={imageForPrint}
                        width={256}
                        height={256}
                        fallbackSrc="https://via.placeholder.com/256"
                      />
                      {/* <ReactToPrint
                        trigger={() => {
                          return <Button colorScheme="yellow">Print</Button>;
                        }}
                        content={() => {
                          componentRef.current;
                        }}
                      /> */}
                      <Button colorScheme="yellow" onClick={handlePrint}>
                        Print
                      </Button>

                      <IconButton as={MdQrCode} />
                    </Stack>
                  </>
                </Stack>
              )}
              </Skeleton>
            </>
          )}
        </Flex>
      </Stack>
    </Layout>
  );
}

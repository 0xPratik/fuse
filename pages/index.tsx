import Head from 'next/head'
import Image from 'next/image'
import { Box,Heading,Flex, VStack} from "@chakra-ui/react"
import Nav from '@/components/Nav'
import MintParent from '@/components/MintParent'
import AttributeMint from '@/components/AttributeMint'

export default function Home() {
  return (
   <Flex w='100vw' flexDir={"column"} h='100vh' bg="#ffffff">
      <Nav />
      <VStack spacing="4">
      <MintParent />
      <AttributeMint />
      </VStack>
   </Flex>
  )
}

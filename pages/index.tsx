import Head from 'next/head'
import Image from 'next/image'
import { Box,Heading,Flex} from "@chakra-ui/react"
import Nav from '@/components/Nav'


export default function Home() {
  return (
   <Flex w='100vw' flexDir={"column"} h='100vh' bg="#ffffff">
      <Nav />
   </Flex>
  )
}

import React from 'react'
import {Flex,Heading,Box} from "@chakra-ui/react"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

function Nav() {
  return (
        <Flex p={4} align={"center"} justify="space-between">
            <Heading>Fuser</Heading> 
            <Box>
                <WalletMultiButton />
            </Box>
        </Flex>
  )
}

export default Nav
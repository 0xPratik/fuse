import React, { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, Button, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {mintParent} from "../solana"
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { useToast } from '@chakra-ui/react'
import {useParentMint,useReRender}  from "../store"
import axios from "axios";
import Image from "next/image";

function MintParent() {

    const wallet = useAnchorWallet() ;
    const toast = useToast()
    const val = useReRender((state) => state.rerender)
    const setMint = useParentMint((state) => state.setMint) 
    const mint = useParentMint((state) => state.parentMint)
    const [metadata,setMetadata] = useState(undefined);
    const [image,setImage] = useState<string>("");
    const [loading,setloading] = useState<boolean>(false);

    const getMetadata = async (mints: string[]) => {
      const url = `https://api.helius.xyz/v0/tokens/metadata?api-key=${process.env.NEXT_PUBLIC_HELIUS_API}`
      const { data } = await axios.post(url, { mintAccounts: mints })
      console.log("metadata: ", data[0])
      setMetadata(data[0]);
      const metadata = data[0];
      if(metadata.offChainData.image !== undefined || metadata.offChainData.image !== null ){
        console.log("SET",metadata.offChainData.image);
        setImage(metadata.offChainData.image)
      }
    }


    useEffect(() => { 
      if (mint !== undefined){
        
        const nftAddresses = [
          mint.toString()
        ]

        getMetadata(nftAddresses);

        
      }
    },[wallet,val])


const onClickMintParent = async() => {
    try {
      setloading(true);
        console.log("Mint Parent");

        const data = await mintParent(wallet as NodeWallet);
        setMint(data.mint);
        const link = `https://explorer.solana.com/tx/${data.sig}`
        toast({
          position: 'bottom-left',
          isClosable: true,
          render: () => (
            <LinkBox>
               <Box bg="green.300" w='250px' p={4} borderRadius={"md"}>
              <Text color='white' fontWeight={"bold"}>Congrat&apos;s on Minting a Composable NFT</Text>
                 <LinkOverlay href={link} >
                 Click to check the tx
                 </LinkOverlay> 
            </Box>
            </LinkBox>
          ),
        })
        setloading(false);
    } catch (error) {
        console.log("Something Went Wrong",error);
        toast({
          title: `Something Went Wrong`,
          status: "error",
          isClosable: true,
        })
        setloading(false);
    }
}

  return (
    <Flex
      p={5}
      direction="row"
      align={"center"}
      borderRadius="base"
      boxShadow={"md"}
    >
      <Flex align={"center"} justify="center" w='50%' bg='blackAlpha.100'>
        <Image src={image} blurDataURL="/load.png" width={300} height={350} alt="Dummy Image" />
      </Flex>
      <Box w='50%' p={3}>
        <Text pb={4} textAlign={"left"} w='300px' fontWeight="bold">
          This is a NFT that will get minted on Mainnet and is going to be
          completely Empty unless and untill you transfer a Attribute NFT in it.
        </Text>
        <Button isLoading={loading} w="300px" onClick={onClickMintParent} colorScheme="cyan" >Mint</Button>
      </Box>
    </Flex>
  );
}

export default MintParent;

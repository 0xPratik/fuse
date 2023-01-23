import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Image,
  Button,
  VStack,
  useToast,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import {
  background,
  clothes,
  eyes,
  face,
  hair,
  mouth,
  Weapons,
} from "../attribute/index";
import { transferIn } from "../solana/index";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import * as anchor from "@coral-xyz/anchor";
import {useParentMint, useReRender} from "../store"


function AttributeMint() {

    const wallet = useAnchorWallet();
    const toast = useToast()
    const [loading,setLoading] = useState<boolean>(false);
    const parentMint = useParentMint((state) => state.parentMint);
    const re = useReRender((state) => state.setRender);


    const onClickTransferIn = async(uri:string) => {
        try {
            setLoading(true);
            console.log("OnClick transfer In");

            if(parentMint == undefined){
                console.log("Parent Mint is undefined")
                toast({
                    title: `You havent brought the Parent NFT Yet`,
                    status: "info",
                    isClosable: true,
                  })
                  setLoading(false);
                return;
            }

           const res =  await transferIn(wallet as NodeWallet,parentMint,uri);
           const link = `https://explorer.solana.com/tx/${res}`
           console.log("Transfer",res);
           re();
           toast({
            position: 'bottom-left',
            isClosable: true,
            render: () => (
              <LinkBox>
                 <Box bg="green.500" w='200px' p={4} borderRadius={"md"}>
                <Text color='white' fontWeight={"bold"}>Congrat&apos;s on Minting a Composable NFT</Text>
                   <LinkOverlay href={link} target="_blank" >
                   Click to check the tx
                   </LinkOverlay> 
              </Box>
              </LinkBox>
            ),
            
          })
          setLoading(false);
        } catch (error) {
            console.log("Something Went Wrong in Transfer",error);
            toast({
                title: `Something Went Wrong`,
                status: "error",
                isClosable: true,
              })
          setLoading(false);

        }
    }

  return (
    <Flex
      p={4}
      flexDir="column"
      align="center"
      borderRadius="base"
      w="70vw"
    >
      <VStack spacing={4}>
        <Box>
          <Heading>Backgrounds</Heading>
          <HStack py={3}>
            {background.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                    <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <Heading>Clothes</Heading>
          <HStack py={3}>
            {clothes.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                     <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <Heading>Eyes</Heading>
          <HStack py={3}>
            {eyes.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                     <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <Heading>face</Heading>
          <HStack py={3}>
            {face.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                     <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <Heading>Mouth</Heading>
          <HStack py={3}>
            {mouth.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                     <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <Heading>Hair</Heading>
          <HStack py={3}>
            {hair.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                     <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        <Box>
          <Heading>Weapons Tool</Heading>
          <HStack py={3}>
            {Weapons.map((item) => {
              return (
                <VStack
                  boxShadow={"lg"}
                  p={2}
                  borderRadius="base"
                  border="1px"
                  borderColor={"purple.500"}
                  align="center"
                  key={item.name}
                >
                     <Text fontWeight={"bold"}>{item.name}</Text>
                  <Image
                    objectFit={"contain"}
                    boxSize="150px"
                    src={item.image}
                    alt={item.name}
                  />
                  <Button w="full" isLoading={loading} onClick={() => onClickTransferIn(item.uri)} colorScheme="purple">
                    Mint
                  </Button>
                </VStack>
              );
            })}
          </HStack>
        </Box>
        
      </VStack>
    </Flex>
  );
}

export default AttributeMint;

import { Box, Button, ButtonGroup, ChakraProvider, Divider, Heading, Hide, Image, Spinner, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic.js'

import theme from '../../styles/theme.js'

import React from 'react'

export default function FeatureHome(props) {

  return (
    <ChakraProvider theme={theme}>
      
        <Box
            display={'flex'}
            bgColor={'rgba(0,0,0,0.3)'}
            flexDirection={'column'}
            w={'20%'}
            textAlign={'center'}
            borderRadius={'lg'}
            p={'2rem'}
            transition={'all 0.2s ease-in-out'}
            _hover={{
                transform: 'scale(1.05)',
            }}
            mr={'1rem'}
            ml={'1rem'}
        >  
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                textAlign={'center'}
                w={'100%'}
                h={'100%'}
                flexDir={'row'}
            >

                {props.icon}    
                <Heading
                    ml={'0.5rem'}
                >
                    {props.title}
                </Heading> 
  
            </Box>
            <Divider mt={'3'} mb={'3'} />
            <Text
                color={'brand.gray.50'}
            >
                {props.description}
            </Text>
        </Box>       

    </ChakraProvider>
  )
}

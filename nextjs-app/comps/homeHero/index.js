import { Box, Button, ButtonGroup, ChakraProvider, Heading, Hide, Image, Spinner, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic.js'

import theme from '../../styles/theme.js'

import React from 'react'

export default function Hero(props) {

    const [bgPos, setBgPos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {

        const handleMouseMove = (e) => {
            setBgPos({
                x: e.clientX / window.innerWidth * 5,
                y: e.clientY / window.innerHeight * 5,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
       
    }, []);



  return (
    <ChakraProvider theme={theme}>
      
        <Box
            display={'flex'}
            w={'100vw'}
            h={'100vh'}
            bgImage={'url(images/confetti-doodles.png)'}
            bgPos={'static'}
            bgBlendMode={'overlay'}
            bgColor={'rgba(0,0,0,0.3)'}
            bgSize={'40%'}
            // zoom in on bg image
            bgAttachment={'fixed'}
            flexDirection={'column'}
            bgPosition={`${bgPos.x}% ${bgPos.y}%`}
        >  

            <Box
                display={'flex'}
                flexDirection={'row'}
            >

                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    textAlign={['center', 'center', 'center', 'left']}
                    w={['100vw', '100vw', '100vw', '50vw']}
                    h={'75vh'}
                    pl={['1', '1', '10vw', '10vw']}
                    mt={['2rem', '5rem', '10vh', '15vh']}
                    pt={['10rem', '8rem', '0', '0']}
                    flexDirection={'column'}
                >

                    <Heading as={'h1'} fontSize={['5xl','7xl','7xl','7xl']} pr={['5','5','5','0']} pl={['5','5','5','0']} >
                        Come get your <Heading as={'span'} fontSize={['5xl','7xl','7xl','7xl']} color={'brand.teal.500'}>last</Heading> gamer tag.
                    </Heading>

                    <Text fontSize={'xl'} pr={['10','10','10','0']} pl={['10','10','10','0']} w={['100vw', '100vw', '100vw', '40vw']}  mt={'8'} fontWeight={'medium'} color={'brand.gray.100'}>
                        It's just a click away.
                    </Text>

                    <ButtonGroup flexDir={['column', 'column', 'column', 'row']} w={['100vw', '100vw', '40vw', '40vw']} justifyContent={['center','center','left','left']} mt={'8'} spacing={'4'}>
                        <a href='/signup'>
                            <Button colorScheme={'brand.teal'} ml={['1rem', '1rem','0','0']} mb={'1rem'} variant={'solid'} size={'lg'} fontSize={'3xl'} fontWeight={'bold'} p={'2rem 4rem'}>Get Started</Button>
                        </a>
                        <a href='/#about'>
                            <Button colorScheme={'brand.teal'} variant={'outline'} size={'lg'} fontSize={'3xl'} fontWeight={'bold'} p={'2rem 4rem'}>Learn More</Button>
                        </a>
                    </ButtonGroup>

                </Box>      

                

                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    w={['100vw', '100vw', '50vw', '50vw']}
                    mt={'10rem'}
                    pr={['1', '1', '10vw', '10vw']}
                    ml={'5rem'}
                    flexDirection={'column'}
                    borderRadius={'8px'}
                >

                </Box>

            </Box>
            
            <Image src={'images/Wave.png'} w={'100vw'} h={['25%', '25%', '25%', '10%']} />

        </Box>       

    </ChakraProvider>
  )
}

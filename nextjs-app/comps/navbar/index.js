import { Box, Button, ChakraProvider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading, Hide, Image, Link, Show, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi';
import { signIn, signOut, useSession } from "next-auth/react";

import theme from '../../styles/theme.js'
import { FaDiscord } from 'react-icons/fa';

export default function NavBar(props) {

    const activePage = props.active

    const [cmdsActive, setCmdsActive] = useState(false)
    const [supportActive, setSupportActive] = useState(false)
    const [donateActive, setDonateActive] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [size, setSize] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: session } = useSession()

    const handleClick = () => {
        onOpen()
    }

    useEffect(() => {
        if (activePage === 'commands') {
            setCmdsActive(true)
        } else if (activePage === 'donate') {
            setDonateActive(true)
        }

        if (session) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [session])

    
  return (
    <Box theme={theme}>
      
        <Box
            display={'flex'}
            w={'90vw'}
            p={'0.7rem'}
            position={'fixed'}
            top={'0'}
            left={'5vw'}
            height={'fit-content'}
            backgroundColor={'rgba(180, 180, 180, 0.2)'}
            backdropFilter={'blur(20px)'}
            boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
            borderRadius={'8px'}
            margin={'1rem auto'}
            zIndex={'100'}
        >
            <Box
                display={'flex'}
                flexDir={'row'}
                // alignItems={'center'}
                // justifyContent={'center'}
                w={'fit-content'}
            >           
                <Box
                    display={'flex'}
                    // alignItems={'center'}
                    // justifyContent={'center'}
                    h={'fit-content'}
                    left={'0'}
                    ml={['','5','5','2']}
                    mt={'0.2rem'}
                >
                    <Image src={'/images/logo.png'} alt={'LasTag Logo'} w={'2.5rem'} h={'2.5rem'} p={0} />

                    <Hide breakpoint='(max-width: 340px)'>
                        <Text
                            fontSize={'1.5rem'}
                            fontWeight={'bold'}
                            ml={'0.5rem'}
                            _hover={{
                                opacity: '0.4',
                            }}
                        >
                            LasTag
                        </Text>
                        
                    </Hide>
                    
                </Box> 
                
            </Box>


            <Hide breakpoint='(max-width: 530px)'>
                <Box 
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    w={'fit-content'}
                    h={'fit-content'}
                    // put this on the right side
                    width={'90vw'}
                    mt={'0.2rem'}
                    
                >
                    {/* <a href='/commands' >
                        <Text
                            fontSize={'1rem'}
                            fontWeight={cmdsActive ? 'bold' : 'medium'}
                            p={'0.5rem 1rem'}
                            _hover={{
                                opacity: '0.4',
                            }}
                            color={cmdsActive ? 'brand.teal.50' : 'white'}
                            backgroundColor={cmdsActive ? 'brand.teal.900' : 'rgba(0, 0, 0, 0)'}
                            borderRadius={'8px'}
                        >
                            Commands
                        </Text>
                    </a>
                    <a href='/donate' >
                        <Text
                            fontSize={'1rem'}
                            fontWeight={donateActive ? 'bold' : 'medium'}
                            p={'0.5rem 1rem'}
                            _hover={{
                                opacity: '0.4',
                            }}
                            color={donateActive ? 'brand.teal.50' : 'white'}
                            backgroundColor={donateActive ? 'brand.teal.900' : 'rgba(0, 0, 0, 0)'}
                            borderRadius={'8px'}
                        >
                            Donate
                        </Text>
                    </a> */}
                </Box>
            </Hide>
            
            {!isLoggedIn ?
                <Hide breakpoint='(max-width: 530px)'>
                    <Button 
                        colorScheme={'brand.teal'} 
                        variant={'solid'} 
                        size={'lg'}
                        fontSize={'1rem'}
                        fontWeight={'bold'}
                        ml={'1rem'}
                        onClick={() => signIn('google')}
                    >
                        Login
                    </Button>
                </Hide>
            :
                <Hide breakpoint='(max-width: 530px)'>
                    <a href='/dashboard' >
                        <Button
                            colorScheme={'brand.teal'}
                            variant={'solid'}
                            size={'lg'}
                            fontSize={'1rem'}
                            fontWeight={'bold'}
                            ml={'1rem'}
                        >
                            Dashboard
                        </Button>
                    </a>
                </Hide>
            }

            <Show breakpoint='(max-width: 530px)'>
                <Box 
                    display={'flex'}
                    position={'absolute'}
                    right={'0'}
                    mr={'1rem'}
                >
                    <Button
                        onClick={() => handleClick(size)}
                        key={size}
                        pr={1}
                        leftIcon={<GiHamburgerMenu />} 
                    ></Button>

                    {!isLoggedIn ?
                        <Button 
                            colorScheme={'brand.teal'} 
                            variant={'solid'} 
                            size={'lg'}
                            fontSize={'1rem'}
                            fontWeight={'bold'}
                            ml={'1rem'}
                            onClick={() => signIn('discord')}
                            leftIcon={<FaDiscord style={{
                                fontSize: '1.5rem',
                                marginTop: '0.2rem',
                            }} />}
                        >
                            Login
                        </Button>
                    :
                        <a href='/dashboard/select-server' >
                            <Button
                                colorScheme={'brand.teal'}
                                variant={'solid'}
                                size={'lg'}
                                fontSize={'1rem'}
                                fontWeight={'bold'}
                                ml={'1rem'}
                            >
                                Dashboard
                            </Button>
                        </a>
                    }

                    <Drawer onClose={onClose} isOpen={isOpen} size={'xs'}>
                        <DrawerOverlay />
                        <DrawerContent 
                            borderLeftRadius={'8px'}
                            backgroundColor={'rgba(180, 180, 180, 0.2)'}
                            backdropFilter={'blur(15px)'}
                            boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
                        >   
                            <br></br>
                            <br></br>
                            <DrawerCloseButton size={'lg'} />
                            <DrawerHeader fontSize={50} fontWeight={700}>Pages</DrawerHeader>
                            <DrawerBody>
                                {/* <a href='/'>
                                    <Button colorScheme={'brand.teal'} w={'100%'} variant={'solid'} size={'lg'} fontSize={'20'} fontWeight={700}>
                                        Home
                                    </Button>
                                </a>
                                <br></br>
                                <br></br>
                                <a href='/about'>
                                    <Button colorScheme={'brand.teal'} w={'100%'} variant={'solid'} size={'lg'} fontSize={'20'} fontWeight={700}>
                                        Commands
                                    </Button>
                                </a>
                                <br></br>
                                <br></br>
                                <a href='/donate'>
                                    <Button colorScheme={'brand.teal'} w={'100%'} variant={'solid'} size={'lg'} fontWeight={700}>
                                        Donate
                                    </Button>
                                </a>
                                <br></br>
                                <br></br>
                                <a href='/dashboard/select-server'>
                                    <Button colorScheme={'brand.teal'} w={'100%'} variant={'solid'} size={'lg'} fontWeight={700}>
                                        Dashboard
                                    </Button>
                                </a>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <a href='/invite'>
                                    <Button colorScheme={'brand.teal'} w={'100%'} variant={'solid'} size={'lg'} fontWeight={700}>
                                        Invite
                                    </Button>
                                </a>
                                <br></br>
                                <br></br>
                                <a href='/support'>
                                    <Button colorScheme={'brand.teal'} w={'100%'} variant={'solid'} size={'lg'} fontWeight={700}>
                                        Discord
                                    </Button>
                                </a> */}
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box>
            </Show>
        </Box>
        
    </Box>
  )
}

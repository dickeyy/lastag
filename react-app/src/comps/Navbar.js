import React, { useState } from 'react';
import { ChakraProvider, Text, Link, Badge, theme, Button, Box, Image } from '@chakra-ui/react';
import '../css/main.css'
import { NavLink } from "react-router-dom";
import Logo from  '../images/logo.png'

function Navbar() {

    const { isLoggedIn, setIsLoggedIn } = useState(false);
    
    var accBtnText;
    if (isLoggedIn) {
        accBtnText = "Dashboard";
    } else {
        accBtnText = "Login";
    }

  return (
    <ChakraProvider theme={theme} backgroundColor={'#1A202C'}>
      <Box 
        mr={'5vw'} 
        ml={'5vw'} 
        w={'90vw'} 
        p={'1.5rem'} 
        display={"flex"} 
        flexDirection={"row"}
        mt={'1rem'}
        position={"sticky"}
        top={'0'}
        height={'11vh'}
        backgroundColor={'rgba(180, 180, 180, 0.2)'}
        backdropFilter={'blur(10px)'}
        boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
        borderRadius={'13px'}
        >
            <Box
                width={'20%'}
                justifyContent={'right'}
                right={'10px'}
                position={'absolute'}
                alignItems={'center'}
            >
                <NavLink to={'/'}>
                    <Link color={'white'}  mr={3}>
                        <a>Home</a>
                    </Link>
                </NavLink>

                <NavLink to={'/about'}>
                    <Link color={'white'} mr={3}>
                        <a>About</a>
                    </Link>
                </NavLink>

                <NavLink to={'/login'}>
                    <Button colorScheme={'teal'} size='md' fontSize={18}>
                        <a>{accBtnText}</a>
                    </Button>
                </NavLink>
            </Box>

            <Box
                width={'20%'}
                justifyContent={'left'}
                left={'10px'}
                position={'absolute'}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'row'}
            >

                <NavLink to={'/'}>
                    <Link>
                        <a>
                            <Image w={'25%'} mt={'-32px'} justifyContent={'left'} pos={'absolute'} left={'10px'} alignItems={'center'} src={Logo} alt='logo' />
                        </a>
                    </Link>
                </NavLink>
                <Text color={'white'} fontSize={30} ml={20} mr={2} fontWeight={800}>LasTag</Text>

                <Badge variant='solid' colorScheme='cyan' mt={2.5}>
                    Beta
                </Badge>
            </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Navbar;
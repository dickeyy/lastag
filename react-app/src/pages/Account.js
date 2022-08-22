import React from 'react';
import { ChakraProvider, Box, Text, theme, Heading, Button, Input, FormLabel, FormControl, InputGroup, InputLeftAddon, InputRightElement, Checkbox } from '@chakra-ui/react';
import '../css/main.css'
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { NavLink } from 'react-router-dom';

function AccountPage () {

    return (

        <ChakraProvider theme={theme}>

            <Navbar />

            <Footer />


        </ChakraProvider>

    )

}

export default AccountPage;
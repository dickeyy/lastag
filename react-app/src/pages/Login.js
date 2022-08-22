import React from 'react';
import { ChakraProvider, Box, Text, theme, Heading, Button, Input, FormLabel, FormControl, InputGroup, InputLeftAddon, InputRightElement, Checkbox } from '@chakra-ui/react';
import '../css/main.css'
import '../css/signup.css'
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { NavLink } from 'react-router-dom';

function LoginPage () {

    return (

        <ChakraProvider theme={theme}>

            <Heading mt={20} color={'teal.200'} mb={5} fontSize={60} fontWeight={800}>LOG IN</Heading>

            <div className='signup-container'>

                <FormControl isRequired={true}>

                    <FormLabel>Email Address</FormLabel>
                    <Input mb={5} type='email' isRequired={true} focusBorderColor={'teal.200'} size={"lg"} placeholder={'hello@lastag.xyz'} />

                    <FormLabel>Password</FormLabel>
                    <InputGroup size='lg'>
                        <Input type='password' placeholder='coolpassword123' mb={5} isRequired={true} focusBorderColor={'teal.200'}/>
                    </InputGroup>

                </FormControl>

                <Button colorScheme='teal' size='lg' mb={'2'} mt={'2'}>
                    Log In
                </Button>

                <br></br>

                <NavLink to={'/forgot-password'}><a className='signup-link-2'>Forgot Password</a></NavLink>

                <br></br>

                <NavLink to={'/signup'}><a className='signup-link-2'>Don't have an account?</a></NavLink>

            </div>

        </ChakraProvider>

    )

}

export default LoginPage;
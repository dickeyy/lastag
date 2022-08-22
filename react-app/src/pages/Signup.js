import React from 'react';
import { ChakraProvider, Box, Text, theme, Heading, Button, Input, FormLabel, FormControl, InputGroup, InputLeftAddon, InputRightElement, Checkbox } from '@chakra-ui/react';
import '../css/main.css'
import '../css/signup.css'
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { NavLink } from 'react-router-dom';

function SignupPage () {

    const [show, setShow] = React.useState(false)

    return (

        <ChakraProvider theme={theme}>

            <Heading mt={5} color={'teal.200'} mb={5} fontSize={60} fontWeight={800}>SIGN UP</Heading>

            <div className='signup-container'>

                <FormControl isRequired={true}>

                    <FormLabel>Email Address</FormLabel>
                    <Input mb={5} type='email' isRequired={true} focusBorderColor={'teal.200'} size={"lg"} placeholder={'hello@lastag.xyz'} />

                    <FormLabel>Username</FormLabel>
                    <InputGroup size={'lg'} >
                        <InputLeftAddon children='lastag.xyz/' />
                        <Input type='username' placeholder='lastag' mb={5} isRequired={true} focusBorderColor={'teal.200'} size={"lg"} />
                    </InputGroup>

                    <FormLabel>Password</FormLabel>
                    <InputGroup size='lg'>
                        <Input type='password' placeholder='coolpassword123' mb={5} isRequired={true} focusBorderColor={'teal.200'}/>
                    </InputGroup>

                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size='lg'>
                        <Input type='password' placeholder='coolpassword123' mb={5} isRequired={true} focusBorderColor={'teal.200'}/>
                    </InputGroup>

                    <Checkbox colorScheme='teal' size={'lg'} isRequired={true}>I agree to the <NavLink to={'/terms'}><a className='signup-link'>Terms</a></NavLink> and <NavLink to={'/privacy'}><a className='signup-link'>Privacy</a></NavLink></Checkbox>

                    <Checkbox colorScheme='teal' size={'lg'} isRequired={false} isChecked={true}>I would like to recieve news and updates</Checkbox>

                </FormControl>

                <Button colorScheme='teal' size='lg' mb={'2'} mt={'2'}>
                    Sign Up
                </Button>

                <br></br>

                <NavLink to={'/login'}><a className='signup-link-2'>Already have an account?</a></NavLink>

            </div>

        </ChakraProvider>

    )

}

export default SignupPage;
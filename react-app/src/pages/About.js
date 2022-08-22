import React from 'react';
import { ChakraProvider, Box, Text, theme, Heading, Button } from '@chakra-ui/react';
import '../css/main.css'
import waveSvg from '../images/wave.svg';
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { NavLink } from 'react-router-dom';


function AboutPage() {
    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl" backgroundColor={'gray.800'}>

                <Navbar />

                <div className='abt-main-container'>

                    <Heading color={'teal.200'}
                        m={20}
                        fontSize={80}
                        fontWeight={800}
                        mb={3}
                    >
                        WHAT IS LASTAG?
                    </Heading>
                    

                    <Text
                        fontSize={30}
                        fontWeight={600}
                    >
                    Remembering all your gamer tags is hard. Sometimes your default 'EpicXGam3R' name is taken by someone esle, which requires you to think of something new and remember it. When your friends want to play something with you, you have to try and remember what your name is, that sucks. Or for things like Discord, you have to remember your numbers at the end... NUMBERS?! Well say hello to LasTag (Last Tag). With LasTag you can organize all your gamertags into one spot and then you can just give people your link, and game on.
                    </Text>

                </div>

                <img src={waveSvg} alt="wave"></img>

                <div className='abt-second-container'>
                    <Text
                        fontSize={50}
                        fontWeight={700}
                    >
                        Ready to get started?
                    </Text>

                    <NavLink to={'/signup'}>
                        <Button colorScheme={'teal'} size='lg' mt={10}>
                            <a>YES!</a>
                        </Button>
                    </NavLink>
                </div>

                <Footer />

            </Box>
        </ChakraProvider>
    )
}

export default AboutPage;
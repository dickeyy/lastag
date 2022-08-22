import React from 'react';
import { ChakraProvider, Box, Text, theme, Button, Heading  } from '@chakra-ui/react';
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import waveSvg from '../images/wave.svg';
import waveSvg2 from '../images/wave-2.svg';
import freePng from '../images/free.png';
import customizePng from '../images/customization.png';
import unlimitedPng from '../images/unlimited.png';
import { NavLink } from 'react-router-dom';

function HomePage() {

  return (
    <ChakraProvider theme={theme} backgroundColor={'gray.800'}>
      <Box textAlign="center" fontSize="xl" backgroundColor={'gray.800'}>

        <Navbar />

        <div className='main-container'>

          <Heading 
          color={'teal.200'}
          m={20}
          fontSize={80}
          fontWeight={800}
          mb={3}
          >
            Your last gamer tag  
          </Heading>

          <Text
          color={'teal.400'}
          fontSize={40}
          fontWeight={600}
          mb={5}
          >
            It's just a click away...
          </Text>

          <Text
          color={'whiteAlpha.800'}
          fontSize={30}
          fontWeight={400}
          >
            With LasTag you will never have to remember gamer tags like 'xEp1cXGam3rx' again.
          </Text>

          <br></br>

          <div className='btn-row'>

          <NavLink to={'/signup'}>
            <Button colorScheme={'teal'} size='lg' fontSize={25} p={7}>
              <a>Get Started</a>
            </Button>
          </NavLink>

          <NavLink to={'/about'}>
            <Button colorScheme='teal' variant='outline' fontSize={25} p={7} size={'lg'} ml={5}>
              <a>Learn More</a>
            </Button>
          </NavLink>

          </div>

        </div>

        <img src={waveSvg} alt="Waves" />

        <div className='second-container'>

          <div className='features'>

            <div className='feature-card'>

              <img className='feature-img' src={freePng} alt="Free" />

              <Text
                color={'teal.500'}
                fontSize={50}
                fontWeight={700}
              >
                Free Forever
              </Text>

              <Text>
                You can get a vast majority of LasTag's features for free, a credit card is not required to sign up.
              </Text>

            </div>

            <div className='feature-card'>

              <img className='feature-img' src={customizePng} alt="Customize" />

              <Text
                color={'teal.500'}
                fontSize={50}
                fontWeight={700}
              >
                Customization
              </Text>

              <Text>
                Even with the free tier, you get some pretty sick page customization to make it as unique as your gamer tags.
              </Text>

            </div>

            <div className='feature-card'>

              <img className='feature-img' src={unlimitedPng} alt="Unlimited" />

              <Text
                color={'teal.500'}
                fontSize={50}
                fontWeight={700}
              >
                Unlimited Tags
              </Text>

              <Text>
                We know you have a lot of gamer tags, that's why we allow you to have an unlimited amount of tags on your page.
              </Text>

            </div>

          </div>

          <img src={waveSvg2} alt="Waves" />
        </div>

        <div className='third-container'>

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
  );
}

export default HomePage;
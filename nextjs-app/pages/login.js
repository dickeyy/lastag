import FeatureHome from '@/comps/feature'
import Hero from '@/comps/homeHero'
import NavBar from '@/comps/navbar'
import SEOHead from '@/comps/seoHead'
import theme from '@/styles/theme'
import { Box, Button, ChakraProvider, Heading, Image, Text } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    
    const { data: session } = useSession();

    React.useEffect(() => {
        if (session) {
            // redirect to dashboard
            // TODO
        }
    }, [session])

	return (
    	<ChakraProvider theme={theme}>
			<Box 
				overflowX={'hidden'}
                // center everything
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}

			>

				<SEOHead title="Login" description="Your last gamer tag" />

				<NavBar />

                <Box
                    display={'flex'}
                    w={'100vw'}
                    h={'100vh'}
                    // bgImage={'url(images/hollowed-boxes.png)'}
                    bgPos={'static'}
                    bgBlendMode={'overlay'}
                    bgColor={'rgba(0,0,0,0.6)'}
                    bgSize={'20%'}
                    flexDirection={'column'}
                    // center everything
                    alignItems={'center'}
                    justifyContent={'center'}

                >
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        w={'fit-content'}
                        backgroundColor={'rgba(180, 180, 180, 0.2)'}
                        backdropFilter={'blur(20px)'}
                        boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
                        borderRadius={'lg'}
                        p={'3rem'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Heading>
                            Login to LasTag
                        </Heading>
                        <br></br>
                        <Button colorScheme={'blue'} size={'lg'} onClick={() => signIn('google')} leftIcon={<FaGoogle />} mb={3}>
                            Login with Google
                        </Button>
                        <Button colorScheme={'brand.gray'} size={'lg'} onClick={() => signIn('github')} leftIcon={<FaGithub />} mb={3}>
                            Login with GitHub
                        </Button>
                    </Box>

                </Box>

			</Box>

		</ChakraProvider>
  	)
}

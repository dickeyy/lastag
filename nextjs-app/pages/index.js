import FeatureHome from '@/comps/feature'
import Hero from '@/comps/homeHero'
import NavBar from '@/comps/navbar'
import SEOHead from '@/comps/seoHead'
import theme from '@/styles/theme'
import { Box, ChakraProvider, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import React from 'react'

import { MdDashboardCustomize, MdOutlineMoneyOff } from 'react-icons/md'
import { ImInfinite } from 'react-icons/im'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');

	React.useEffect(() => {
		setTimeout(() => {
			if (text === 'dark') {
				toggleColorMode
			}
		}, 1000)

		if (text === 'dark') {
			toggleColorMode
		}
	}, [text])

	return (
    	<ChakraProvider theme={theme}>
			<Box 
				overflowX={'hidden'}
			>

				<SEOHead title="Home" description="Your last gamer tag" />

				<NavBar />

				<Hero />

				<Box
					display={'flex'}
					flexDirection={'row'}
					w={'100vw'}
					bgColor={'brand.light.500'}
					p={'5rem'}
					alignItems={'center'}
					justifyContent={'center'}
				>

					<FeatureHome 
						title={'Free Forever'}
						icon={<MdOutlineMoneyOff style={{
							fontSize: '3rem',
							color: '#66fcf1',
						}} /> }
						description={"You can get a vast majority of LasTag's features for free, a credit card is not required to sign up."}
					/>

					<FeatureHome 
						title={'Customization'}
						icon={<MdDashboardCustomize style={{
							fontSize: '3rem',
							color: '#66fcf1',
						}} /> }
						description={"Even with the free tier, you get some pretty sick page customization to make it as unique as your gamer tags."}
					/>

					<FeatureHome 
						title={'Unlimited'}
						icon={<ImInfinite style={{
							fontSize: '3rem',
							color: '#66fcf1',
						}} /> }
						description={"We know you have a lot of gamer tags, that's why we allow you to have an unlimited amount of tags on your page."}
					/>

					

				</Box>

			</Box>

		</ChakraProvider>
  	)
}

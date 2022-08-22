import { ChakraProvider, Text, Link, theme  } from '@chakra-ui/react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import { NavLink } from 'react-router-dom';

function Footer() {

  return (
    <ChakraProvider theme={theme}>
        <div className='footer'>
            <div className='footer-left'>
                <Text color={'whiteAlpha.500'}>&copy; 2022 LasTag Ltd.</Text>
            </div>

            <div className='footer-center'>
                <Text color={'whiteAlpha.500'}>

                    <NavLink to={'/terms'}>
                        <Link mr={5}>
                            <a>Terms</a>
                        </Link>
                    </NavLink>

                    
                    <NavLink to={'/privacy'}>
                        <Link>
                            <a>Privacy</a>
                        </Link>
                    </NavLink>

                </Text>
            </div>

            <div className='footer-right'>
                <a href='mailto: hello@lastag.xyz' className="fa fa-solid fa-envelope fa-2x socialIcon-foot"> </a>

                <a href='https://twitter.com/yourlastag' target="_blank" rel="noreferrer" className="fa fa-brands fa-twitter fa-2x socialIcon-foot"> </a>

                <a href='https://instagram.com/yourlastag' target="_blank" rel="noreferrer" className="fa fa-brands fa-instagram fa-2x socialIcon-foot"> </a>
            </div>
        </div>
    </ChakraProvider>
  );
}

export default Footer;
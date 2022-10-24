import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter,FaWhatsapp, FaTwitch, FaYoutube } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const RightSideNav = () => {
    
    const {providerLogin} = useContext(AuthContext);
   
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider) 
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error => {
            console.error('error', error);
        })
    }
    return (
        <div>
            <ButtonGroup vertical>
                <Button onClick={handleGoogleSignIn} className='mb-2' variant="outline-primary"><FaGoogle></FaGoogle> Login With Google</Button>
                <Button variant="outline-dark"><FaGithub /> Login With Github</Button>
            </ButtonGroup>

            <div className='mt-4'>
                <h5>Find Us On</h5>
                <ListGroup>
                    <ListGroup.Item className='mb-2 shadow bg-body rounded'><FaFacebook></FaFacebook> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-2 shadow bg-body rounded'><FaYoutube></FaYoutube> Youtube</ListGroup.Item>
                    <ListGroup.Item className='mb-2 shadow bg-body rounded'><FaTwitter></FaTwitter> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-2 shadow bg-body rounded'><FaWhatsapp></FaWhatsapp> Whatsapp</ListGroup.Item>
                    <ListGroup.Item className='mb-2 shadow bg-body rounded'><FaTwitch></FaTwitch> Twitch</ListGroup.Item>
                </ListGroup>
            </div>

            {/* add to carousel  */}
            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>

    );
};

export default RightSideNav;
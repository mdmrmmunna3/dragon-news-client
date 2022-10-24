import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Register = () => {
    const { createUser, updateUserProfile, verificationEmail } = useContext(AuthContext);
    const [error, setError] = useState('');

    const [accepted, setAccepted] = useState(false);

    const handleTermsAndCondition = event => {
        setAccepted(event.target.checked)
    }

    // onsubmitbtn
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photoURL, email, password);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                handleUpdateUserProfile(name, photoURL);
                handleEmailVerification();
                toast.success('Please Check your email address and verify your email')
            })
            .catch(error => {
                console.error('error', error);
                setError(error.message);
            });

        // updateProfile by name and photourl
        const handleUpdateUserProfile = (name, photoURL) => {
            const profile = {
                displayName: name,
                photoURL: photoURL
            }
            updateUserProfile(profile)
                .then(() => { })
                .catch(error => console.error('error', error));
        }

        const handleEmailVerification = () => {
            verificationEmail()
                .then(() => { })
                .catch(error => console.error('error', error));
        }

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Your Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoto">

                <Form.Label>Photo URL</Form.Label>
                <Form.Control name='photoURL' type="text" placeholder="photo URL" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    onClick={handleTermsAndCondition}
                    label={<>Accept <Link to='/terms'>Terms & Conditions</Link> </>} />
            </Form.Group>

            <Button className='mb-2' variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
            <Form.Text className="text-danger ms-2">
                {error}
            </Form.Text>
        </Form>
    );
};

export default Register;
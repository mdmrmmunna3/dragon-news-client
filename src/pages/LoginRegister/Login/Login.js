import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { signIn, setLoading } = useContext(AuthContext);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    // apply location by useLocation and send to location sate path
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                // email verify conditon
                if (user.emailVerified) {
                    navigate(from, { replace: true });
                }
                else {
                    toast.error('Your email not verify ? Please check your email address and confirm to verify!')
                }
            })
            .catch(error => {
                console.error('error', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
            <Form.Text className="text-danger ms-2">
                {error}
            </Form.Text>
        </Form>
    );
};

export default Login;
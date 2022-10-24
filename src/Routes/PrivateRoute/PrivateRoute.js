import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


/*
1. only allow authenticated user to visit the route
2. use and set loading before and after login
3. Redirect user to the route they wanted to go before login
4. Then use useLocation from react router dom and apply this. and set login comopnet .
*/

/* 
you have to way solve login loading issues.
1. you are set to setLoading inside loading conditon on private route before retrun loading as like this if(loading) {setloading(false) return explem: you retun a spiner}
2. and other way you wnated set to finally (() => {setLoading(false)}) down .error promise  to login component .
*/

const PrivateRoute = ({children}) => {
    // const {user, loading, setLoading} = useContext(AuthContext); line-16 releted
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    // loading when relaod page 
    if(loading) {
        return <div className='text-center mb-3'><Spinner animation="border" variant="info" /></div>
    }

    // redirect route
    if(!user) {
        return <Navigate to='/login' state={{from:location}} replace></Navigate>
    }
    else{
        return children;
    }
};

export default PrivateRoute;
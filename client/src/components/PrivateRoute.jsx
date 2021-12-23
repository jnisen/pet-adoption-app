import { Navigate } from 'react-router-dom'

import {useEffect, useContext, useState} from 'react'

import { petAdoptionContext } from '../content/petAdoptionContext';

import Cookies from 'js-cookie'



export default function PrivateRoute({ component: Component }) {

    const [token, setToken] = useState('')
    const {currentUser, setCurrentUser } = useContext(petAdoptionContext)
    

    const cookie = Cookies.get('token')

    useEffect(() => {
        setToken(cookie)
       
    }, [currentUser])

    return <>{cookie ? <Component/> : <Navigate to='/' />}</>

}

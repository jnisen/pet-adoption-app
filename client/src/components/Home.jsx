import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import { useEffect, useContext } from 'react'

import { petAdoptionContext } from '../content/petAdoptionContext';
import clientAxios from '../config/axios'
import Pets from './Pets'

import Cookies from 'js-cookie'

export default function Home() {

    const { pets, setPets, setBack, setSignUp, currentUser, setCurrentUser } = useContext(petAdoptionContext)

    const cookie = Cookies.get('token')

    useEffect(() => {

        setBack(window.location.href.substring(window.location.href.lastIndexOf('/')));

        async function getAllPets() {
            const response = await clientAxios.get('/pets/getAllPets', { withCredentials: true })
            setPets(response.data)
        }

        getAllPets();
    }, [pets])



    useEffect(() => {

        async function getUser() {
            if (cookie) {
                const responseAuth = await clientAxios.get('/users/authUser', { withCredentials: true })
                setCurrentUser(responseAuth.data)
                const response = await clientAxios.get(`/users/getUser/${responseAuth.data.userId}`, { withCredentials: true })
                setSignUp(response.data.user)
               
            }
        }
        getUser()

    }, [])



    return (
        <>
            <Container maxWidth="fixed" sx={{ background: '#6A4770', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Typography variant="h4" align="center" sx={{ m: 2, color: '#F8EEEE' }}>Welcome to the Pet Adoption page</Typography>
                <Typography variant="subtitle1" align="center" sx={{ color: '#F8EEEE' }}>You can adopot or foster a pet</Typography>
                <div style={{ display: 'flex' }}>
                    <img src="/images/paws.jpeg"
                        alt="animal" style={{ width: '40%', height: '50%', margin: '5% auto' }} />
                    <img src="/images/allpets.png"
                        alt="animal" style={{ width: '40%', height: '55%', margin: '5% auto' }} />
                </div>

            </Container>
            <Pets />
            <footer>
                <Typography align="center" sx={{ color: '#F8EEEE', m: 2 }}>
                    This page was developed by Jonathan Nisenbaum
                </Typography>
            </footer>
        </>
    )
}

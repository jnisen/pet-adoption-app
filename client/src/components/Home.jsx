//React
import { useEffect, useContext } from 'react'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material UI
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

//Axios
import clientAxios from '../config/axios'

//Component
import Pets from './Pets'

//Cookies
import Cookies from 'js-cookie'

export default function Home() {

    const {setSignUp, setCurrentUser } = useContext(petAdoptionContext)

    const cookie = Cookies.get('token')


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
        // eslint-disable-next-line
    }, [])



    return (
        <>
            <Container maxWidth="fixed" sx={{ background: '#6A4770', display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h4" align="center" sx={{ m: 2, color: '#F8EEEE' }}>Welcome to the Pet Adoption page</Typography>
                <Typography variant="subtitle1" align="center" sx={{ color: '#F8EEEE' }}>You can adopt or foster a pet</Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <img src="/images/paws.jpeg"
                        alt="animal" style={{ width: '40%', height: '50%', margin: '5% auto' }} />
                    <img src="/images/allpets.png"
                        alt="animal" style={{ width: '40%', height: '55%', margin: '5% auto' }} />
                </div>
            </Container>
            <Pets />
            <footer>
                <Typography align="center" sx={{ color: '#6A4770', m: 3 }}>
                    This page was developed by Jonathan Nisenbaum
                </Typography>
            </footer>
        </>
    )
}

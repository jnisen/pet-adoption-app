import { useState, useEffect, useContext } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import clientAxios from '../config/axios'

import Pet from './Pet'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { petAdoptionContext } from '../content/petAdoptionContext';

export default function PetUser() {

    const { id } = useParams();
    const { back } = useContext(petAdoptionContext)
    const [userPets, setUserPet] = useState('')
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {

        async function getUser() {
            setLoading(false)

            setTimeout(async () => {
                const response = await clientAxios.get(`/users/getUser/${id}`, { withCredentials: true })
                setUserPet(response.data)
                setLoading(true)
            }, 500)

        }
        getUser()

    }, [])

    //user
    //adoptedFosterpets

    return (
        <>
            {loading ?
                <div className="userpets">
                    <Typography variant="h4" align="center" sx={{ m: 2 }}>User</Typography>
                    <div className="user-info">
                        <div className="user-personal">
                            <Typography variant="subtitle"><strong>First Name:</strong> {userPets.user.firstName}</Typography>
                            <Typography variant="subtitle"><strong>Last Name:</strong> {userPets.user.lastName}</Typography>
                            <Typography variant="subtitle"><strong>Bio:</strong> {userPets.user.bio}</Typography>
                        </div>
                        <div className="user-contact">
                            <Typography variant="subtitle"><strong>E-mail:</strong> {userPets.user.email}</Typography>
                            <Typography variant="subtitle"><strong>Phone Number:</strong> {userPets.user.phoneNumber}</Typography>
                        </div>
                    </div>

                    <Typography variant="h4" align="center" sx={{ m: 4 }}>His/Her Pets</Typography>

                    <Box sx={{ width: '100%', mt: 2 }}>
                    {userPets.adoptedFosterpets.length > 0 ?
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {userPets.adoptedFosterpets.map((pet, index) =>
                                <Grid item xs={2} sm={4} md={4} key={index} align="center">
                                    <Pet key={pet._id} pet={pet} />
                                </Grid>
                            )}
                        </Grid>
                        : 'No pets'}
                </Box>



                    <div style={{ marginTop: '2rem', marginBottom: '2rem' ,display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" size="small" className="btn-back" onClick={() => navigate(`${back}`)}>Back</Button>
                    </div>
                </div> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="secondary" />
                    <Typography variant="h5" align="center" sx={{ m: 2 }}>Loading User</Typography>
                </Box>}
        </>
    )
}

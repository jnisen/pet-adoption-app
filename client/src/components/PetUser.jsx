//React
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Component
import Pet from './Pet'

//Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//Axios
import clientAxios from '../config/axios'

export default function PetUser() {

    let navigate = useNavigate();

    const { id } = useParams();

    const { loading, setLoading } = useContext(petAdoptionContext)

    const [userPets, setUserPet] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {

        async function getUser() {
            setLoading(true)
            const response = await clientAxios.get(`/users/getUser/${id}`, { withCredentials: true })
            setUserPet(response.data)
            setUser(response.data.user)
            setLoading(false)
        }
        getUser()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading ? <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <div className="loadingPage">
                    <div className="center_progress">
                        <CircularProgress />
                    </div>
                    <Typography variant="h5" sx={{ color: 'black' }} >Loading Page...</Typography>
                </div>
            </Stack> :
                <div className="userpets">
                    <Typography variant="h4" align="center" sx={{ m: 2 }}>User</Typography>
                    <div className="user-info">
                        <div className="user-personal">
                            <Typography variant="subtitle"><strong>First Name:</strong> {user.firstName}</Typography>
                            <Typography variant="subtitle"><strong>Last Name:</strong> {user.lastName}</Typography>
                            <Typography variant="subtitle"><strong>Bio:</strong> {user.bio}</Typography>
                        </div>
                        <div className="user-contact">
                            <Typography variant="subtitle"><strong>E-mail:</strong>{user.email}</Typography>
                            <Typography variant="subtitle"><strong>Phone Number:</strong>{user.phoneNumber}</Typography>
                        </div>
                    </div>
                    <Typography variant="h4" align="center" sx={{ m: 4 }}>His/Her Pets</Typography>
                    <Box sx={{ width: '100%', mt: 2 }}>
                        {userPets && userPets.adoptedFosterpets.length > 0 ?
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {userPets.adoptedFosterpets.map((pet, index) =>
                                    <Grid item xs={2} sm={4} md={4} key={index} align="center">
                                        <Pet key={pet._id} pet={pet} />
                                    </Grid>
                                )}
                            </Grid>
                            : <p align="center">No Pets Adopted or Fostered</p>}
                    </Box>
                    <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" size="small" className="btn-back" onClick={() => navigate(-1)}>Back</Button>
                    </div>
                </div>}
        </>
    )
}

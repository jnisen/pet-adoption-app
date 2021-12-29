//React
import { useState, useContext, useEffect } from 'react'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AntSwitch from '../style/AntSwitch'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

//Component
import Pet from './Pet'

//Axios
import clientAxios from '../config/axios';


export default function MyPets() {

    const {loading, setLoading, signUp } = useContext(petAdoptionContext)

    const [hidden, setHidden] = useState(false);
    const [savedPets, setSavedPets] = useState([])
    const [adoptedFosterPets, setAdoptedFosterPets] = useState([])

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    useEffect(() => {
        async function getMyPets() {
            setLoading(true)
            
            signUp.savedPets.forEach(async (idPet) => {
                const response = await clientAxios.get(`/pets/getPet/${idPet}`, { withCredentials: true })
                savedPets.push(response.data)
                setSavedPets([...savedPets])
            });

            signUp.adoptedFosterPets.forEach(async (idPet) => {
                const response = await clientAxios.get(`/pets/getPet/${idPet}`, { withCredentials: true })
                adoptedFosterPets.push(response.data)
                setAdoptedFosterPets([...adoptedFosterPets])
            });

            setLoading(false)

        }

        getMyPets();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {loading ?
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <div className="loadingPage">
                        <div className="center_progress">
                            <CircularProgress />
                        </div>
                        <Typography variant="h5" sx={{ color: 'black' }} >Loading Page...</Typography>
                    </div>
                </Stack>
                :
                <>
                    <div className="search-page">
                        <Typography variant="h5" align="center">My Pets</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Adopted/Foster</Typography>
                            <AntSwitch checked={hidden} onChange={handleHiddenChange} inputProps={{ 'aria-label': 'ant design' }} />
                            <Typography>Saved</Typography>
                        </Stack>
                    </div>
                    {hidden
                        ?
                        <Box sx={{ width: '100%', mt: 2 }}>
                            {savedPets.length > 0 ?
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {savedPets.map((pet, index) =>
                                        <Grid item xs={2} sm={4} md={4} key={index} align="center">
                                            <Pet key={pet._id} pet={pet} />
                                        </Grid>
                                    )}
                                </Grid>
                                : <p align="center">No Pets Saved</p>}
                        </Box>
                        : <Box sx={{ width: '100%', mt: 2 }}>
                            {adoptedFosterPets.length > 0 ?
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {adoptedFosterPets.map((pet, index) =>
                                        <Grid item xs={2} sm={4} md={4} key={index} align="center">
                                            <Pet key={pet._id} pet={pet} />
                                        </Grid>
                                    )}
                                </Grid>
                                : <p align="center">No Pets Adopted or Fostered</p>}
                        </Box>
                    }
                </>}
        </>

    )
}

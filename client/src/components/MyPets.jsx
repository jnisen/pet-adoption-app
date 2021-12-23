import { useState, useContext, useEffect } from 'react'

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Pet from './Pet'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { petAdoptionContext } from '../content/petAdoptionContext';
import clientAxios from '../config/axios';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function MyPets() {

    const [hidden, setHidden] = useState(false);
    const { signUp, setBack } = useContext(petAdoptionContext)

    const [savedPets, setSavedPets] = useState([])
    const [adoptedFosterPets, setAdoptedFosterPets] = useState([])

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    useEffect(() => {
        setBack(window.location.href.substring(window.location.href.lastIndexOf('/')));
        async function getMyPets() {
            if (signUp.savedPets.length > 0) {
                signUp.savedPets.forEach(async (idPet) => {
                    const response = await clientAxios.get(`/pets/getPet/${idPet}`, { withCredentials: true })
                    savedPets.push(response.data)
                    setSavedPets([...savedPets])
                });
            }
            if (signUp.adoptedFosterPets.length > 0) {
                signUp.adoptedFosterPets.forEach(async (idPet) => {
                    const response = await clientAxios.get(`/pets/getPet/${idPet}`, { withCredentials: true })
                    adoptedFosterPets.push(response.data)
                    setAdoptedFosterPets([...adoptedFosterPets])
                });
            }
        }

        getMyPets();

    }, [])


    return (
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
                        : 'No saved Pets'}
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
                        : 'No Pets Foster'}
                </Box>
            }
        </>

    )
}

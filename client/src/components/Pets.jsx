//React
import { useContext } from 'react'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Component
import Pet from './Pet'

//Material UI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function Pets() {

    const { pets } = useContext(petAdoptionContext)

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {pets.map((pet, index) =>
                    <Grid item xs={2} sm={4} md={4} key={index} align="center">
                        <Pet key={pets._id} pet={pet} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

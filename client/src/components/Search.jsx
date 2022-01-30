//React
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { petAdoptionContext } from '../content/petAdoptionContext';

//Component
import Pet from './Pet'

//Material UI
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import clientAxios from '../config/axios'
import MenuItem from '@mui/material/MenuItem';
import AntSwitch from '../style/AntSwitch'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import petsArray from '../data/petsArray'
import status from '../data/statusArray'
import Grid from '@mui/material/Grid';

//Swal
import swal from 'sweetalert'


export default function Search() {

    let navigate = useNavigate();
    const  {loading, setLoading } = useContext(petAdoptionContext)

    const [hidden, setHidden] = useState(false);
    const [petsSearch, setPetsSearch] = useState(false)
    const [petCritera, setPetCritera] = useState('')
    const [type, setType] = useState('')
    const [statusAdoption, setStatusAdoption] = useState('')
    const [infoPet, setInfoPet] = useState({ name: '', minweight: '', maxweight: '', minheight: '', maxheight: '' })

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
        setInfoPet({ name: '', minweight: '', maxweight: '', minheight: '', maxheight: '' })
    };


    function handleChange(e) {
        const value = e.target.value
        setInfoPet({ ...infoPet, [e.target.name]: value })
    }

    async function handleSearch(e) {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await clientAxios.get('/pets/searchPet', {
                params: {
                    type: (type !== '') ? (type) : undefined,
                    status: (statusAdoption !== '') ? (statusAdoption) : undefined,
                    name: (infoPet.name !== '') ? (infoPet.name.toLowerCase()) : undefined,
                    minheight: (infoPet.minweight !== '') ? parseFloat(infoPet.minweight) : undefined,
                    maxheight: (infoPet.maxweight !== '') ? parseFloat(infoPet.maxweight) : undefined,
                    minweight: (infoPet.minheight !== '') ? parseFloat(infoPet.minheight) : undefined,
                    maxweight: (infoPet.maxheight !== '') ? parseFloat(infoPet.maxheight) : undefined,

                }
            })
            setLoading(false)

            let url = '/search?q='

            url += (type !== '' || type.length !== 0) ? `type=${type}+` : ''

            if (hidden) {
                url += (statusAdoption !== '' || statusAdoption.length !== 0) ? `status=${statusAdoption}+` : ''
                url += (infoPet.name !== '' || infoPet.name.length !== 0) ? `name=${infoPet.name}+` : ''
                url += (infoPet.minweight !== '' || infoPet.minweight.length !== 0) ? `minweight=${infoPet.minweight}+` : ''
                url += (infoPet.maxweight !== '' || infoPet.maxweight.length !== 0) ? `maxweight=${infoPet.maxweight}+` : ''
                url += (infoPet.minheight !== '' || infoPet.minheight.length !== 0) ? `minheight=${infoPet.minheight}+` : ''
                url += (infoPet.maxheight !== '' || infoPet.maxheight.length !== 0) ? `maxheight=${infoPet.maxheight}+` : ''
            }

            navigate(url.substring(0, url.length - 1))

            setPetCritera(response.data)
            setPetsSearch(true)

            setType('')
            setStatusAdoption('')
            setInfoPet({ name: '', minweight: '', maxweight: '', minheight: '', maxheight: '' })

        } catch (e) {
            swal({
                title: `${e.response.data}`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    return (
        <>
            <div className="search-page">
                <Typography variant="h5" align="center" sx={{ m: 2 }}>Search Pet</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Basic</Typography>
                    <AntSwitch data-cy = 'toggle-search' checked={hidden} onChange={handleHiddenChange} inputProps={{ 'aria-label': 'ant design' }} />
                    <Typography>Advance</Typography>
                </Stack>
            </div>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSearch}>
                <div className="form-search">
                    <TextField
                        variant="standard"
                        size="small"
                        label="Type"
                        data-cy = 'type-search'
                        sx={{ width: 300 }}
                        select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {petsArray.map((pet) => (
                            <MenuItem
                                key={pet}
                                value={pet}
                            
                            >
                                {pet}
                            </MenuItem>))}
                    </TextField>
                    {hidden ?
                        <>
                            <TextField
                                variant="standard"
                                size="small"
                                label="Adopted Status"
                                sx={{ width: 300 }}
                                select
                                data-cy = 'status-search'
                                value={statusAdoption}
                                onChange={(e) => setStatusAdoption(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {status.map((status) => (
                                    <MenuItem
                                        key={status}
                                        value={status}
                                    >
                                        {status}
                                    </MenuItem>))}
                            </TextField>
                            <TextField
                                name='name'
                                label="Name"
                                type="text"
                                size="small"
                                data-cy = 'name-search'
                                variant="standard"
                                sx={{ width: 300 }}
                                onChange={handleChange}
                                value={infoPet.petname}
                            />
                            <div className="form-search-cm">
                                <TextField
                                    name='minheight'
                                    label="Min Height in CM"
                                    type="number"
                                    size="small"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                                    onChange={handleChange}
                                    value={infoPet.minheight}

                                />
                                <TextField
                                    variant="standard"
                                    name='maxheight'
                                    label="Max Height in CM"
                                    type="number"
                                    size="small"
                                    InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                                    onChange={handleChange}
                                    value={infoPet.maxheight}
                                />
                            </div>
                            <div className="form-search-cm">
                                <TextField
                                    name='minweight'
                                    label="Min Weight in CM"
                                    type="number"
                                    size="small"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                                    onChange={handleChange}
                                    value={infoPet.minweight}
                                />
                                <TextField
                                    name='maxweight'
                                    label="Max Weight in CM"
                                    type="number"
                                    size="small"
                                    variant="standard"
                                    InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                                    onChange={handleChange}
                                    value={infoPet.maxweight}
                                />
                            </div> </> : null}
                    <div className="form-search-btn">
                        <Button type="submit" variant="outlined" data-cy = 'search-button'>Search</Button>
                    </div>
                </div>
            </Box>
            {petsSearch ?
                (loading ?
                    (!hidden ? <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <div className="loadingPageSearchBasic">
                            <div className="center_progress">
                                <CircularProgress />
                            </div>
                            <Typography variant="h5" sx={{ color: 'black' }} >Loading Pets...</Typography>
                        </div>
                    </Stack> : <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <div className="loadingPageSearchAdvanced">
                            <div className="center_progress">
                                <CircularProgress />
                            </div>
                            <Typography variant="h5" sx={{ color: 'black' }} >Loading Page...</Typography>
                        </div>
                    </Stack>)
                    : (petCritera.length > 0 ?
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {petCritera.map((pet, index) =>
                                    <Grid item xs={2} sm={4} md={4}  data-cy = 'grid-search' key={index} align="center">
                                        <Pet key={pet._id} pet={pet} />
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                        :
                        <p align="center" data-cy= 'p-search'>No Pets Founded</p>)
                )
                : null}
        </>
    )
}

import { useState, useContext, useEffect} from 'react'

import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import clientAxios from '../config/axios'
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { petAdoptionContext } from '../content/petAdoptionContext';

import Pets from './Pets'

const petsArray = [
    'Dog',
    'Cat',
    'Bird'
]

const status = [
    'Available',
    'Foster',
    'Adopted'
]

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

//se puede modificar que en caso de que se busque nuevamente, si cambia el state de type, name, etc, cambiar el pets

//ver useEffect como mantener esto

export default function Search() {

    const { pets, setPets, setBack } = useContext(petAdoptionContext)

    const [hidden, setHidden] = useState(false);
    let navigate = useNavigate();

    const [type, setType] = useState()
    const [statusAdoption, setStatusAdoption] = useState()
    const [infoPet, setInfoPet] = useState({
        name: '',
        minweight: '',
        maxweight: '',
        minheight: '',
        maxheight: '',
    })

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
        setInfoPet({
            name: '',
            minweight: '',
            maxweight: '',
            minheight: '',
            maxheight: '',
        })
    };

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setBack(window.location.href.substring(window.location.href.lastIndexOf('/')));
    }, [])

    function handleChange(e) {
        const value = e.target.value
        setInfoPet({
            ...infoPet,
            [e.target.name]: value
        })
    }

    async function handleSearch(e) {
        e.preventDefault()


        try {

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

            const url = '/search?search_query_pets=' + type + '+' + statusAdoption
                + infoPet.name + infoPet.minheight + infoPet.maxheight + infoPet.minweight + infoPet.maxweight
            navigate(url)
            setPets(response.data)
            if (response.data.length > 0) setLoading(true)
        } catch (e) {
            console.log(e.response)
        }
    }

    return (

        <>

            <div className="search-page">
                <Typography variant="h5" align="center">Search Pet</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Basic</Typography>
                    <AntSwitch checked={hidden} onChange={handleHiddenChange} inputProps={{ 'aria-label': 'ant design' }} />
                    <Typography>Advance</Typography>
                </Stack>
            </div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSearch}
            >

                <div className="form-search">
                    <TextField
                        variant="standard"
                        size="small"
                        label="Type"
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
                                value={statusAdoption}
                                onChange={(e) => setStatusAdoption(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {/* https://codesandbox.io/s/59196585material-ui-select-select-size-i3jgs?file=/index.js:923-1094 */}
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
                                variant="standard"
                                sx={{ width: 300 }}
                                onChange={handleChange}
                                value={infoPet.petname}
                            // error={errFirstNameSignUp}
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
                                // error={errFirstNameSignUp}
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
                                // error={errFirstNameSignUp}
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
                                // error={errFirstNameSignUp}
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
                                // error={errFirstNameSignUp}
                                />
                            </div> </> : null}

                    <div className="form-search-btn">
                        <Button type="submit" variant="outlined">Search</Button>
                    </div>
                </div>
            </Box>
            {loading ? (pets.length > 0 ? <Pets /> : <p>No pets found</p>) : null}
        </>
    )
}

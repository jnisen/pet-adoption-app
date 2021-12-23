import { useState, createRef, useEffect, useContext } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert'
import clientAxios from '../config/axios'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { petAdoptionContext } from '../content/petAdoptionContext';

const petsArray = [
    'Dog',
    'Cat',
    'Bird'
]

const hypo = [
    'Yes',
    'No'
]

export default function AddPet() {

    const { pets, setPets } = useContext(petAdoptionContext)

    const [infoPet, setInfoPet] = useState({
        name: '',
        height: '',
        weight: '',
        color: '',
        bio: '',
        dietaryRestriction: '',
        breed: ''
    })

    const [type, setType] = useState([])
    let [hypoallergenic, setHypoallergenic] = useState([])

    const [preview, setPreview] = useState()
    const [file, setFile] = useState()

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }

    }, [file])


    const fileInputRef = createRef()

    function handleChange(e) {
        const value = e.target.value
        setInfoPet({
            ...infoPet,
            [e.target.name]: value
        })
    }

    async function handleAddPet(e) {
        e.preventDefault()

        const data = new FormData()
        data.append('image', file)
        data.append('name', infoPet.name.toLowerCase())
        data.append('height', infoPet.height)
        data.append('weight', infoPet.weight)
        data.append('color', infoPet.color)
        data.append('bio', infoPet.bio)
        data.append('dietaryRestriction', infoPet.dietaryRestriction)
        data.append('breed', infoPet.breed)
        if (hypoallergenic === 'Yes') hypoallergenic = true
        else hypoallergenic = false
        data.append('hypoallergenic', hypoallergenic)
        data.append('type', type)

        const obj = {
            ...infoPet,
            type: type,
            picture: file.name,
            hypoallergenic: hypoallergenic
        }

        try {

            const response = await clientAxios.post('/pets/addPet', data, { withCredentials: true })
            swal({
                title: `${response.data}`,
                icon: "success",
                button: "Ok",
            });

            const newPet = [...pets, obj]

            setPets(newPet)
        } catch (e) {
            console.log(e.response)
        }
    }


    return (
        <div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleAddPet}
            >
                <Typography variant="h5" align="center">Add Pet</Typography>
                <div className="container-add">
                    <div className="container-add-file">
                        <Button
                            variant="standard"
                            component="label"
                        >
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={(event) => {
                                const file = event.target.files[0];
                                if (file) {
                                    setFile(file)
                                } else {
                                    setFile(null)
                                }
                            }} />
                        </Button>
                        {file ? <img src={preview} alt={file} width="250" height="250" /> :
                            <img src="https://www.pawtree.com/Content/images/dog-profile-icon.jpg" alt="noperfil" width="250" height="250"></img>}
                    </div>
                    <div className="container-add-items">
                        <TextField
                            variant="standard"
                            size="small"
                            label="Type"
                            sx={{ width: 150 }}
                            select
                            value={type}
                            required
                            onChange={(e) => setType(e.target.value)}
                        >
                            {petsArray.map((pet) => (
                                <MenuItem
                                    key={pet}
                                    value={pet}
                                >
                                    {pet}
                                </MenuItem>))}
                        </TextField>
                        <TextField
                            required
                            name='name'
                            label="Name"
                            type="text"
                            size="small"
                            variant="standard"
                            onChange={handleChange}
                            value={infoPet.name}
                            sx={{ width: 150 }}
                        // error={errFirstNameSignUp}
                        />

                        {/* https://www.youtube.com/watch?v=BPUgM1Ig4Po */}
                        <TextField
                            required
                            name='height'
                            label="Height"
                            type="number"
                            size="small"
                            variant="standard"
                            InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                            onChange={handleChange}
                            value={infoPet.height}
                            sx={{ width: 150 }}
                        // error={errFirstNameSignUp}
                        />

                        <TextField
                            required
                            name='weight'
                            label="Weight"
                            type="number"
                            size="small"
                            variant="standard"
                            InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                            onChange={handleChange}
                            value={infoPet.weight}
                            sx={{ width: 150 }}
                        // error={errFirstNameSignUp}
                        />

                        <TextField
                            required
                            name='color'
                            label="Color"
                            type="text"
                            size="small"
                            variant="standard"
                            onChange={handleChange}
                            value={infoPet.color}
                            sx={{ width: 150 }}
                        // error={errFirstNameSignUp}
                        />

                        <TextField
                            required
                            name='bio'
                            label="Bio"
                            type="text"
                            size="small"
                            variant="standard"
                            onChange={handleChange}
                            value={infoPet.bio}
                            sx={{ width: 150 }}
                        // error={errFirstNameSignUp}
                        />

                        <TextField
                            variant="standard"
                            size="small"
                            label="Hypoallergenic"
                            sx={{ width: 150 }}
                            select
                            value={hypoallergenic}
                            onChange={(e) => setHypoallergenic(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {hypo.map((h) => (
                                <MenuItem
                                    key={h}
                                    value={h}
                                >
                                    {h}
                                </MenuItem>))}
                        </TextField>

                        <TextField
                            required
                            name='dietaryRestriction'
                            label="Dietary Restriction"
                            type="text"
                            size="small"
                            sx={{ width: 150 }}
                            variant="standard"
                            onChange={handleChange}
                            value={infoPet.dietaryRestriction}
                        // error={errFirstNameSignUp}
                        />


                        <TextField
                            required
                            name='breed'
                            label="Breed"
                            type="text"
                            size="small"
                            variant="standard"
                            InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                            onChange={handleChange}
                            value={infoPet.breed}
                            sx={{ width: 150 }}
                        // error={errFirstNameSignUp}
                        />
                    </div>
                </div>
                <div className="container-btn-add">
                    <Button type="submit" variant="contained" align="center" size="small" sx={{ background: '#6A4770' }}>Sumbit</Button>
                </div>
            </Box>
        </div >
    )
}

//React
import { useState, createRef, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material Ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import petsArray from '../data/petsArray'
import hypo from '../data/hypoArray'

//Swal
import swal from 'sweetalert'

//axios
import clientAxios from '../config/axios'

export default function AddPet() {

    let navigate = useNavigate();

    const { pets, setPets } = useContext(petAdoptionContext)

    const fileInputRef = createRef()

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

    useEffect(() => {
        async function getRole() {
            const responseAuth = await clientAxios.get('/users/authUser', { withCredentials: true })
            if (responseAuth.data.role !== 'admin') {
                alert('You arent an Admin, not allowed to access this page')
                navigate('/home')
            }
        }
        getRole()
          // eslint-disable-next-line
    }, [])

    function handleChange(e) {
        const value = e.target.value
        setInfoPet({
            ...infoPet,
            [e.target.name]: value
        })
    }

    async function handleAddPet(e) {
        e.preventDefault()

        if (!file) {
            swal({
                title: 'No image uploaded',
                icon: "error",
                button: "Ok",
            });
            return
        }


        const data = new FormData()
        data.append('image', file)
        data.append('name', infoPet.name)
        data.append('height', infoPet.height)
        data.append('weight', infoPet.weight)
        data.append('color', infoPet.color)
        data.append('bio', infoPet.bio)
        data.append('dietaryRestriction', infoPet.dietaryRestriction)
        data.append('breed', infoPet.breed)
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

            setInfoPet({
                name: '',
                height: '',
                weight: '',
                color: '',
                bio: '',
                dietaryRestriction: '',
                breed: ''
            })

            setType([])
            setHypoallergenic([])
            setPreview('https://www.pawtree.com/Content/images/dog-profile-icon.jpg')


        } catch (e) {
            const { msg } = e.response.data.errors[0]
            swal({
                title: `${msg}`,
                icon: "error",
                button: "Ok",
            });
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
                        />
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
                            {hypo.map((hypoallergenic) => (
                                <MenuItem
                                    key={hypoallergenic}
                                    value={hypoallergenic}
                                >
                                    {hypoallergenic}
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
                        />
                    </div>
                </div>
                <div className="container-btn-add">
                    <Button type="submit" variant="contained" align="center" size="small" sx={{ background: '#6A4770' }}>Add Pet</Button>
                </div>
            </Box>
        </div >
    )
}

//React
import { useState, createRef, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

//Axios
import clientAxios from '../config/axios'


export default function EditPet() {

    let navigate = useNavigate();

    const { id } = useParams();

    const { petDetail, setPetDetail } = useContext(petAdoptionContext)

    const [infoPet, setInfoPet] = useState({
        name: petDetail.name,
        height: petDetail.height,
        weight: petDetail.weight,
        color: petDetail.color,
        bio: petDetail.bio,
        dietaryRestriction: petDetail.dietaryRestriction,
        breed: petDetail.breed,
    })

    const [type, setType] = useState(petDetail.type)
    let [hypoallergenic, setHypoallergenic] = useState(petDetail.hypoallergenic ? 'Yes' : "No")
    const [preview, setPreview] = useState()
    const [file, setFile] = useState()
    const fileInputRef = createRef()

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
          // eslint-disable-next-line
    }, [file])

    function handleChange(e) {
        const value = e.target.value
        setInfoPet({
            ...infoPet,
            [e.target.name]: value
        })
    }

    async function handleEditPet(e) {
        e.preventDefault()

        const data = new FormData()
        data.append('image', file)
        data.append('id', id)
        data.append('name', infoPet.name.toLowerCase())
        data.append('height', infoPet.height)
        data.append('weight', infoPet.weight)
        data.append('color', infoPet.color)
        data.append('bio', infoPet.bio)
        data.append('dietaryRestriction', infoPet.dietaryRestriction)
        data.append('breed', infoPet.breed)
        data.append('hypoallergenic', hypoallergenic)
        data.append('type', type)

        try {

            const response = await clientAxios.put(`/pets/updatePet/${id}`, data, { withCredentials: true })
            swal({
                title: `${response.data.message}`,
                icon: "success",
                button: "Ok",
            });

            setPetDetail(response.data.pet)

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
                onSubmit={handleEditPet}
            >
                <Typography variant="h5" align="center">Edit Pet</Typography>
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
                            <img src={petDetail.picture} alt="noperfil" width="250" height="250"></img>}
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
                <div className="pet-details-actions" align="center">
                    <Button variant="contained" color="primary" size="small" className="btn-back" onClick={() => navigate(-2)}>Back</Button>
                    <Button type="submit" variant="contained" align="center" size="small" sx={{ background: '#6A4770' }}>Edit</Button>
                </div>
            </Box>
        </div >

    )
}

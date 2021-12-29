//React
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material Ui
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

//Swal
import swal from 'sweetalert'

//Axios
import clientAxios from '../config/axios'


export default function PetDetails() {

    let navigate = useNavigate();

    const { id } = useParams();

    const { setPets, signUp, setSignUp, petDetail, setPetDetail, currentUser } = useContext(petAdoptionContext)

    useEffect(() => {
        async function getPet() {
            const response = await clientAxios.get(`/pets/getPet/${id}`, { withCredentials: true })
            setPetDetail(response.data)
        }
        getPet()
        // eslint-disable-next-line
    }, [])

    async function handleAdopt() {
        const obj = {
            status: 'Adopted',
        }

        try {
            const response = await clientAxios.post(`/pets/adoptfoster/${id}`, obj, { withCredentials: true })
            swal({
                title: `${response.data.message}`,
                icon: "success",
                button: "Ok",
            });

            setPetDetail(response.data.pets.filter(pet => pet._id === id)[0])
            setPets(response.data.pets)
            setSignUp(response.data.user)

        } catch (e) {
            swal({
                title: `${e.response.data}`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    async function handleFoster() {
        const obj = { status: 'Foster' }

        try {
            const response = await clientAxios.post(`/pets/adoptfoster/${id}`, obj, { withCredentials: true })
            swal({
                title: `${response.data.message}`,
                icon: "success",
                button: "Ok",
            });

            setPetDetail(response.data.pets.filter(pet => pet._id === id)[0])
            setPets(response.data.pets)
            setSignUp(response.data.user)

        } catch (e) {

            swal({
                title: `${e.response.data}`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    async function handleReturn() {
        try {
            const response = await clientAxios.post(`/pets/returnPet/${id}`, {}, { withCredentials: true })

            swal({
                title: `${response.data.message}`,
                icon: "success",
                button: "Ok",
            });

            setPetDetail(response.data.pets.filter(pet => pet._id === id)[0])
            setPets(response.data.pets)
            setSignUp(response.data.user)

        } catch (e) {
            swal({
                title: `${e.response.data}`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    async function handleSaveForLater() {
        try {

            const response = await clientAxios.post(`/pets/savedPet/${id}`, {}, { withCredentials: true })

            swal({
                title: `${response.data.message}`,
                icon: "success",
                button: "Ok",
            });

            setSignUp(response.data.user)

        } catch (e) {
            swal({
                title: `${e.response.data}`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    async function handleUnSaveForLater() {
        try {
            const response = await clientAxios.delete(`/pets/deleteSavedPet/${id}`, { withCredentials: true })
            swal({
                title: `${response.data.message}`,
                icon: "success",
                button: "Ok",
            });

            setSignUp(response.data.user)

        } catch (e) {

            swal({
                title: `${e.response.data}`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    async function handleToEdit() {
        navigate(`/editpet/${id}`)
    }


    return (
        <div className="pet-detail">
            <div className="pet-detail-up">
                <Card sx={{ maxWidth: 250, backgroundColor: "#1E1E1E" }} className="pet-detail-img">
                    <CardMedia
                        component="img"
                        height="230"
                        image={petDetail.picture}
                        alt={petDetail.name}
                    />
                </Card>
                <Typography variant="subtitle" className="pet-detail-name">My name is  {petDetail.name}</Typography>
                <Typography variant="subtitle" className="pet-detail-bio">Bio: {petDetail.bio}</Typography>
                <div className="pet-detail-typestatus">
                    <Chip label={petDetail.status} variant="outlined" color="secondary" className="pet-detail-status" />
                    <Chip label={petDetail.type} color="secondary" className="pet-detail-type" />
                </div>
                <Typography variant="h5" className="pet-detail-facts">Facts About Me</Typography>
                <div className="pet-detail-breed">
                    <Typography variant="subtitle">Breed: </Typography>
                    <Typography variant="subtitle">{petDetail.breed}</Typography>
                </div>
                <div className="pet-detail-colorpet">
                    <Typography variant="subtitle">Color: </Typography>
                    <Typography variant="subtitle">{petDetail.color}</Typography>
                </div>
                <div className="pet-detail-hypo">
                    <Typography variant="subtitle">Hypoallergenic: </Typography>
                    <Typography variant="subtitle">{petDetail.hypoallergenic ? "Yes" : "No"}</Typography>
                </div>
                <div className="pet-detail-weight">
                    <Typography variant="subtitle">Weight: </Typography>
                    <Typography variant="subtitle">{petDetail.weight} kg</Typography>
                </div>
                <div className="pet-detail-height">
                    <Typography variant="subtitle">Height: </Typography>
                    <Typography variant="subtitle">{petDetail.height} cm</Typography>
                </div>
                <div className="pet-detail-dietary">
                    <Typography variant="subtitle">Dietary Restriction: </Typography>
                    <Typography variant="subtitle">{petDetail.dietaryRestriction}</Typography>
                </div>
            </div>
            <div className="pet-details-actions">
                <Button variant="contained" color="primary" size="small" className="btn-back" onClick={() => navigate(-1)}>Back</Button>

                {currentUser.role === 'public' ?
                    <>

                        {petDetail.status === 'Available' ?
                            <>
                                <Button variant="contained" color="success" size="small" className="btn-adopt" onClick={handleAdopt}>Adopt</Button>
                                <Button variant="contained" color="success" size="small" className="btn-foster" onClick={handleFoster}>Foster</Button>
                            </> : null
                        }
                        {petDetail.status === 'Foster' && signUp.adoptedFosterPets.includes(id) ?
                            <Button variant="contained" color="success" size="small" className="btn-adopt" onClick={handleAdopt}>Adopt</Button>
                            : null
                        }
                        {petDetail.status === 'Adopted' && signUp.adoptedFosterPets.includes(id) ?
                            < Button variant="contained" color="warning" size="small" className="btn-foster" onClick={handleReturn}>Return</Button>
                            : null
                        }

                        {!signUp.savedPets.includes(id) ?
                            < Button variant="contained" color="warning" size="small" className="btn-foster" onClick={handleSaveForLater}>Save Pet</Button>
                            :
                            < Button variant="contained" color="warning" size="small" className="btn-foster" onClick={handleUnSaveForLater}>Unsave Pet</Button>
                        }

                    </> :
                    <>
                        {petDetail.status === 'Available' ?
                            < Button variant="contained" color="success" size="small" className="btn-foster" onClick={handleToEdit}>To Edit</Button>
                            : null
                        }
                    </>
                }
            </div>
        </div >
    )
}
import { useState, useEffect, useContext } from 'react'

import { useParams } from 'react-router-dom'

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MuiPhoneNumber from 'material-ui-phone-number';
import clientAxios from '../config/axios'
import { petAdoptionContext } from '../content/petAdoptionContext';

import swal from 'sweetalert'

export default function Profile() {

    const { id } = useParams();

    const { signUp, setSignUp, phone, setPhone, handleOnChange, handleChange, currentUser, setCurrentUser } = useContext(petAdoptionContext)

    const [value, setValue] = useState('personal')


    useEffect(() => {

        async function getUser() {

            const response = await clientAxios.get(`/users/getUser/${id}`, {withCredentials: true})
            setSignUp(response.data.user)
            setPhone(response.data.user.phoneNumber)
        }
        getUser()

    }, [])


    const handleValueChange = (event, newValue) => {
        setValue(newValue);
    };


    async function handleProfile(e) {
        e.preventDefault();

        if (signUp.password.trim().length === 0 || signUp.password.length === 60) {
            swal({
                title: `Password can't be empty, go to profile tab`,
                icon: "error",
                button: "Ok",
            });
            return
        }

        const obj = {
            ...signUp,
            phoneNumber: (phone.phoneNumber !== undefined) ? phone.phoneNumber : signUp.phoneNumber,
            idUser: id
        }

        try {
            const response = await clientAxios.put(`/users/updateUser/${id}`, obj, {withCredentials: true})

            const user = {
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                userId: currentUser.userId,
                role: currentUser.role
            }

            setCurrentUser(user)

            // podemos que en el backend pasarnos la info
            // proyeccion solo que me muestre estos 4

            if (response) {
                swal({
                    title: `${response.data.message}`,
                    icon: "success",
                    button: "Aww yiss!",
                });
            }
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
            <Typography variant="h5" align="center" sx={{ m: 2 }}>Settings</Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', typography: 'body1' }} component="form" onSubmit={handleProfile}>
                    <TabContext value={value} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleValueChange} aria-label="lab API tabs example">
                                <Tab label="personal" value="personal" />
                                <Tab label="profile" value="profile" />
                            </TabList>
                        </Box>
                        <TabPanel value="personal" >
                            <div className="form-personal">
                                <div>
                                    <div className="form-personal-items">
                                        <Typography variant="subtitle" align="center" sx={{ m: 2 }}>First Name</Typography>
                                        <TextField
                                            required
                                            name='firstName'
                                            type="text"
                                            size="small"
                                            onChange={handleChange}
                                            value={signUp.firstName}
                                        />
                                    </div>
                                    <div className="form-personal-items">
                                        <Typography variant="subtitle" align="center" sx={{ m: 2 }}>Last Name</Typography>
                                        <TextField
                                            required
                                            name='lastName'
                                            type="text"
                                            size="small"
                                            onChange={handleChange}
                                            value={signUp.lastName}
                                        />
                                    </div>
                                    <div className="form-personal-items form-personal-phone">
                                        <Typography variant="subtitle" align="center" sx={{ m: 2 }}>Phone</Typography>
                                        <MuiPhoneNumber
                                            defaultCountry={'il'}
                                            name='phoneNumber'
                                            size="small"
                                            onChange={handleOnChange}
                                            variant="outlined"
                                            value={signUp.phoneNumber}
                                            required
                                        />
                                    </div>
                                </div>

                                <Typography variant="subtitle" align="center" sx={{ m: 2 }}>Bio</Typography>
                                <TextField
                                    id="outlined-textarea"
                                    placeholder="What you have in mind..."
                                    multiline
                                    onChange={handleChange}
                                    value={signUp.bio}
                                    name='bio'
                                />

                            </div>
                        </TabPanel>
                        <TabPanel value="profile" component="form" onSubmit={handleProfile}>
                            <div className="form-personal-items">
                                <Typography variant="subtitle" align="center" sx={{ m: 2 }}>E-mail</Typography>
                                <TextField
                                    name='email'
                                    label="E-mail"
                                    type="email"
                                    size="medium"
                                    value={signUp.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-personal-items">
                                <Typography variant="subtitle" align="center" sx={{ m: 2 }}>Password</Typography>
                                <TextField
                                    name='password'
                                    label="Password"
                                    type="password"
                                    size="medium"
                                    onChange={handleChange}
                                />
                            </div>
                        </TabPanel>
                    </TabContext>
                    <Button type="submit" sx={{ my: 2 }} variant="contained">Sumbit</Button>
                </Box>

            </div> </>

    )
}

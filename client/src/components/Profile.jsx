//React
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material Ui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MuiPhoneNumber from 'material-ui-phone-number';

//axios
import clientAxios from '../config/axios'

//Swal
import swal from 'sweetalert'

export default function Profile() {

    const { id } = useParams();

    const { signUp, setSignUp, phone, setPhone, currentUser, setCurrentUser } = useContext(petAdoptionContext)

    useEffect(() => {
        async function getUser() {
            const response = await clientAxios.get(`/users/getUser/${id}`, { withCredentials: true })
            setSignUp(response.data.user)
            setPhone(response.data.user.phoneNumber)
        }
        getUser()
        // eslint-disable-next-line
    }, [])


    function handleOnChange(value) {
        setPhone({
          phoneNumber: value
        });
      }
    
      function handleChange(e) {
        const value = e.target.value
        setSignUp({
          ...signUp,
          [e.target.name]: value
        })
      }

    async function handleProfile(e) {
        e.preventDefault();

        const obj = {
            ...signUp,
            phoneNumber: (phone.phoneNumber !== undefined) ? phone.phoneNumber : signUp.phoneNumber,
            idUser: id
        }

        try {


            const response = await clientAxios.put(`/users/updateUser/${id}`, obj, { withCredentials: true })

            const user = {
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                userId: currentUser.userId,
                role: currentUser.role
            }

            setCurrentUser(user)

            if (response) {
                swal({
                    title: `${response.data.message}`,
                    icon: "success",
                    button: "Ok",
                });
            }
        } catch (e) {
            if (typeof e.response.data === 'object') {
                const { msg } = e.response.data.errors[0]
                swal({
                    title: `${msg}`,
                    icon: "error",
                    button: "Ok",
                });
            } else {
                swal({
                    title: `${e.response.data}`,
                    icon: "error",
                    button: "Ok",
                });
            }
        }
    }


    return (

        <>
            <Typography variant="h5" align="center" sx={{ m: 2 }}>Profile Settings</Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', typography: 'body1' }} component="form" onSubmit={handleProfile}>
                    <div>
                        <div className="form-personal-items">
                            <Typography variant="subtitle" align="center" sx={{ m: 2 }}><strong>First Name: </strong></Typography>
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
                            <Typography variant="subtitle" align="center" sx={{ m: 2 }}><strong>Last Name: </strong></Typography>
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
                            <Typography variant="subtitle" align="center" sx={{ m: 2 }}><strong>Phone Number: </strong></Typography>
                            <MuiPhoneNumber
                                defaultCountry={'il'}
                                name='phoneNumber'
                                size="small"
                                onChange={handleOnChange}
                                variant="outlined"
                                value={signUp.phoneNumber}
                               
                            />
                        </div>
                    </div>

                    <Typography variant="subtitle" align="center" sx={{ m: 2 }}><strong>Bio: </strong></Typography>
                    <TextField
                        id="outlined-textarea"
                        placeholder="What you have in mind..."
                        multiline
                        onChange={handleChange}
                        value={signUp.bio}
                        name='bio'
                        size="small"
                    />
                    <div className="form-personal-items">
                        <Typography variant="subtitle" align="center" sx={{ m: 2 }}><strong>Email: </strong></Typography>
                        <TextField
                            name='email'
                            type="email"
                            size="small"
                            value={signUp.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-personal-items">
                        <Typography variant="subtitle" align="center" sx={{ m: 2 }}><strong>Password: </strong></Typography>
                        <TextField
                            name='password'
                            label="Password (*)"
                            type="password"
                            size="small"
                            onChange={handleChange}

                        />
                        <small align="center">(*) Password must contain at least one upper case, one lower case, one digit and at least 6 characters long</small>
                    </div>
                    <Button type="submit" sx={{ my: 2 }} variant="contained" align="center">Update Profile</Button>
                </Box>

            </div>
        </>

    )
}

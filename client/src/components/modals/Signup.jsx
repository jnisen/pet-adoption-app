//React
import { useState, useContext } from 'react'
import { petAdoptionContext } from '../../content/petAdoptionContext';

//Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiPhoneNumber from 'material-ui-phone-number';

//Axios
import clientAxios from '../../config/axios'

//Swal
import swal from 'sweetalert'


export default function Signup() {

    const { signUpModal, setSignUpModal, setLoginModal, phone, setPhone, signUp, setSignUp } = useContext(petAdoptionContext)

    const [errFirstNameSignUp, setErrFirstNameSignUp] = useState(false)
    const [errLastNameSignUp, setErrLastNameSignUp] = useState(false)
    const [errEmailSignUp, setErrEmailSignUp] = useState(false)
    const [errPassSignUp, setErrPassSignUp] = useState(false)
    const [errConfirmPassSignUp, setErrConfirmPassSignUp] = useState(false)
    const [errPhoneNumber, setErrPhoneNumber] = useState(false)


    const handleSignUp = async ev => {
        ev.preventDefault();

        setErrFirstNameSignUp(false);
        setErrLastNameSignUp(false);
        setErrEmailSignUp(false);
        setErrPassSignUp(false);
        setErrConfirmPassSignUp(false)
        setErrPhoneNumber(false)


        if (signUp.firstName === '') {
            setErrFirstNameSignUp(true)
            return
        }

        if (signUp.lastName === '') {
            setErrLastNameSignUp(true)
            return
        }
        if (signUp.email === '') {
            setErrEmailSignUp(true)
            return
        }
        if (phone === '') {
            setErrPhoneNumber(true)
            return
        }
        if (signUp.password === '') {
            setErrPassSignUp(true)
            return
        }
        if (signUp.confirmPassword === '') {
            setErrConfirmPassSignUp(true)
            return
        }


        const signUpObj = {
            ...signUp,
            ...phone
        }

        try {
            const response = await clientAxios.post('/users/signup', signUpObj)

            if (response.data) {
                swal({
                    title: `${response.data}`,
                    icon: "success",
                    button: "Ok",
                });
                setSignUpModal(false)
            }

            setSignUp({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                bio: ''
            })

            setPhone({
                phoneNumber: ''
            });

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

    function handleChange(e) {
        const value = e.target.value
        setSignUp({
            ...signUp,
            [e.target.name]: value
        })
    }

    function handleOnChange(value) {
        setPhone({
            phoneNumber: value
        });
    }

    function handleLogin() {
        setSignUpModal(false)
        setLoginModal(true)
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', display: 'flex', justifyContent: 'center' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSignUp}
        >
            <Typography variant="h5" align="center">Sign Up</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={12} md={6} align="center">
                    <TextField
                        required
                        name='firstName'
                        label="First Name"
                        type="text"
                        size="medium"
                        onChange={handleChange}
                        value={signUp.firstName}
                        error={errFirstNameSignUp}
                        helperText="Enter your first name"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} align="center">
                    <TextField
                        required
                        name='lastName'
                        label="Last Name"
                        type="text"
                        size="medium"
                        onChange={handleChange}
                        value={signUp.lastName}
                        error={errLastNameSignUp}
                        helperText="Enter your last name"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} align="center">
                    <TextField
                        required
                        name='email'
                        label="E-mail"
                        type="email"
                        size="medium"
                        onChange={handleChange}
                        error={errEmailSignUp}
                        value={signUp.email}
                        helperText="Enter your a valid email"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} align="center">
                    <MuiPhoneNumber
                        defaultCountry={'il'}
                        name='phoneNumber'
                        onChange={handleOnChange}
                        variant="outlined"
                        error={errPhoneNumber}
                        value={phone.phoneNumber}
                        required
                        helperText="Enter your your phone"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} align="center">

                    <TextField
                        label="Password"
                        name='password'
                        type="password"
                        size="medium"
                        required
                        onChange={handleChange}
                        error={errPassSignUp}
                        value={signUp.password}
                        helperText="Enter a password (*)"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} align="center">

                    <TextField
                        variant="outlined"
                        label="Confirm Password"
                        name='confirmPassword'
                        type="password"
                        size="medium"
                        required
                        onChange={handleChange}
                        error={errConfirmPassSignUp}
                        value={signUp.confirmPassword}
                        helperText="Confirm password"
                    />
                </Grid>
            </Grid>
            <small align="center">(*) Password must contain at least one upper case, one lower case, one digit and at least 6 characters long</small>
            <div className="form-signup">
                <div className="form-login-action">
                    <Button type="submit" color="secondary" variant="contained" size="small" sx={{ m: 1 }}>Sign Up</Button>
                    <Button type="submit" color="secondary" variant="contained" size="small" onClick={() => setSignUpModal(!signUpModal)}>Cancel</Button>
                </div>
            </div>
            <Typography align="center">
                Already have an account? <Button size="small" variant="text" onClick={handleLogin} >Login</Button>
            </Typography>
        </Box>
    )
}

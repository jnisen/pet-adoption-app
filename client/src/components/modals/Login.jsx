//React
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { petAdoptionContext } from '../../content/petAdoptionContext';

//Material Ui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

//Swal
import swal from 'sweetalert'

//Axios
import clientAxios from '../../config/axios'

export default function Login() {

    let navigate = useNavigate();

    const { loginModal, setLoginModal, setSignUpModal, setCurrentUser } = useContext(petAdoptionContext)

    const [errEmailLogin, setErrEmailLogin] = useState(false)
    const [errPassLogin, setErrPassLogin] = useState(false)
    const [login, setLogin] = useState({ email: '', password: '' })

    const handleLogin = async ev => {
        ev.preventDefault();

        setErrEmailLogin(false);
        setErrPassLogin(false);

        if (login.email === '') {
            setErrEmailLogin(true)
            return
        }
        
        if (login.password === '') {
            setErrPassLogin(true)
            return
        }

        try {
            const response = await clientAxios.post('/users/login', login, { withCredentials: true })
            if (response) {
                setCurrentUser(response.data)
                setLoginModal(false)
                navigate('/home')
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

        setLogin({ email: '', password: '' })
    }

    function handleChange(e) {
        const value = e.target.value
        setLogin({ ...login, [e.target.name]: value })
    }

    function handleSignUp() {
        setSignUpModal(true)
        setLoginModal(false)
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', display: 'flex', justifyContent: 'center' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
        >
            <div className="form-login">
                <Typography>Login</Typography>
                <TextField
                    required
                    id="outlined-required"
                    name='email'
                    label="E-mail"
                    type="email"
                    size="small"
                    onChange={handleChange}
                    error={errEmailLogin}
                    helperText="Enter an email"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    name='password'
                    type="password"
                    size="small"
                    required
                    onChange={handleChange}
                    error={errPassLogin}
                    helperText="Enter a password"
                />
                <div className="form-login-action">
                    <Button type="submit" color="secondary" variant="contained" size="small" sx={{ m: 1 }}>Login</Button>
                    <Button type="submit" color="secondary" variant="contained" size="small" onClick={() => setLoginModal(!loginModal)}>Cancel</Button>
                </div>
            </div>
            <Typography align="center">
                Need an account? <Button size="small" onClick={handleSignUp}>Sign Up</Button>
            </Typography>
        </Box>
    )
}

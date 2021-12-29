//React
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material Ui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

//Axios
import clientAxios from '../config/axios';

//Swal
import swal from 'sweetalert'

export default function Contact() {

    let navigate = useNavigate();

    const { signUp, currentUser} = useContext(petAdoptionContext)

    const [form, setForm] = useState({
        name: `${signUp.firstName} ${signUp.lastName}`,
        email: signUp.email,
        message: '',
        subject: ''
    })

    function handleChange(e) {
        const value = e.target.value
        setForm({
            ...form,
            [e.target.name]: value
        })
    }

    async function handleAddMessage(e) {
        e.preventDefault()
        try {
            const response = await clientAxios.post(`/users/addMessage/${currentUser.userId}`, form, { withCredentials: true })
            swal({
                title: `${response.data}`,
                icon: "success",
                button: "Ok",
            });

            setForm({
                name: `${signUp.firstName} ${signUp.lastName}`,
                email: signUp.email,
                subject: '',
                message: '',

            })

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
        <>
            <div align="center" style={{marginTop:'10px'}}>
                <Button variant="contained" size="small" onClick={() => navigate('/messages')}>See my Queries</Button>
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch', display: 'flex', justifyContent: 'center' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleAddMessage}
            >
                <div className="form-login">
                    <Typography>Contact</Typography>
                    <TextField
                        id="filled-read-only-input"
                        name='name'
                        size="small"
                        defaultValue={form.name}
                        label="Name"
                        InputProps={{ readOnly: true, }}
                        style = {{width: 350}}

                    />
                    <TextField
                        id="filled-read-only-input"
                        name='email'
                        size="small"
                        defaultValue={form.email}
                        label="E-mail"
                        InputProps={{ readOnly: true, }}
                        style = {{width: 350}}
                    />
                    <TextField
                        id="filled-read-only-input"
                        name='subject'
                        size="small"
                        onChange={handleChange}
                        label="Subject"
                        value={form.subject}
                        style = {{width: 350}}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        name='message'
                        multiline
                        rows={4}
                        placeholder="Write a message..."
                        onChange={handleChange}
                        value={form.message}
                        style = {{width: 350}}
                    />

                    <Button type="submit" color="secondary" variant="contained" size="small" sx={{ m: 1 }}>Send Form</Button>

                </div>
            </Box>
        </>
    )
}

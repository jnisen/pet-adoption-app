//React
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

export default function Message() {

    let navigate = useNavigate();

    const { id } = useParams();

    const { currentUser} = useContext(petAdoptionContext)

    const [message, setMessage] = useState('')

    useEffect(() => {
        async function getMessage() {
            const response = await clientAxios.get(`/users/getMessage/${id}`, { withCredentials: true })
            setMessage(response.data.message)

        }
        getMessage()
        // eslint-disable-next-line
    }, [])


    function handleChange(e) {
        const value = e.target.value
        setMessage({
            ...message,
            [e.target.name]: value
        })
    }

    async function handleAddAnswer(e) {
        e.preventDefault()
        try {
            const updateMessage = {
                ...message,
                status: 'answered'
            }

            const response = await clientAxios.put(`/users/answerMessage/${id}`, updateMessage, { withCredentials: true })

            swal({
                title: `${response.data}`,
                icon: "success",
                button: "Ok",
            });

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
            {message &&
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch', display: 'flex', justifyContent: 'center' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleAddAnswer}
                >
                    <div className="form-login">
                        <Typography>Answer Form</Typography>
                        <TextField
                            id="filled-read-only-input"
                            name='subject'
                            size="small"
                            defaultValue={message.message}
                            label="Subject"
                            InputProps={{ readOnly: true, }}

                        />
                        <TextField
                            id="filled-read-only-input"
                            name='message'
                            size="small"
                            defaultValue={message.subject}
                            label="Message"
                            InputProps={{ readOnly: true, }}

                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Answer"
                            name='answer'
                            multiline
                            rows={4}
                            defaultValue={message.status === 'in progress' ? '' : message.answer}
                            onChange={handleChange}
                            InputProps={currentUser.role === 'admin' && message.status === 'in progress' ? { shrink: true } : { readOnly: true, }}
                        />

                        <Button variant="contained" color="primary" size="small" className="btn-back" onClick={() => navigate(-1)}>Back</Button>
                        
                        {currentUser.role === 'admin' && message.status === 'in progress' ?
                            <Button type="submit" color="secondary" variant="contained" size="small" sx={{ m: 1 }}>Send Answer</Button>
                            : null
                        }
                    </div>
                </Box>}
        </>
    )
}

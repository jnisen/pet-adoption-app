//React
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/axios';
import { petAdoptionContext } from '../content/petAdoptionContext';


//Materia Ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


export default function Messages() {

    const [messages, setMessages] = useState('')
    const {currentUser} = useContext(petAdoptionContext)
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        async function getMessage() {
            setLoading(true)
            const response = await clientAxios.get(`/users/getMessages/${currentUser.userId}`, { withCredentials: true })
            if (currentUser.role === 'admin') {
                setMessages(response.data.messages)
            } else {
                setMessages(response.data.messages.filter(message => message.userId === currentUser.userId))
            }
            setLoading(false)
        }
        getMessage()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading ?  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <div className="loadingPage">
                        <div className="center_progress">
                            <CircularProgress />
                        </div>
                        <Typography variant="h5" sx={{ color: 'black' }} >Loading Page...</Typography>
                    </div>
                </Stack> :
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '11px' }}>
                        <Box style={{ width: '80%', typography: 'body1' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nro #</TableCell>
                                            {currentUser.role === 'admin' ?
                                                <>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell >E-mail</TableCell>
                                                </> : null
                                            }
                                            <TableCell >Subject</TableCell>
                                            <TableCell >Status</TableCell>
                                            <TableCell >Date</TableCell>
                                            <TableCell >Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages && messages.map((message, index) => (
                                            <TableRow
                                                key={message._id}
                                                className={message.status === 'in progress' ? 'table-red' : 'table-green'}
                                                onClick={() => navigate(`/message/${message._id}`)}
                                            >
                                                <TableCell>{messages.length - index}</TableCell>
                                                {currentUser.role === 'admin' ?
                                                    <>
                                                        <TableCell>{message.name}</TableCell>
                                                        <TableCell >{message.email}</TableCell>
                                                    </> : null}

                                                <TableCell >{message.subject}</TableCell>
                                                <TableCell >{message.status}</TableCell>
                                                <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(message.createdAt).toLocaleTimeString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </>

            }
            {currentUser.role === 'public' ?
                <div align="center" style = {{marginTop: '10px'}}>
                    <Button variant="contained" color="primary" size="small" className="btn-back" onClick={() => navigate(-1)}>Back</Button>
                </div>
                : null}
        </>
    )
}

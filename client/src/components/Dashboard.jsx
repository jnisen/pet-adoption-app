import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import clientAxios from '../config/axios'
import { petAdoptionContext } from '../content/petAdoptionContext';

function createDataUser(id, firstName, lastName, email, phoneNumber, bio, role) {
    return { id, firstName, lastName, email, phoneNumber, bio, role };
}

export default function Dashboard() {

    const [users, setUsers] = useState([])
    const [loadingUser, setLoadingUser] = useState(true)
    const { setBack, pets } = useContext(petAdoptionContext)
    let navigate = useNavigate();

    useEffect(() => {
        async function getUsers() {
            setBack(window.location.href.substring(window.location.href.lastIndexOf('/')));
            setLoadingUser(true)
            setTimeout(async () => {
                const response = await clientAxios.get('/users/getAllUsers', { withCredentials: true })
                const tempRows = []

                response.data.forEach(user => {
                    const { _id, firstName, lastName, email, phoneNumber, bio, role } = user
                    tempRows.push(createDataUser(_id, firstName, lastName, email, phoneNumber, bio, role))

                });
                setUsers(tempRows)
                setLoadingUser(false)
            }, 2000)

        }

        getUsers()

    }, [])


    return (
        <>
            {loadingUser ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="secondary" />
                    <Typography variant="h5" align="center" sx={{ m: 2 }}>Loading Dashboard</Typography>
                </Box> :
                <>
                    <Typography variant="h5" align="center" sx={{ m: 2 }}>Users</Typography>
                    <TableContainer component={Paper} sx={{ maxWidth: 'max-content', margin: 'auto', padding: '1px' }}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead className="tableheader">
                                <TableRow >
                                    <TableCell align="center">First Name</TableCell>
                                    <TableCell align="center">Last Name</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Phone Number</TableCell>
                                    <TableCell align="center">Bio</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {users.map((user) => (
                                    <TableRow className="tableusers"
                                        key={user.id} onClick={() => navigate(user.role === 'admin' ? `/dashboard` : `/petusers/${user.id}`)}
                                    >
                                        <TableCell align="center">{user.firstName}</TableCell>
                                        <TableCell align="center">{user.lastName}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.phoneNumber}</TableCell>
                                        <TableCell align="center">{user.bio}</TableCell>
                                        <TableCell align="center">{user.role}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h5" align="center" sx={{ m: 2 }}>Pets</Typography>
                    <TableContainer component={Paper} sx={{ maxWidth: 'max-content', margin: 'auto', padding: '1px' }}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead className="tableheaderPets">
                                <TableRow >
                                    <TableCell align="center">Picture</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Breed</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pets.map((pet) => (
                                    <TableRow className="tableusers"
                                        key={pet._id} onClick={() => navigate(`/petdetail/pet/${pet._id}`)}
                                    >
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={2}>
                                                <Avatar alt="Remy Sharp" src={pet.picture} />
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">{pet.type}</TableCell>
                                        <TableCell align="center">{pet.name}</TableCell>
                                        <TableCell align="center">{pet.breed}</TableCell>
                                        <TableCell align="center">{pet.status}</TableCell>
                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> </>

            }

        </>

    )
}

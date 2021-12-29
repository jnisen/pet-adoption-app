//React
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { petAdoptionContext } from '../content/petAdoptionContext';

//Material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


//Components
import Messages from './Messages'

//Axios
import clientAxios from '../config/axios'



export default function Dashboard() {

    let navigate = useNavigate();

    const { pets, loading, setLoading, signUp} = useContext(petAdoptionContext)

    const [users, setUsers] = useState([])
    const [value, setValue] = useState('user')


    useEffect(() => {
        async function getUsers() {
            setLoading(true)
            const response = await clientAxios.get('/users/getAllUsers', { withCredentials: true })
            setUsers(response.data)
            // const tempRows = []
            // response.data.forEach(user => {
            //     // if (user.role === 'admin' || (user.role === 'public' && user.adoptedFosterPets.length)) {
            //     const { _id, firstName, lastName, email, phoneNumber, bio, adoptedFosterPets, role } = user
            //     const pets = adoptedFosterPets === undefined ? '-' : adoptedFosterPets.length
            //     tempRows.push(createDataUser(_id, firstName, lastName, email, phoneNumber, bio, pets, role))
            //     //}
            // });
            // setUsers(tempRows)
            setLoading(false)
        }
        getUsers()
        // eslint-disable-next-line
    }, [setUsers])

    useEffect(() => {
        async function getRole() {
            const responseAuth = await clientAxios.get('/users/authUser', { withCredentials: true })
            if (responseAuth.data.role !== 'admin') {
                alert('You arent an Admin, not allowed to access this page')
                navigate('/home')
            }
        }
        getRole()
        // eslint-disable-next-line
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMakeAdmin = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await clientAxios.put(`/users/makeAdmin/${id}`, {}, { withCredentials: true })
            setUsers(response.data)

        } catch (e) {
            alert(e.response)
        }

    }

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="secondary" />
                    <Typography variant="h5" align="center" sx={{ m: 2 }}>Loading Dashboard</Typography>
                </Box> :
                <>
                    <Typography variant="h5" align="center" sx={{ m: 2 }}>Dashboard</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: '80%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="user" value="user" />
                                        <Tab label="pets" value="pets" />
                                        <Tab label="messages" value="messages" />
                                    </TabList>
                                </Box>
                                <TabPanel value="user">
                                    <TableContainer component={Paper} sx={{ maxWidth: 'max-content', margin: 'auto', padding: '1px' }}>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead className="tableheader">
                                                <TableRow >
                                                    <TableCell align="center">First Name</TableCell>
                                                    <TableCell align="center">Last Name</TableCell>
                                                    <TableCell align="center">E-mail</TableCell>
                                                    <TableCell align="center">Phone Number</TableCell>
                                                    <TableCell align="center">Pets</TableCell>
                                                    <TableCell align="center">Role</TableCell>
                                                    {signUp.email === 'admin@admin.com' ? <TableCell align="center"><AdminPanelSettingsIcon/></TableCell> : null}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users && users.map((user) => (
                                                    <TableRow className="tableusers"
                                                        key={user._id} onClick={() => navigate(user.role === 'admin' ? `/dashboard` : `/petusers/${user._id}`)}
                                                    >
                                                        <TableCell align="center">{user.firstName}</TableCell>
                                                        <TableCell align="center">{user.lastName}</TableCell>
                                                        <TableCell align="center">{user.email}</TableCell>
                                                        <TableCell align="center">{user.phoneNumber}</TableCell>
                                                        <TableCell align="center">{user.adoptedFosterPets === undefined ? '-' : user.adoptedFosterPets.length}</TableCell>
                                                        <TableCell align="center">{user.role}</TableCell>
                                                        {signUp.email === 'admin@admin.com' ?
                                                            <TableCell align="center">{(user.adoptedFosterPets && user.adoptedFosterPets.length > 0) || (user.role === 'admin') ? null : <Button onClick={(e) => handleMakeAdmin(e, user._id)}>Make Admin</Button>}</TableCell>
                                                            : null}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel value="pets">
                                    <TableContainer component={Paper} sx={{ maxWidth: 'max-content', margin: 'auto', padding: '1px' }}>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead className="tableheaderPets">
                                                <TableRow >
                                                    <TableCell align="center">Pet Picture</TableCell>
                                                    <TableCell align="center">Type</TableCell>
                                                    <TableCell align="center">Name</TableCell>
                                                    <TableCell align="center">Breed</TableCell>
                                                    <TableCell align="center">Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pets && pets.filter(pet => pet.status === 'Available').map((pet) => (
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
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel value="messages">
                                    <Messages />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </>
            }

        </>

    )
}

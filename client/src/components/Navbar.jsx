import { useContext, useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Modal from 'react-modal';

import Login from './modals/Login'
import SignUp from './modals/Signup'

import { petAdoptionContext } from '../content/petAdoptionContext';
import { Typography } from '@mui/material';

import Cookies from 'js-cookie'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')

export default function Navbar() {

    const {
        loginModal,
        setLoginModal,
        signUpModal,
        setSignUpModal, currentUser, setCurrentUser, setSignUp } = useContext(petAdoptionContext)

    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogOut() {
        Cookies.remove('token');
        setCurrentUser(null)
        navigate('/')
        setSignUp({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
    }

    return (
        <Box>
            <AppBar position="static" style={{ background: '#F8EEEE', height: '12vh' }} >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>

                    <div>
                        <div className="navbar-left">
                            <img src="/images/patita.png" alt="animal" style={{ width: '18%' }} />
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2, color: '#6A4770' }}
                                onClick={handleClick}
                            >
                                <MenuIcon />

                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                <MenuItem onClick={handleClose} component={NavLink} to={'/home'} style={{ textDecoration: 'none' }} > <HomeIcon />Pet Page</MenuItem>
                                <MenuItem onClick={handleClose} component={NavLink} to={'/search'} style={{ textDecoration: 'none' }}><SearchIcon /> Search</MenuItem>

                                {currentUser ?
                                    <div>
                                        <MenuItem onClick={handleClose} component={NavLink} to={`/profile/user/${currentUser.userId}`} style={{ textDecoration: 'none' }}><PersonIcon />Profile</MenuItem>
                                    </div> : null
                                }

                                {currentUser && currentUser.role === 'public' ?
                                    <div>
                                         <MenuItem onClick={handleClose} component={NavLink} to={'/mypets'} style={{ textDecoration: 'none' }}><PetsIcon />My Pets</MenuItem>
                                    </div>: null
                                }

                                {currentUser && currentUser.role === 'admin' ?
                                    <div>
                                        <MenuItem onClick={handleClose} component={NavLink} to={'/addpet'} style={{ textDecoration: 'none' }}><AddIcon />Add Pet</MenuItem>
                                        <MenuItem onClick={handleClose} component={NavLink} to={'/dashboard'} style={{ textDecoration: 'none' }}><DashboardIcon />Dashboard</MenuItem>
                                    </div> : null
                                }
                            </Menu>

                        </div>


                    </div>
                    <div className="navbar-center">
                        <Typography sx={{ color: '#6A4770'}} align="center">Every pet needs a home</Typography>
                        <img src="/images/pet-navbar.png" alt="animal" style={{ width: '15%' }} />
                    </div>
                    <div className="navbar-right">
                        {currentUser ?

                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Typography sx={{ color: '#6A4770', mr: 2 }}>Welcome {currentUser.firstName} {currentUser.lastName}</Typography>
                                <Button color="inherit" sx={{ background: '#6A4770' }} onClick={handleLogOut}>Log out</Button>
                            </div>
                            :
                            <>
                                <Button color="inherit" sx={{ background: '#6A4770', mr: 2 }} onClick={() => setLoginModal(!loginModal)}>Login</Button>
                                <Modal
                                    isOpen={loginModal}
                                    onRequestClose={() => setLoginModal(!loginModal)}
                                    style={customStyles}
                                   
                                >
                                    <Login />
                                </Modal>
                                <Button color="inherit" sx={{ background: '#6A4770'}} style={{padding: '5px 1.5px' }} onClick={() => setSignUpModal(!signUpModal)}>Sign Up</Button>
                                <Modal
                                    isOpen={signUpModal}
                                    onRequestClose={() => setSignUpModal(!signUpModal)}
                                    style={customStyles}
                                    
                                >
                                    <SignUp />
                                </Modal>
                            </>

                        }</div>
                </Toolbar>
            </AppBar>
        </Box >
    );

}

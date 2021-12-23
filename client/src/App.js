import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import Logout from './components/Home'
import Homepage from './components/Home'
import Search from './components/Search'
import Profile from './components/Profile'
import MyPets from './components/MyPets'
import AddPet from './components/AddPet'
import PetDetails from './components/PetDetails'
import Dashboard from './components/Dashboard'
import PetUser from './components/PetUser'
import EditPet from './components/EditPet'

import { petAdoptionContext } from './content/petAdoptionContext'
import { useState, useEffect } from 'react'
import PrivateRoute from './components/PrivateRoute'

import clientAxios from './config/axios'
import Cookies from 'js-cookie'

function App() {


  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [petDetail, setPetDetail] = useState('')

  const [phone, setPhone] = useState({ phoneNumber: '' })
  const [signUp, setSignUp] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })

  const [pets, setPets] = useState([])

  const [back, setBack] = useState('')

  const cookie = Cookies.get('token')

  // useEffect(() => {
  //   async function getCurrentUser() {
  //     if (cookie) {
  //       console.log('ab')
  //       const response = await clientAxios.get('/users/authUser', { withCredentials: true })
  //       console.log(response)
  //       setCurrentUser(response.data)
  //     }

  //   }
  //   getCurrentUser()
  // }, [])


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


  const value = {
    loginModal,
    setLoginModal,
    signUpModal,
    setSignUpModal,
    currentUser,
    setCurrentUser,
    pets,
    setPets,
    phone,
    setPhone,
    signUp,
    setSignUp,
    handleOnChange,
    handleChange,
    back,
    setBack,
    petDetail,
    setPetDetail
  }

  return (
    <petAdoptionContext.Provider value={value} >
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Logout />} />
        <Route exact path='/home' element={<PrivateRoute component={Homepage} />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/profile/user/:id' element={<Profile />} />
        <Route exact path='/mypets' element={<MyPets />} />
        <Route exact path='/addpet/' element={<AddPet />} />
        <Route exact path='/editpet/:id' element={<EditPet />} />
        <Route exact path='/petdetail/pet/:id' element={<PetDetails />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/petusers/:id' element={<PetUser />} />
      </Routes>
    </petAdoptionContext.Provider >

  );
}

export default App;

//https://www.youtube.com/watch?v=YPgMnugXBJo
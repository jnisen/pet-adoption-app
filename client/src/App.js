//React
import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { petAdoptionContext } from './content/petAdoptionContext'

//Components
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
import NotFound from './components/NotFound'
import Contact from './components/Contact'
import Messages from './components/Messages'
import Message from './components/Message'
import PrivateRoute from './components/PrivateRoute'

//axios
import clientAxios from './config/axios'

//cookies
import Cookies from 'js-cookie'

//Swal
import swal from 'sweetalert'

function App() {

  let navigate = useNavigate();

  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('')
  const [petDetail, setPetDetail] = useState('')
  const [loadingPage, setLoadingPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const [phone, setPhone] = useState({ phoneNumber: '' })
  const [signUp, setSignUp] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  const [getIn, setGetIn] = useState(0)
  const [pets, setPets] = useState([])

  const cookie = Cookies.get('token')

  useEffect(() => {
    async function getCurrentUser() {
      setLoadingPage(false)
      if (cookie) {
        const responseAuth = await clientAxios.get('/users/authUser', { withCredentials: true })
        setCurrentUser(responseAuth.data)
        const response = await clientAxios.get(`/users/getUser/${responseAuth.data.userId}`, { withCredentials: true })
        setSignUp(response.data.user)
        setGetIn(1)
        swal({
          title: `Login Success`,
          icon: "success",
          button: "OK",
        });
      }
      if (!cookie && getIn === 1) {
        setCurrentUser(null)
        navigate('/')
        setSignUp({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
        swal({
          title: 'Login Expired',
          icon: "error",
          button: "Ok",
        });
        setGetIn(0)
      }
     
      setLoadingPage(true)
    }
    getCurrentUser()
    // eslint-disable-next-line
  }, [cookie]);

  useEffect(() => {
    async function getAllPets() {
      const response = await clientAxios.get('/pets/getAllPets', { withCredentials: true })
      setPets(response.data)
    } getAllPets();
    // eslint-disable-next-line
  }, [pets])


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
    petDetail,
    setPetDetail,
    loadingPage,
    setLoadingPage,
    loading,
    setLoading
  }

  return (
    <petAdoptionContext.Provider value={value} >
      {loadingPage ?
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Logout />} />
            <Route exact path='/home' element={<Homepage />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/profile/user/:id' element={<PrivateRoute component={Profile} />} />
            <Route exact path='/mypets' element={<PrivateRoute component={MyPets} />} />
            <Route exact path='/addpet/' element={<PrivateRoute component={AddPet} />} />
            <Route exact path='/editpet/:id' element={<PrivateRoute component={EditPet} />} />
            <Route exact path='/petdetail/pet/:id' element={<PrivateRoute component={PetDetails} />} />
            <Route exact path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
            <Route exact path='/petusers/:id' element={<PrivateRoute component={PetUser} />} />
            <Route exact path='/contact' element={<PrivateRoute component={Contact} />} />
            <Route exact path='/messages' element={<PrivateRoute component={Messages} />} />
            <Route exact path='/message/:id' element={<PrivateRoute component={Message} />} />
            <Route path="/404" exact element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </> :
        <div className="loadingPage">
          <img src="https://francuskimiroslav.github.io/DobraNadaAnimalShelter/assets/images/loading(1).gif" alt="loading app" width={400} />
        </div>}
    </petAdoptionContext.Provider >

  );
}

export default App;

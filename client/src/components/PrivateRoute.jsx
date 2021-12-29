//React
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

//Cookies
import Cookies from 'js-cookie'

//Swal
import swal from 'sweetalert'

export default function PrivateRoute({ component: Component }) {

    const [token, setToken] = useState('')

    const cookie = Cookies.get('token')


    useEffect(() => {

        if (!cookie) {
            swal({
                title: `You have to login first`,
                icon: "error",
                button: "Ok",
            });
            setToken(cookie)
        }

        // eslint-disable-next-line
    }, [])

    return <>{cookie ? <Component /> : <Navigate to='/' />}</>

}

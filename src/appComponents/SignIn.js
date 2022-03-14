import React, {useState, useEffect} from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
const axios = require('axios')


const SignIn = ({ userData, setUserData, isLoggedIn, setIsLoggedIn }) => {
    
    const clientId = '996392350039-i5cvbfm256vdifleehi4j375nh164lk5.apps.googleusercontent.com'
    const [showLoginButton, setShowLoginButton] = useState(true)
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const navigate = useNavigate()
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "https://denisse-app-backend.herokuapp.com/"}

    const createUser = async () => {
        const userInfo = {
            firstName: userData.givenName,
            lastName: userData.familyName,
            email: userData.email,
            googleId: userData.googleId,
            profilePicturePath: userData.imageUrl,
        }
        const result = await axios.post('https://denisse-app-backend.herokuapp.com/api/users/createUser', userInfo, { headers: headers})
        return result.data
    }

    const onLoginSuccess = async (res) => {
        setUserData(res.profileObj)
        setShowLoginButton(false)
        setShowLogoutButton(true)
        setIsLoggedIn(true)
        navigate("/appointment")
    }

    const onLoginFailure = (res) => {
        console.log('login failed', res)
    }

    const onLogoutSuccess = () => {
        alert('logout success')
        setShowLoginButton(true)
        setShowLogoutButton(false)
        setIsLoggedIn(false)
    }

    useEffect(() => {
        createUser()
    }, [onLoginSuccess])

    return ( 
        <div className="sign-in">
            {showLoginButton ? 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                SameSite="None"
                isSignedIn={true}
                accesstype= 'offline'
            />  : null} 
        </div>
     )
}
 
export default SignIn

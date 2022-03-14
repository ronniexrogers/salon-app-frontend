import { Link } from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { useState } from "react"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"

const Nav = ({ userData, setIsLoggedIn, isLoggedIn }) => {
    const [showLogoutButton, setShowLogoutButton] = useState(false)
    const clientId = '996392350039-hntcggummele2vi5oam219mnqu1gq8a6.apps.googleusercontent.com'
    const navigate = useNavigate()
    const modal = document.querySelector('.loggedout-modal')

    const onLogoutSuccess = () => {
        setShowLogoutButton(false)
        setIsLoggedIn(false)
        modal.style.display = "block"
    }

    const handleCloseModal = () => {
        modal.style.display = "none"
        navigate('/')
      }

    if(isLoggedIn){
        return ( 
            <div className="nav">
                <nav>
                    Hi, {userData.name}! 
                    <Link to="/"> Home </Link> |
                    <Link to="/appointment"> Book an Appointment </Link> |
                    <Link to="/gallery"> Gallery </Link> |
                    <Link to="/about"> About </Link> |
                    <Link to="/contact"> Contact Me </Link> |
                    <Link to="/myProfile"> My Profile</Link> |
                    {isLoggedIn ? 
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Sign Out"
                        onLogoutSuccess={onLogoutSuccess}
                        SameSite="None"
                        render={renderProps => (
                            <Link to="/" label='Sign Out' onClick={renderProps.onClick} disabled={renderProps.disabled}> Sign Out</Link>
                          )}
                    /> : null}
                </nav>
                <div className="loggedout-modal">
                    Succesfully logged out!
                    <button onClick={() => handleCloseModal()}>Close</button>
                </div>
            </div>
         )
    }
    return ( 
        <div className="nav">
            <nav>
                <Link to="/">Home </Link> |
                <Link to="/appointment"> Book an Appointment </Link> |
                <Link to="/gallery"> Gallery </Link> |
                <Link to="/about"> About </Link> |
                <Link to="/contact"> Contact Me </Link>
            </nav>
        </div>
     )
}
 
export default Nav

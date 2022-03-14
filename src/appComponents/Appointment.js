import AppointmentCreate from './AppointmentCreate'
import { Link } from "react-router-dom"
import Footer from './Footer'


const Appointment = ({ userData, isLoggedIn }) => {

    if (isLoggedIn) {
    return ( 
        <div className="appointment">
            <AppointmentCreate userData={ userData } />
            <Footer />
        </div>
     ) }

     return (
         <div>
             You need to <Link to="/signin">sign in</Link> first!
             <Footer />
         </div>
     )
}

export default Appointment
import { Link } from "react-router-dom";

const Nav = () => {
    return ( 
        <div className="nav">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/appointment">Create Appointment</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/signin">Sign In</Link>
            </nav>
        </div>
     );
}
 
export default Nav;

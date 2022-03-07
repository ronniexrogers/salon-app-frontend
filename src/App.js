import {Route, Routes } from 'react-router-dom'
import './appComponents/CSS/App.css'
import Nav from './appComponents/Nav'
import Home from './appComponents/Home'
import SignIn from './appComponents/SignIn'
import Gallery from './appComponents/Gallery'
import Appointment from './appComponents/Appointment'
import About from './appComponents/About'
import Contact from './appComponents/Contact'


const App = () => {

  return (
    <div className="App">
      I'm the app
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
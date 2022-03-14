import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const axios = require('axios')

const MyProfile = ({ dataFromDB }) => {
    const [appointments, setAppointments] = useState([])
    const [description, setDescription] = useState(null)
    const [type, setType] = useState(null)
    const [images, setImages] = useState([])
    const [file, setFile] = useState()
    const [pastAppointments, setPastAppointments] = useState([])
    const [futureAppointments, setFutureAppointments] = useState([])
    const todaysDate = new Date().valueOf()


    const handleDeleteOne = (id) => {
        axios.delete(`https://denisse-app-backend.herokuapp.com/api/appointments/${id}`)
    }

    useEffect(() => {
        axios.get(`https://denisse-app-backend.herokuapp.com/api/appointments`)
        .then ((res) => {
            setAppointments(res.data)
        })
    }, [])

    const postImage = async ({image, description}) => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("description", description)
        formData.append("type", type)
        const result = await axios.post('https://denisse-app-backend.herokuapp.com/api/salonPhotos', formData, { 
            headers: {
                'Content-Type': 'multipart/form-data'}})
        return result.data
      }

    const submit = async (e) => {
        e.preventDefault()
        const result = await postImage({image: file, description})
        setImages([result, ...images])
      }
      const fileSelected = (e) => {
        const file = e.target.files[0]
            setFile(file)
        }

    useEffect(() => {
        setFutureAppointments(appointments.filter(appointment => Date.parse(appointment.date) > todaysDate))
        setPastAppointments(appointments.filter(appointment => Date.parse(appointment.date) < todaysDate))
    }, [appointments]) 
    
    if(!dataFromDB) return (<p>oopsie, what're ya doin here?! You need to <Link to="/signin">sign in</Link> first!</p>)

    else if(dataFromDB.googleId === '114694917534994982394' || '110622259906074900624') {


        return (
            <div className="my-profile">
                <h1>Admin Dashboard</h1>
                <div className="admin-upload-div">
                    <h2>Upload to Gallery</h2>
                    <form id="admin-upload" onSubmit={submit}>
                    <h4>Description of service</h4>
                    <input required={true} className="input-text" placeholder='Description of photo' onChange={e => setDescription(e.target.value)} type="text"></input>
                    <h4>Type of service</h4>
                    <select required={true}>
                        <option value="hair">Hair</option>
                        <option value="nails">Nails</option>
                    </select>
                    <h4>Select image</h4>
                    <input required={true} id="salon-image-input" onChange={fileSelected} type="file" accept="image/*"></input>
                    <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="all-appointments-div">

                <div className="future-appointments-div">
                <h2>Upcoming Appointments</h2>
                { futureAppointments ? futureAppointments.sort((a, b) => {
                return Date.parse(a.date) - Date.parse(b.date)
                }).map(appointment => (
                    <div key={appointment._id} className="single-appointment-div">
                        <ul>
                        <li>{appointment.date}</li>
                        <li>{appointment.name}</li>
                        <li>{appointment.number}</li>
                        <li>{appointment.description}</li>
                        <img src={appointment.imagePath} alt="appointment inspiration" />
                        <button onClick={() => handleDeleteOne(appointment._id)}>Delete Appointment</button>
                        </ul>
                    </div>

                )) : <p>No upcoming appointments!</p>}
                </div>
                <div className="past-appointments-div">
                <h2>Previous Appointments</h2>
                { pastAppointments ? pastAppointments.sort((a, b) => {
                return  Date.parse(b.date) - Date.parse(a.date)
                }).map(appointment => (
                    <div key={appointment._id} className="single-appointment-div">
                        <ul>
                        <li>{appointment.date}</li>
                        <li>{appointment.name}</li>
                        <li>{appointment.number}</li>
                        <li>{appointment.description}</li>
                        <img src={appointment.imagePath} alt="appointment inspiration" />
                        <button onClick={() => handleDeleteOne(appointment._id)}>Delete Appointment</button>
                        </ul>
                    </div>

                )) : <p>No past appointments!</p>}
                </div>
                    
                </div>
            <Footer />
            </div>
        )
    }
    else 
    return ( 
        <div className="my-profile">
            Hello, {dataFromDB.firstName}!
            <img className="profile-picture" src={dataFromDB.profilePicturePath} alt="profile" />
            <Footer />
        </div>
     )
}

export default MyProfile
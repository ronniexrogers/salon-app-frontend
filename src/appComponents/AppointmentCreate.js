import { useState } from 'react'
import axios from 'axios'
import './CSS/App.css'
import DateTimePicker from 'react-datetime-picker'
import { useNavigate } from 'react-router-dom'


const AppointmentCreate = ({ userData }) => {

    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [clientName, setClientName] = useState("")
    const [number, setNumber] = useState("")
    const [images, setImages] = useState([])
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const modal = document.querySelector('.appointment-modal')
    const navigate = useNavigate()

    const postImage = async ({image, description, clientName, number, appointmentDate}) => {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("description", description)
      formData.append("clientName", clientName)
      formData.append("number", number)
      formData.append("date", appointmentDate)
      try {
        const result = await axios.post('https://denisse-app-backend.herokuapp.com/api/appointments/createAppointment', formData, { 
          headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'}})
        return result.data 
      } catch(err) {
        alert(err)
      }
    }
  
    const submit = async (e) => {
      e.preventDefault()
      const result = await postImage({image: file, description, clientName, number, appointmentDate})
      setImages([result, ...images])
    }
    const fileSelected = (e) => {
      const file = e.target.files[0]
          setFile(file)
      }
    const resetForm = () => {
      document.getElementById('client-image-input').value=(null)
      document.querySelectorAll('.input-text').value=('')
      modal.style.display = "block"
    }
    const handleChange = (event) => {
        event.target.name==="name" 
      ? setClientName(event.target.value)
      : event.target.name==="number" 
      ? setNumber(event.target.value)
      : event.target.name==="description" 
      ? setDescription(event.target.value)
      : console.log("error")
    }

    const handleCloseModal = () => {
      modal.style.display = "none"
      navigate('/')
    }

    return ( 
        <div>
            <form id="clientUpload" onSubmit={submit}>
                <DateTimePicker 
                  onChange={setAppointmentDate} 
                  value={appointmentDate} 
                />
                <input 
                  className="input-text" 
                  name="name"
                  placeholder='Name' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </input>
                <input 
                  name="number"
                  className="input-text" 
                  placeholder='Phone Number' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </input>
                <input 
                  name="description"
                  className="input-text" 
                  placeholder='Description of Service' 
                  onChange={e => handleChange(e)} 
                  type="text">
                </input>
                <input 
                  id="client-image-input" 
                  onChange={fileSelected} 
                  type="file" 
                  accept="image/*">
                </input>
                <button 
                  onClick={() => resetForm()} 
                  type="submit"
                  >Submit
                </button>
            </form>
          <div className="appointment-modal">
            Thanks for booking with me! I'll be in touch soon to confirm your appointment.
            <button onClick={() => handleCloseModal()}>Close</button>
          </div>
      </div>
     )
}
 
export default AppointmentCreate
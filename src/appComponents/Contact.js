import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
const axios = require('axios')

const Contact = () => {
    const formId = 'oiGzOy4X'
    const formSparkUrl = `https://submit-form.com/${formId}`
    const recaptchaKey = '6Lc8OM0eAAAAAAiIrWubEZ1pwbl9HaPtinQLrS0N'
    const recaptchaRef = useRef()
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const modal = document.querySelector('.contact-modal')
    const navigate = useNavigate()

    const updateRecaptchaToken = (token) => {
        setRecaptchaToken(token)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await postSubmission()
    }

    const postSubmission = async () => {
        const formData = {
            name: name,
            email: email,
            phoneNumber: number,
            message: message,
            "g-recaptcha-response": recaptchaToken
        }
        try {
            await axios.post(formSparkUrl, formData)
            recaptchaRef.current.reset()
            modal.style.display = "block"
        }catch(err) {
            alert(err)
        }
    }

    const handleCloseModal = () => {
        modal.style.display = "none"
        navigate('/')
      }

    return ( 
        <div className="contact-form">
            <h1 className="contact-form-header">Contact Me</h1>
            <form onSubmit={ handleSubmit }>
                <input type="text" required={true} name="name" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                <input type="text" required={true} name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text" required={true} name="number" placeholder="Number" onChange={(e) => setNumber(e.target.value)}></input>
                <input type="text" required={true} name="message" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></input>
                <ReCAPTCHA 
                ref={recaptchaRef}
                sitekey={recaptchaKey}
                onChange={updateRecaptchaToken}
                />
                <button type="submit">Submit</button>
            </form>
            <div className="contact-modal">
                Thanks for contacting me! I'll be in touch soon.
                <button onClick={() => handleCloseModal()}>Close</button>
            </div>
            <Footer />
        </div>
     )
}
 
export default Contact
import { useEffect, useState } from "react"
import Footer from "./Footer"
const axios = require('axios')

const Gallery = () => {

    const [hairPhotos, setHairPhotos] = useState([])
    const [nailPhotos, setNailPhotos] = useState([])
    const [allPhotos, setAllPhotos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5001/api/salonPhotos`)
        .then ((res) => {
            setAllPhotos(res.data)
        })
    }, [])

    useEffect(() => {
        setHairPhotos(allPhotos.filter(photo => (
            photo.type === 'hair'
        )))

        setNailPhotos(allPhotos.filter(photo => (
            photo.type === 'nails'
        )))
    }, [allPhotos])


    if(!allPhotos) return (<p>loading...</p>)
    else
    return ( 
        <div className="gallery">
            <h1>Gallery</h1>
            <div className="hair-gallery">
                <h3>Hair</h3>
                {
                    hairPhotos.map(photo => (
                        <img key={photo._id} src={photo.imagePath} alt={photo.description} />
                    ))
                }
            </div>

            <div className="nail-gallery">
                <h3>Nails</h3>
                {
                    nailPhotos.map(photo => (
                        <img key={photo._id} src={photo.imagePath} alt={photo.description} />
                    ))
                }
            </div>
            <Footer />
        </div>
     )
}
 
export default Gallery
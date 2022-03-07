import Calendar from './Calendar';
import ImageUpload from './ImageUpload'

const Appointment = () => {
    return ( 
        <div className="appointment">
            yo, i'm the appointment component
            <Calendar />
            <ImageUpload />
        </div>
     );
}
 
export default Appointment;
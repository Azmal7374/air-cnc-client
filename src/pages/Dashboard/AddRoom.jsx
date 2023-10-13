import { useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvides";
import { addRoom } from "../../api/rooms";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [dates , setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })
    const [loading, setLoading] =useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

    const handleSubmit =(event) =>{
        event.preventDefault();

        const forms = event.target
        const location = forms.location.value
        const title = forms.title.value;
        const from =  dates.startDate;
        const to =  dates.endDate;
        const price = forms. price.value;
        const guest = forms.guest.value;
        const bedrooms = forms.bedrooms.value;
        const bathrooms = forms. bathrooms.value;
        const description = forms.description.value;
        const category = forms.category.value;
        const image  = forms.image.files[0];
        setUploadButtonText('Uploading...');
        // console.log(image)
        imageUpload(image)
        // console.log(image)
        .then(data => {
            const roomData ={
                location,
                 title,
                 from,
                 to,
                 price,
                 guest,
                 bedrooms,
                 bathrooms,
                 description,
                 category,
                image: data.data?.display_url,
                 host:{
                    name: user?.displayName,
                    image:user?.photoURL,
                    email:user?.email
                 },
               
            }
            //  console.log(location)
            //post room data to server
             addRoom(roomData)
             .then(data =>{
                setUploadButtonText('Uploaded!')
                setLoading(false)
                toast.success('Room Added Successfully')
                navigate('/dashboard/my-listings')
                console.log(data)
             })
             .catch(err => console.log(err))
            console.log(roomData)
            setLoading(false)

        })
        .catch(err =>{
            console.log(err.message)
            setLoading(false)
        })
     
    
    }

    const handleImageChange =(image) =>{
             setUploadButtonText(image.name);
    }

    const handleDates = (ranges) =>{
        setDates(ranges.selection)


    }
    return  <AddRoomForm handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} uploadButtonText={uploadButtonText} dates={dates} handleDates={handleDates}></AddRoomForm> 
    
};

export default AddRoom;
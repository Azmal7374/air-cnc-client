import { useContext, useState } from "react";
import Button from "../Button/Button";
import  Calender from '../Rooms/Calender.jsx'
import { formatDistance } from 'date-fns'
import { AuthContext } from "../../providers/AuthProvides";
import BookingModal from "../Modal/BookingModal";
import { addBooking, updateStatus } from "../../api/bookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomReservation = ({roomData}) => {
  // console.log(roomData)
  const [isOpen, setIsOpen]=useState(false)
  const {user, role} = useContext(AuthContext)
  const navigate = useNavigate()
console.log(roomData._id)
  //Price calculation
  const total_price = parseFloat(formatDistance(new Date(roomData.to), new Date(roomData.from)).split(' ')[0])*roomData.price
  // console.log(total_price)


  const [value, setValue] =useState({
    startDate: new Date(roomData.from),
    endDate: new Date(roomData.to),
    key:'selection'
  })


  //Booking States
  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name:user.displayName,
      email:user.email,
      image:user.photoURL,
    },
    host:roomData.host.email,
    location:roomData.location,
    price: total_price,
    to:value?.endDate,
    from:value?.startDate,
    title:roomData.title,
    roomId:roomData._id,
    image:roomData.image,
  })


  const handleSelect = (ranges) =>{
    setValue([...value])
  }


  const modalHandeler =() => {
    addBooking(bookingInfo)
        .then(data=> {
          console.log(data)
          updateStatus(roomData._id, true)
             .then(data=> {
              console.log(data)
              toast.success("Booking Successfully!");
              navigate('/dashboard/my-bookings')
              closeModal()
             })
             .catch(err =>console.log(err))
             

        })
        .catch(err =>{
          console.log(err)
          closeModal()
        })
     console.log(bookingInfo)
  }
 const closeModal = () =>{
     setIsOpen(false)
  }

    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
        <div className='flex flex-row items-center gap-1 p-4'>
          <div className='text-2xl font-semibold'>$ {roomData.price}</div>
          <div className='font-light text-neutral-600'>night</div>
        </div>
        <hr />
        <div className='flex justify-center'>
        <Calender handleSelect={handleSelect} value={value}></Calender>
        </div>
        <hr />
        <div className='p-4'>
          <Button onClick={() =>setIsOpen(true)} disabled={roomData.host.email === user.email || roomData.booked} label='Reserve' />
        </div>
        <hr />
        <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
          <div>Total</div>
          <div>$ {total_price}</div>
        </div>
        <BookingModal modalHandeler={modalHandeler} bookingInfo={bookingInfo} isOpen={isOpen} closeModal={closeModal}></BookingModal>

      </div>
    );
};

export default RoomReservation;

import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomeDetails from '../pages/RoomDetails/RoomeDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
// import AddRoomForm from '../components/Forms/AddRoomForm'
import AddRoom from '../pages/Dashboard/AddRoom'
import { getRoom } from '../api/rooms'
import MyBookings from '../pages/Dashboard/MyBookings'
import MyListings from '../pages/Dashboard/MyListiings'
import ManageBookings from '../pages/Dashboard/ManageBookings'
 
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path:'/room/:id',
        element:(<PrivateRoute>
        <RoomeDetails></RoomeDetails>
        </PrivateRoute>
        ),
        loader: ({params}) =>getRoom(params.id)

      },
      

    ],
  },
   {
    path: '/login',
    element:<Login></Login>
   },
   {
    path: '/signup',
    element:<SignUp></SignUp>   },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        { path: '/dashboard/', 
        element:  <MyBookings></MyBookings>
      },
        { path: '/dashboard/add-room', 
        element: <AddRoom></AddRoom> 
      },
      { path: '/dashboard/my-bookings', 
        element:  <MyBookings></MyBookings>
      },
      { path: '/dashboard/my-listings', 
      element:  <MyListings></MyListings>
    },
    { path: '/dashboard/manage-bookings', 
    element:   <ManageBookings></ManageBookings>
  },
      ],
    },
])
export const addRoom = async roomData =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`,{
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(roomData)
    })
    const data = await response.json()
     return data
}

// Get all rooms
export const getAllRooms = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
    const data = await response.json()
    return data
  }


  //Delete a room 

export const deleteRoom = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`,
    {
           method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
        })
    const data = await response.json()
    return data
  }



  // Get filtered rooms for hosts

export const getRooms = async email =>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${email}`,{
        headers: {
            authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
    })
    const data = await response.json()
     return data
}


// Get single rooms
export const getRoom = async id => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`)
    const data = await response.json()
    return data
  }





// Update Room

export const updateRoom = async (roomData,id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`,
    {
           method: 'PUT',
            headers: {
                'content-Type': 'application/json',
                authorization:`Bearer ${localStorage.getItem('access_token')}`

            },
            body: JSON.stringify(roomData)
        })
    const data = await response.json()
    return data
  }
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvides";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}`
})

const useAxiosSecure = () =>{
  const {logout} = useContext(AuthContext) 
  const navigate = useNavigate()
    useEffect(() =>{
        // 1.intercept request clicnet  -----> server

        axiosSecure.interceptors.request.use(config =>{
            const token = `Bearer ${localStorage.getItem('access_token')}`
            if(token){
                config.headers.Authorization =token
            } 
            return config
        })

        // 2.intercept response   client <------  server
        axiosSecure.interceptors.response.use((response)=> response, async error=>{
        
            if(error.response && error.response.status === 401 || error.response.status === 403){
                await logout()
                navigate('/login')
            }
            return Promise.reject(error)
          }
          )

    },[logout, navigate,axiosSecure])

    return [axiosSecure]
}
export default useAxiosSecure

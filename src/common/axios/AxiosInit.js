import axios from "axios";
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { GetObject } from "../utils/StorageObject";

const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function AxiosDefaults(resetUser){
  let jwt=GetObject('jwt')
  console.log('setAxiosDefaults')
  axios.defaults.headers.common["Authorization"]=`Bearer ${jwt}`;
  axios.defaults.headers.common["Content-Type"]= "application/json";
  axios.defaults.headers.common["Accept"]= "application/json";
  axios.defaults.baseURL = BASE_URL; 
  //axios.defaults.withCredentials = false;
  
 let refCount=0;

 axios.interceptors.request.use(async req => {
    let jwt=GetObject('jwt')
    let refreshToken=GetObject('refresh_token')

    if(!jwt){
      console.log('no jwt')
      return req
    }

    const user = jwt_decode(jwt)
    console.log(dayjs.unix(user.exp).diff(dayjs()) + ':' + req.url)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1500000;

    if(!isExpired) return req  

    const axiosInstance = axios.create({
      BASE_URL,
    });
    let response
    try{
         response = await axiosInstance.post(`/users/refresh_token`, {
                          "access_token":jwt,
                          "refresh_token": refreshToken
                        })
    }catch(err){
      console.log(err)
      if(err.response.data.message=='Expired token'){
        resetUser('Session expired! Please login!',"","")
        return req
      }
    }
    
    resetUser(user.data.email + ' : ' + refCount++,response.data.jwt,response.data.refresh_token) 
    axios.defaults.headers.common["Authorization"]=`Bearer ${response.data.jwt}`    
    req.headers.Authorization = `Bearer ${response.data.jwt}`

    return req                                 
  })

}


 

/*If needed : this makes all request unique so no browser cache is used 
config => {
        
        if (config.method == 'post') {
        
          config.data = {
        
            ...config.data,
            _t: Date.parse(new Date()) / 1000
          }
        } else if (config.method == 'get') {
        
          config.params = {
        
            _t: Date.parse(new Date()) / 1000,
            ...config.params
          }
        }
        return config
      }, function (error) {
        
        return Promise.reject(error)
      }

      */
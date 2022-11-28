import axios from "axios";
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function AxiosDefaults(jwt,refreshToken,resetUser,myInterceptor){

  console.log('setAxiosDefaults')
  axios.defaults.headers.common["Authorization"]=`Bearer ${jwt}`;
  axios.defaults.headers.common["Content-Type"]= "application/json";
  axios.defaults.headers.common["Accept"]= "application/json";
  axios.defaults.baseURL = BASE_URL; 
  //axios.defaults.withCredentials = false;
  
  if(myInterceptor.current){
    alert("eject")
    axios.interceptors.request.eject(myInterceptor.current);
  }
  myInterceptor.current=axios.interceptors.request.use(req => {
    console.log()
    if(!jwt){
      console.log('not jwt')
      return req
    }

    const user = jwt_decode(jwt)
    console.log(dayjs.unix(user.exp).diff(dayjs()) + ':' + req.url)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if(isExpired){
      const axiosInstance = axios.create({
        BASE_URL,
      });
  
      axiosInstance.post(`/users/refresh_token`, {
        "access_token":jwt,
        "refresh_token": refreshToken
      }).then(response=>{
                     console.log("refreshed")
                     resetUser('user refreshed',response.data.jwt,response.data.refresh_token) 
                    });
    }


    return req;

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
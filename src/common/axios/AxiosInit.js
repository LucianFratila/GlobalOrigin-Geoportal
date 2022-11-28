import axios from "axios"
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function AxiosInit(jwt,refreshToken,resetUser){

    alert(BASE_URL)  
    axios.defaults.withCredentials = false;
    axios.defaults.baseURL = BASE_URL; 
    //axios.defaults.headers.withCredentials=true;  
    //axios.defaults.headers.common["Jwt"] = jwt;
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwt}`;
    axios.defaults.headers.common["Content-Type"]= "application/json";
    axios.defaults.headers.common["Accept"]= "application/json";

    axios.interceptors.request.use(async req => {
        //console.log(req)
        const user = jwt_decode(jwt)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) {
          console.log('not expired')
          return req
        }
        else console.log('expired')
         
      const axiosInstance = axios.create({
        BASE_URL,
      });

      const response = await axiosInstance.post(`/users/refresh_token`, {
        "access_token":jwt,
        "refresh_token": refreshToken
      });
     // console.log(response)

      resetUser('user',response.data.jwt,response.data.refresh_token)
      axios.defaults.headers.common["Authorization"]=`Bearer ${response.data.jwt}`;

        return req
      }

      
    )
    axios.interceptors.response.use(function (response) {
      //const navigate = useNavigate();
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {

        //const navigate = useNavigate();
       // navigate("/login");
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

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
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function AxiosInit(apiServer,jwt){

    axios.defaults.withCredentials = false;
    axios.defaults.baseURL = apiServer; 
    //axios.defaults.headers.withCredentials=true;  
    //axios.defaults.headers.common["Jwt"] = jwt;
    //axios.defaults.headers.common["Authorization"]=`Bearer ${jwt}`
    //axios.defaults.headers.commo"["Content-Type"]= "application/json";
    //axios.defaults.headers.common["Accept"]= "application/json";

    axios.interceptors.request.use(
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

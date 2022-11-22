import axios from "axios"

export default function AxiosInit(apiServer,jwt){

    axios.defaults.withCredentials = false;
    axios.defaults.baseURL = apiServer; 
  //  axios.defaults.headers.withCredentials=true;  
    axios.defaults.headers.common["Jwt"] = jwt;

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

}

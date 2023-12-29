import axios from 'axios'
console.log(`API_URL:${process.env.REACT_APP_API_URL}`);
const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000000,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

const errorInterceptor = async (error) => {
    console.log('Error interceptor', error.response.status)
    if (error.response) {
        return Promise.reject(error)
    } else {
        if(typeof error == 'string') {
            console.error(error)
        } else {
            console.error(`errorInterceptor -> ${Object.keys(error)}`);
        }
    }
}


const responseInterceptor = (response) => {
    switch (response.status) {
        case 200:
        return response.data
    case 204:
        return response
    default:
        return response
    }
  }

service.interceptors.response.use(responseInterceptor, errorInterceptor)

export default service
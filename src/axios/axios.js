import axios from 'axios'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

http.interceptors.request.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
)


export default http;
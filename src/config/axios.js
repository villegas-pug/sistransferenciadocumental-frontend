import axios from 'axios'
export const api = axios.create({
   baseURL: "http://localhost:8080/",
   headers: {
      //'content-type': '*/*',
      //'Content-Type': 'multipart/form-data'
      //'Content-Type': 'application/json'
      //'content-type': 'application/json'
      //'Accept': 'application/json'
      //'Accept': 'application/json'
      'Content-Type': undefined
   }
})
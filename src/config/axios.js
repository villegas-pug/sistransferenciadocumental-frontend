import axios from 'axios'
import { END_POINT_BASE } from 'constants/endpointBase'
export const api = axios.create({
   baseURL: END_POINT_BASE,
   headers: {
      'Content-Type': 'application/json'
   }
})
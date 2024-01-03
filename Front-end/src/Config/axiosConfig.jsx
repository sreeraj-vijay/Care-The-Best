import axios from "axios"
const axiospath = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export {axiospath}

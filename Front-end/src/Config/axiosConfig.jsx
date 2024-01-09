import axios from "axios"
const axiospath = axios.create({
	baseURL: 'https://care-the-best.sreerajvijay.fyi',
  withCredentials: true,
});

export {axiospath}

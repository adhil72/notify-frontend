import axios from "axios";
const instance = axios.create({ baseURL: 'http://localhost:3001', headers: { token: localStorage.getItem("token") } })
export default instance
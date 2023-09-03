import axios from "axios";
const instance = axios.create({ baseURL: 'http://localhost:3001', headers: { token: JSON.parse(localStorage.getItem("token") as string) } })
export default instance
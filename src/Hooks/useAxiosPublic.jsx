import axios from "axios";

const axiosPublic = axios.create({
    // baseURL:'http://localhost:5000'
    baseURL:'https://heliverse-p-1-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
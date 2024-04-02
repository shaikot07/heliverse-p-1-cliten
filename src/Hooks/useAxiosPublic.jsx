import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'fjfjdsfh'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
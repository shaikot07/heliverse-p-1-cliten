
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const UseTeamData = () => {
    const axiosPublic= useAxiosPublic();
    const {user}=useAuth();
    // tanstack query 

    const {data:teamData=[],refetch}=useQuery({
        queryKey: ['teamData'], 
        queryFn: async ()=>{
            const res= await axiosPublic.get(`/team-data/user?email=${user.email}`)
            // console.log(res);
            return res.data
        }
    })
    return [teamData, refetch]
};

export default UseTeamData;


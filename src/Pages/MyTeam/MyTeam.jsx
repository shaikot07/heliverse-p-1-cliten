import Swal from "sweetalert2";
import UseTeamData from "../../Hooks/UseTeamData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const MyTeam = () => {
    const [teamData, refetch] = UseTeamData();
    const axiosPublic = useAxiosPublic()
    console.log(teamData);
    const deleteMemberFunc = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/team-data/${id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: ` task delete successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }
    return (
        <div className="w-3/4 p-4 mx-auto">
            <h3 className="text-3xl font-semibold py-3">My Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                {teamData.length === 0 ? (
                    <div>
                        <h2 className="text-2xl">Not member available</h2>
                        <Link to='/' className="bg-red-700 py-1 px-4  mt-4 ">Back to home </Link>
                    </div>
                ) : (
                    teamData.map(member => (
                        <div key={member?._id} className="max-w-[300px] md:w-[350px] bg-white p-2 md:p-1 shadow-md rounded-2xl space-y-8">
                            {/* profile image & bg  */}
                            <div className="relative">
                                <img className="w-full h-full rounded-2xl bg-gray-500" src="https://source.unsplash.com/350x150/?northern lights" alt="card navigate ui" />
                                <img className="w-[100px] h-[100px] absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-400 border border-white" src={member?.avatar} alt="card navigate ui" />
                            </div>
                            {/* profile name & role */}
                            <div className="pt-1 text-center space-y-1">
                                <h1 className="text-xl md:text-2xl">Name: {member?.first_name}</h1>
                                <p className="text-gray-400 text-sm">Name: {member?.first_name}</p>
                                <p className="text-gray-400 text-sm">Email: {member.email}</p>
                                <p className="text-gray-400 text-sm">Domain: {member.domain}</p>
                                <p className="text-gray-400 text-sm">Gender: {member.gender}</p>
                                <p className="text-gray-400 text-sm">Availability: {member.available ? 'Available' : 'Busy'}</p>
                            </div>
                            
                            <div className="text-center ">
                                <button onClick={() => deleteMemberFunc(member._id)} className="hover:bg-[#0F172A] hover:scale-95 font-medium hover:text-white w-[50%] py-2 rounded-full hover:shadow-xl text-gray-400 shadow-[0px_0px_10px_#E2DADA] t duration-500">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyTeam;
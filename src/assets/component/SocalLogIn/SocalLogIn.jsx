
import { FaGoogle } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const SocialLogin = () => {
      const { googleSignIn } = useAuth();
      const axiosPublic = useAxiosPublic();
      const navigate = useNavigate()
      const location = useLocation();
      const from = location.state?.from?.pathname || "/"

      const handleGoogleSignIn = () => {
            googleSignIn()
                  .then(result => {
                        // console.log(result.user);
                        const userInfo = {
                              email: result.user?.email,
                              name: result.user?.displayName,
                              status: 'normal',
                              subscription: null,
                              photo:result.user?.photoURL

                        }
                        axiosPublic.post('/users', userInfo)
                              .then(res => {
                                    console.log(res.data);
                                   
                                    navigate(from, { replace: true })
                              })
                  })
      }
      return (
            <div className="">
                  <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-[#131314] text-white hover:bg-slate-950">
                        {/* <FaGoogle className="mr-2"></FaGoogle> */}
                        <img className="w-10" src="../../../../public/google.png" alt="" />
                        Google
                  </button>
            </div>
      );
};

export default SocialLogin;
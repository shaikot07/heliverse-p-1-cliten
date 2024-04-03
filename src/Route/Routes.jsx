import {createBrowserRouter,} from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import LogIn from "../Pages/LogIn/LogIn";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import Home2 from "../Pages/Home/Home/Home2";
import MyTeam from "../Pages/MyTeam/MyTeam";
import ErrorPage from "../assets/component/ErrorPage";



export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
           
            element:<Home2></Home2>
        },
        {
            path:'my-task',
            element:<MyTeam></MyTeam>
        },
        {
            path:'login',
            element:<LogIn></LogIn>
        },
        {
            path:'register',
            element:<RegistrationPage></RegistrationPage>
        },
      ]
    },
  ]);
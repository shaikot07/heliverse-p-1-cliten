import {createBrowserRouter,} from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import Home2 from "../Pages/Home/Home/Home2";
import MyTeam from "../Pages/MyTeam/MyTeam";



export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      children:[
        {
            path:'/',
            // element:<Home></Home>
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
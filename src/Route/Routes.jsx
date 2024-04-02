import {createBrowserRouter,} from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";



export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      children:[
        {
            path:'/',
            element:<Home></Home>
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
import { createBrowserRouter, Router } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Room from "../pages/room/Room";
import About from "../pages/about/About";
import Services from "../components/Services/Services";
import Contact from "../components/Contact/Contact";
import NotFound404 from "../pages/NotFount404/NotFount404";
import Login from "../pages/LoginPage/Login";
import ProfilePage from "../pages/Profile/ProfilePage";
import Rooms from "../pages/room/Rooms";
import RoomDetails from "../pages/room/RoomDetails";

const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/room",
                element:<Room/>,
            },
            {
                path:"/rooms",
                element:<Rooms/>
            },
            {
                path:"/room-details/:id",
                element:<RoomDetails/>
            },
            {
                path:"/about",
                element:<About/>,
            },
            {
                path:"/services",
                element:<Services/>,
            },
            {
                path:"/contact",
                element:<Contact/>,
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/profile",
                element:<ProfilePage/>
            }
            
        ]
    },
    {
        path:"*",
        element:<NotFound404/>
    }
]);

export default router;
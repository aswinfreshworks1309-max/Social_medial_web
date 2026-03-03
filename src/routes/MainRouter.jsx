import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import DashBoard from "../pages/DashBoard";
import Profile from '../pages/Profile'



const mainRouter = {
    path:"/",
    element:<MainLayout/>,
    children:[
        {
        path:"/register",
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>

    },
    {
        path:'/dashboard',
        element:<DashBoard/>

    },
    {
        path:'/profile',
        element:<Profile/>

    },

]

}

export default mainRouter;
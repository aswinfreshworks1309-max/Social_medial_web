import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import DashBoard from "../pages/DashBoard";



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

    }

]

}

export default mainRouter;
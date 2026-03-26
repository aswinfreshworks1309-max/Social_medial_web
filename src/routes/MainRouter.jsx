import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import DashBoard from "../pages/DashBoard";
import Profile from '../pages/Profile'
import Chat from '../pages/Chat'
import CreatePost from '../pages/CreatePost'
import Notification from "../pages/Notification";


const mainRouter = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: '/login',
            element: <Login />,

        },
        {
            path: '/dashboard',
            element: <DashBoard />,

        },
        {
            path: '/profile',
            element: <Profile />,

        },
        {
            path: '/chat',
            element: <Chat />,
        },
        {
            path: '/post',
            element: <CreatePost />,
        },
        {
            path: '/notification',
            element: <Notification />,
            
        }

    ]

}

export default mainRouter;
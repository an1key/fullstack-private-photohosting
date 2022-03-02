import Admin from "./pages/Admin";
import Users from "./pages/Users";
import {ADMIN_ROUTE, ADD_PHOTO_ROUTE, CATALOGUE_ROUTE, PHOTO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Catalogue from "./pages/Catalogue";
import Auth from "./pages/Auth";
import PhotoPage from "./pages/PhotoPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Users
    },
    {
        path: ADD_PHOTO_ROUTE,
        Component: Admin
    },
    {
        path: CATALOGUE_ROUTE,
        Component: Catalogue
    },
    {
        path: PHOTO_ROUTE + '/:id',
        Component: PhotoPage
    },
    
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]

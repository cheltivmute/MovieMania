import Admin from "./pages/Admin"
import FoldersPage from "./pages/FoldersPage"
import FolderInPage from "./pages/FolderInPage"
import MoviePage from "./pages/MoviePage"
import SearchPage from "./pages/SearchPage"
import Auth from "./pages/Auth"
import { ADMIN_ROUTE, LOGIN_ROUTE, MOVIE_ROUTE, FOLDER_ROUTE, FOLDERIN_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE, ACCOUNT_ROUTE, PICKMOVIE_ROUTE } from "./utils/consts"
import AccountPage from "./pages/AccountPage"
import PickMoviePage from "./pages/PickMoviePage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: FOLDER_ROUTE,
        Component: FoldersPage
    },
    {
        path: FOLDERIN_ROUTE + '/:Folder_id',
        Component: FolderInPage
    },
    {
        path: ACCOUNT_ROUTE + '/:User_Id',
        Component: AccountPage
    },
]

export const publicRoutes = [
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PICKMOVIE_ROUTE,
        Component: PickMoviePage
    },
    {
        path: MOVIE_ROUTE + '/:Movie_id',
        Component: MoviePage
    },
]
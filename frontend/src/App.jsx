// All the route handlers to navigate to different components and modules
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MealDB from "./components/MealDB.jsx";
import NavBar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Toolbar from "@mui/material/Toolbar";
import Info from "./components/Info.jsx"
import AddFavorite from "./components/AddFavorite.jsx";
import Favorites from "./components/Favorites.jsx";
import FavoritesInfo from "./components/FavoritesInfo.jsx";
import EditForm from "./components/EditForm.jsx";
import Log from "./components/Log.jsx";

const App = () => {


    return (
        <>
            {/*Handles all the routes to each component*/}
            <Router>
                <NavBar />
                <Toolbar />
                <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Routes>
                        <Route path={"/"} element={<Landing/>}/>
                        <Route path={"/mealDB"} element={<MealDB/>}/>
                        <Route path="/info/:id" element={<Info />} />
                        <Route path={"/add/:id"} element={<AddFavorite/>}/>
                        <Route path={"/favorites/"} element={<Favorites/>}/>
                        <Route path={"/favorites/:id"} element={<FavoritesInfo/>}/>
                        <Route path={"/logs/"} element={<Log/>}/>

                    </Routes>
                </div>
            </Router>
        </>

    )
}

export default App

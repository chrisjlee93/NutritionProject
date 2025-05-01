// All the route handlers to navigate to different components and modules
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import axios from 'axios';
import mealDB from "./components/MealDB.jsx";
import MealDB from "./components/MealDB.jsx";
import Spoon from "./components/Spoon.jsx";
import NavBar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import {useEffect} from "react";
import Toolbar from "@mui/material/Toolbar";
import Info from "./components/Info.jsx"
import AddFavorite from "./components/AddFavorite.jsx";

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
                        <Route path={"/favorites"} element={<AddFavorite/>}/>
                    </Routes>
                </div>
            </Router>
        </>

    )
}

export default App

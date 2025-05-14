import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import MacroTable from "./MacroTable.jsx";
import {fetchMealById} from "./service.js";
import * as React from "react";
import foodImage from "../assets/MissingFoodImage.png"


const FavoritesInfo = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null)
    const [size, setSize] = useState(1)

    const navigate = useNavigate();

    // navigate to log component and prefills macros and name
    const goToLogFav = () => {
    if (!meal) return;
    const { name, macros } = meal;
    navigate('/logs', { state: { name, ...macros } });
    }

    useEffect(() => {
        if (!id) return;
        fetchMealById(id)
            .then(setMeal)
            .catch(err => console.error("Failed to fetch meal:", err));
    }, [id]);


    // Fallback until meal is loaded
    if (!meal) return <p>Loading...</p>;

    const parseIngredient = (str) => {
        const [amount, ...rest] = str.split(' ');
        const measureIngredient = rest.join(' ');
        return {
            measure: amount,
            ingredient: measureIngredient
        };
    };

    const videoId = meal.video
        ? (meal.video.match(
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
        ) || [])[1]
        : null;

    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    return (
        <Box sx={{ p: "2rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <h1>{meal.name}</h1>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={meal.imageUrl || foodImage}
                    alt={meal.name}
                    style={{ width: "70%", borderRadius: "8px" }}
                />
            </Box>
            <p><strong>Category:</strong> {meal.category}</p>
            <h3>Instructions:</h3>
            <p> {meal.recipe}</p>

            <Box sx={{ display: "flex", flexWrap: "wrap", mb: "5em" }}>
                <FormControl fullWidth>
                    <InputLabel id="servings-label">Serving Size</InputLabel>
                    <Select
                        labelId="servings-label"
                        value={size}
                        label="Size"
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <MenuItem value={0.25}>0.25</MenuItem>
                        <MenuItem value={0.5}>0.5</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ flex: 1, minWidth: "300px" }}>
                    <h2>Ingredients:</h2>
                    <ul>
                        {meal.ingredients.map((raw, index) => {
                            const { measure, ingredient } = parseIngredient(raw);
                            const number = parseFloat(measure);
                            let unit = "";

                            if (!isNaN(number) && size) {
                                unit = measure.slice(number.toString().length).trim();
                                const adjusted = parseFloat((number * size).toFixed(2));
                                return (
                                    <li key={index}>
                                        {adjusted} {unit} {ingredient}
                                    </li>
                                );
                            }

                            return (
                                <li key={index}>
                                    {measure} {ingredient}
                                </li>
                            );
                        })}

                    </ul>
                </Box>

                <Box sx={{ flex: 1, minWidth: "300px" }}>
                    <h2>Macros</h2>
                    <MacroTable Macros={meal.macros} size={size} />
                </Box>
            </Box>
            <button onClick={goToLogFav} disabled={!meal}> Log Favorite </button>
            {meal.video && embedUrl && (
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', marginTop: 2, width: "80%", display: "flex", justifyContent: "center"}}>
                        <iframe
                            src={embedUrl}
                            title="YouTube video player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                        ></iframe>
                    </Box>
            )}
        </Box>
    );
};


export default FavoritesInfo
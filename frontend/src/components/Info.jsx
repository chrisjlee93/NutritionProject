import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import MacroTable from "./MacroTable.jsx";
import YoutubeVideo from "./YoutubeVideos.jsx";
import {fetchMacrosFromIngredients} from "./service.js";

const Info = () => {
    const { id } = useParams();
    const [mealInfo, setMealInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [macros, setMacros] = useState(null);
    const [tableVisibility, setTableVisibility] = useState(false);
    const [size, setSize] = useState(1);

    const navigate = useNavigate();

    const appId = import.meta.env.VITE_NUTRITIONIX_APP_ID;
    const appKey = import.meta.env.VITE_NUTRITIONIX_APP_KEY;

    const openFavorite = () => {
        navigate(`/add/${id}`, { state: { macros, meal: mealInfo } });
    };

    const getIngredients = (mealObj) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = mealObj[`strIngredient${i}`];
            const measure = mealObj[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    ingredient: ingredient.trim(),
                    measure: measure ? measure.trim() : "",
                });
            }
        }
        return ingredients;
    };

    const buildIngredientString = (ingredients) =>
        ingredients
            .filter(i => i.ingredient && i.measure)
            .map(i => `${i.measure} ${i.ingredient}`)
            .join(', ');


    useEffect(() => {
        const fetchMealInfo = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php", {
                    params: { i: id },
                });
                if (response.data.meals?.length > 0) {
                    setMealInfo(response.data.meals[0]);
                } else {
                    setError("No meal found");
                }
            } catch (err) {
                console.error("Failed to fetch meal:", err);
                setError("Failed to fetch meal");
            } finally {
                setLoading(false);
            }
        };
        fetchMealInfo();
    }, [id]);

    useEffect(() => {
        if (!mealInfo) return;
        const ingredients = getIngredients(mealInfo);
        const firstIngredient = ingredients[0];
        if (!firstIngredient) return;
        // fetchMacros(`${firstIngredient.measure} ${firstIngredient.ingredient}`);
    }, [mealInfo]);

    useEffect(() => {
        const fetchAndSetMacros = async () => {
            if (!mealInfo) return;

            const ingredients = getIngredients(mealInfo);
            const ingredientString = buildIngredientString(ingredients);

            try {
                const m = await fetchMacrosFromIngredients(ingredientString);
                setMacros([m]); // Wrap in array if your MacroTable expects an array
                setTableVisibility(true);
            } catch (err) {
                console.error("Error fetching macros:", err);
                setTableVisibility(false);
            }
        };
        fetchAndSetMacros();
    }, [mealInfo]);


    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (error) return <p>{error}</p>;

    const ingredients = getIngredients(mealInfo);

    const videoId = mealInfo.strYoutube
        ? (mealInfo.strYoutube.match(
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
        ) || [])[1]
        : null;

    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    return (
        <Box sx={{ p: "2rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <h1>{mealInfo.strMeal}</h1>
                <IconButton aria-label="add to favorites" onClick={openFavorite}>
                    <FavoriteIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={mealInfo.strMealThumb}
                    alt={mealInfo.strMeal}
                    style={{ width: "400px", borderRadius: "8px" }}
                />
            </Box>
            <p><strong>Category:</strong> {mealInfo.strCategory}</p>
            <p><strong>Area:</strong> {mealInfo.strArea}</p>
            <p><strong>Instructions:</strong> {mealInfo.strInstructions}</p>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
                        {ingredients.map((item, index) => {
                            const measure = item.measure || "";
                            const number = parseFloat(measure);
                            let unit = "";
                            if (!isNaN(number)) {
                                unit = measure.slice(number.toString().length).trim();
                                const adjusted = parseFloat((number * size).toFixed(2));
                                return (
                                    <li key={index}>
                                        {adjusted} {unit} {item.ingredient}
                                    </li>
                                );
                            }
                            return (
                                <li key={index}>
                                    {measure} {item.ingredient}
                                </li>
                            );
                        })}
                    </ul>
                </Box>

                {tableVisibility && (
                    <Box sx={{ flex: 1, minWidth: "300px" }}>
                        <h2>Macros</h2>
                        <MacroTable Macros={macros[0]} size={size} />
                    </Box>
                )}
            </Box>

            {mealInfo.strYoutube && embedUrl && (
                <div style={{ marginTop: "1rem" }}>
                    <YoutubeVideo mealInfo={mealInfo} />
                </div>
            )}
        </Box>
    );
};

export default Info;

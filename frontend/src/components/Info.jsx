import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import MacroTable from "./MacroTable.jsx";
import * as React from "react";
import YoutubeVideo from "./YoutubeVideos.jsx";



const Info = () => {
    const { id } = useParams(); // 🛠 Grab meal ID from URL
    const [mealInfo, setMealInfo] = useState(null); // 🛠 store the meal data
    const [loading, setLoading] = useState(true);   // 🛠 loading state
    const [error, setError] = useState(null);        // 🛠 error handling
    const [macros, setMacros] = useState(null)
    const [tableVisibility, setTableVisibility] = useState(false)

    // const initalMacros = {
    //     calories: 0,
    //     protein: 0,
    //     carbs: 0,
    //     fat: 0,
    //     satFat: 0,
    //     sodium: 0,
    //     sugar: 0,
    // }

    useEffect(() => {
        const fetchMealInfo = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php', {
                    params: { i: id }
                });
                if (response.data.meals && response.data.meals.length > 0) {
                    setMealInfo(response.data.meals[0]); // first meal result
                } else {
                    setError('No meal found');
                }
            } catch (err) {
                console.error('Failed to fetch meal:', err);
                setError('Failed to fetch meal');
            } finally {
                setLoading(false);
            }
        };
        fetchMealInfo();
    }, [id]); // dependency array: refetch if id changes


    const getIngredients = (mealInfo) => {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = mealInfo[`strIngredient${i}`];
            const measure = mealInfo[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({
                    ingredient,
                    measure: measure ? measure.trim() : "", // ternary in case measure is missing
                });
            }
        }
        console.log(ingredients)
        return ingredients;
    };


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (error) return <p>{error}</p>;

    const ingredients = getIngredients(mealInfo);

    // Seperating creds from code
    const appId = import.meta.env.VITE_NUTRITIONIX_APP_ID;
    const appKey = import.meta.env.VITE_NUTRITIONIX_APP_KEY;

    const fetchMacros = async (ingredient) => {
        try {
            const response = await axios.post(
                'https://trackapi.nutritionix.com/v2/natural/nutrients',
                {
                    query: ingredient,
                },
                {
                    headers: {
                        'x-app-id': appId,
                        'x-app-key': appKey,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);

            const foods = response.data.foods;
            setMacros(foods);
            setTableVisibility(!!foods?.length); // true if foods is not empty

        } catch (error) {
            console.error('Error fetching nutrition:', error);
            setTableVisibility(false); // fallback if it fails
        }
        setMacros(response.data.foods)
    };

    const test = () => {
        console.log(macros)
        handleVisibility()
    }

    const handleVisibility = () => {
        return (macros) ? setTableVisibility(true) : setTableVisibility(false)
    }

    const extractYouTubeID = (url) => {
        if (!url) return null;

        const regex =
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;

        const match = url.match(regex);
        return match && match[1] ? match[1] : null;
    };

    const videoId = extractYouTubeID(mealInfo.strYoutube);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;


    return (
        <Box sx={{ p: '2rem' }}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}> <h1>{mealInfo.strMeal}</h1>
                <IconButton
                    aria-label="add to favorites"
                    // onClick={addToFavorites}
                >
                    <FavoriteIcon />
                </IconButton>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img src={mealInfo.strMealThumb} alt={mealInfo.strMeal} style={{ width: '400px', borderRadius: '8px' }} />
            </Box>
            <p><strong>Category:</strong> {mealInfo.strCategory}</p>
            <p><strong>Area:</strong> {mealInfo.strArea}</p>
            <p><strong>Instructions:</strong> {mealInfo.strInstructions}</p>
            <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
            <Box sx={{ flex: 1, minWidth: '300px' }}>
                <h2>Ingredients:</h2>
                <ul>
                    {ingredients.map((item, index) => (
                        <li key={index}>
                            {item.measure} {item.ingredient}
                        </li>
                    ))}
                </ul>
                {/*Setting up a button to do an API call on the ingredients on the list*/}
                {/*Will only be using the first ingredient in the array to save on API calls*/}
            </Box>
                {tableVisibility && (
            <Box sx={{ flex: 1, minWidth: '300px' }}>
                <h2>Macros</h2>
                <MacroTable Macros={macros[0]}/>
            </Box>
                )}
            </Box>
            <button onClick={() => fetchMacros(`${ingredients[0].measure} ${ingredients[0].ingredient}`)}>Get Macros (WIP)</button>
            <button onClick={test}>Test</button>
            {mealInfo.strYoutube && (
                <div style={{ marginTop: '1rem' }}>
                    <YoutubeVideo mealInfo={mealInfo}/>
                </div>
            )}
        </Box>
    );
};

export default Info;

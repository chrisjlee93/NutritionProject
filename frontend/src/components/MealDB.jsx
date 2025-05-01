import { useState } from 'react';
import axios from 'axios';
import MealDBCard from "./MealDBCard.jsx";
import Box from "@mui/material/Box";

// Main component that communicates with the MealDB API
const MealDB = () => {
    const [ingredient, setIngredient] = useState('');
    const [meals, setMeals] = useState([]);
    const [recipes, setRecipes] = useState([])

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php`, {
                params: { i: ingredient }
            });
            console.log(response)
            setMeals(response.data.meals || []);// null if no results
            const recipe = await getRecipe(response.data.meals)
        } catch (err) {
            console.error('Error fetching meals:', err);
        }
        console.log(recipes)
    };

    const getRecipe = async (meals) => {
        const fetchedRecipes = [];
        for (let m of meals)
            try {
            const res = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?', {
                params: {i: m.idMeal}
                });
                if (res.data.meals) {
                    fetchedRecipes.push(res.data.meals[0])
                }
            } catch (err) {
                console.log(err);
            }
        setRecipes(fetchedRecipes)
    };

    const handleClick = (e) => {
        e.preventDefault()
        console.log(recipes)
    }

    const combined = meals.map((meal, index) => ({
        meal,
        recipe: recipes [index] || null
    }));

    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1 >Search Meals by Ingredient</h1>
            <button onClick={handleClick}>Just for testing purposes</button>
            <input
                style={{width: '300px', height: '25px', fontSize: '1.1rem'}}
                type="text"
                placeholder="e.g. chicken, beef..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
            />
            <button
                style={{margin: '20px', width: '80px', height: '30px'}}
                onClick={handleSearch}
            >
                Search
            </button>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    justifyContent: "center"
                }}
            >
                {combined.length > 0 ? (
                    combined.map(el => (
                        <MealDBCard key={el.meal.idMeal} data={el} />
                    ))
                ) : (
                    <p>No meals found</p>
                )}
            </div>
        </Box>
    );
};

export default MealDB;

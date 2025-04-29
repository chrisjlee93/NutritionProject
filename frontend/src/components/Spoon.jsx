import { useState } from 'react';
import axios from 'axios';

const Spoon = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

        try {
            const response = await axios.get(
                'https://api.spoonacular.com/recipes/findByIngredients',
                {
                    params: {
                        ingredients: ingredients.split(',').map(ing => ing.trim()).join(','),
                        number: 100,
                        ranking: 1,
                        ignorePantry: true,
                        apiKey: 'abf4c9066e6b4293a629a2af51b15c1f',
                    },
                }
            );
            console.log(response);
            setRecipes(response.data);
        } catch (err) {
            console.error('API error:', err);
            alert('Something went wrong. Double-check your API key and quota.');
        }
    };

    return (
        <div>
            <h1>Spoonacular Ingredient Search</h1>
            <input
                type="text"
                placeholder="e.g. chicken, rice, onion"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <p>{recipe.title}</p>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            width="200"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                window.open(`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`, '_blank')
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Spoon;

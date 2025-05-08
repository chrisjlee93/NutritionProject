import {useState} from "react";
import Box from "@mui/material/Box";
import {
    CircularProgress,
    FormControl,
    FormControlLabel, FormLabel, RadioGroup,
    Rating,
    TextField
} from "@mui/material";
import Radio from '@mui/material/Radio';
import StarIcon from '@mui/icons-material/Star';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {addMeals} from "./service.js";


const addFavorite = () => {
    const { id } = useParams(); // Grab meal ID from URL

    const initialForm = {
        category: 'other',
        value: 3,
        comments: ''
    }

    const navigate = useNavigate();

    const location = useLocation();
    const {macros, meal} = location.state || {};

    // Use State Area
    const [form, setForm] = useState(initialForm)
    const {category, value, comments} = form
    const [hover, setHover] = useState(-1);

    // Rating settings
    const labels = {
        0.5: '💩 Why are you even adding this?',
        1: '💩 Why are you even adding this?',
        1.5: 'Poor',
        2: 'Poor',
        2.5: 'Ok',
        3: 'Ok',
        3.5: 'Good',
        4: 'Good',
        4.5: 'Excellent',
        5: '🔥',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    };

    const extractIngredients = (mealObj) => {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = mealObj[`strIngredient${i}`];
            const measure = mealObj[`strMeasure${i}`];

            if (ingredient && ingredient.trim()) {
                const formatted = `${measure?.trim() || ''} ${ingredient.trim()}`.trim();
                ingredients.push(formatted);
            }
        }

        return ingredients;
    };


    // const extractIngredients = (mealObj) => {
    //     return Object.entries(mealObj)
    //         .filter(([key, val]) => key.startsWith("strIngredient") && val)
    //         .map(([_, val]) => val);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // addMeals()
        const newMeal = {
            name: meal.strMeal,
            category: form.category,
            imageUrl: meal.strMealThumb,
            recipe: meal.strInstructions,
            recipeLink: meal.strSource,
            video: meal.strYoutube,
            externalId: meal.idMeal,
            comments: form.comments,
            rating: form.value,
            ingredients: extractIngredients(meal),
            macros: {
                calories: macros[0].nf_calories,
                protein: macros[0].nf_protein,
                fat: macros[0].nf_total_fat,
                satFat: macros[0].nf_saturated_fat,
                carbs: macros[0].nf_total_carbohydrate,
                sugar: macros[0].nf_sugars,
                sodium: macros[0].nf_sodium,
            }
        };

        try {
            await addMeals(newMeal); // or axios.post(...)
            navigate('/favorites');
        } catch (err) {
            console.error("Error saving meal:", err);
        }
        console.log(newMeal)
        // console.log(form)
    //     Will handle the data here and send it to a db and navigate to favorites page

        // navigate('/favorites/')
    //     Error handling if needed
    }

    return (
        <>
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}> <h1>{meal.strMeal}</h1>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '400px', borderRadius: '8px' }} />
                </Box>


            </Box>

            <Box
                component="form"
                sx={{ display: 'flex', alignItems: 'center' , flexDirection: 'column', '& > :not(style)': { m: 1, width: '75ch' }}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >

                {/*Meal Type Category Selection*/}
                <FormControl>
                    <FormLabel id="catergory-radio">Category</FormLabel>
                    <RadioGroup
                        row
                        defaultValue={'other'}
                        defaultChecked={true}
                        // aria-labelledby="categoryRadios"
                        name="category"
                        value={category}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Main Course" control={<Radio />} label="Main Course" />
                        <FormControlLabel value="Appetizer" control={<Radio />} label="Appetizer" />
                        <FormControlLabel value="Side Dish" control={<Radio />} label="Side Dish" />
                        <FormControlLabel value="Dessert" control={<Radio />} label="Desert" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>

                <Box>
                    <TextField fullWidth onChange={handleChange} name={"comments"} value={comments} multiline rows={5} label="Comments" variant="outlined" />
                </Box>

                {/*Just making sure that the Macros state is being passed to be able to add it to the DB from this component*/}
                {/*<Box sx={{ flex: 1}}>*/}
                {/*    <h2>Macros</h2>*/}
                {/*    <MacroTable Macros={macros[0]} size={size} />*/}
                {/*</Box>*/}
                {/*<button >Save Macros</button>*/}

                {/*MUI Rating Element*/}
                <Box sx={{ width: 650, display: 'flex', alignItems: 'center' }}>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setForm({ ...form, value: newValue });
                            console.log(form)
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </Box>

                <button type={'submit'}> Submit </button>

            </Box>
        </>
    )
}

export default addFavorite
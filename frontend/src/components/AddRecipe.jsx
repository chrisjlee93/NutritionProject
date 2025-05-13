import { useState } from "react";
import {TextField, IconButton, Box, Rating, FormControl, FormLabel, RadioGroup, FormControlLabel} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {addMeals} from "./service.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import * as React from "react";
import Radio from "@mui/material/Radio";


const AddRecipe = () => {

    const [ingredients, setIngredients] = useState([""]);
    const [hover, setHover] = useState(-1);


    const navigate = useNavigate();

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

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }


    const handleChange = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
        console.log(ingredients)
    };

    const initialForm = {
        category: 'Other',
        value: 3,
        comments: ''
    }

    const initialMacros = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        satFat: 0,
        sugar: 0,
        sodium: 0
    }

    const addField = () => setIngredients([...ingredients, ""]);
    const [macros, setMacros] = useState(initialMacros)
    const [form, setForm] = useState(initialForm)
    const {calories, protein, carbs, fat, satFat, sugar, sodium} = macros
    const {name, recipe, category, value, comments} = form

    const removeField = (index) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated);
    };

    const changeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
        console.log(form)
    }
    const changeMacros = (e) => {
        setMacros({...macros, [e.target.name]:e.target.value})
        console.log(macros)
    }

    const addRecipe = async () => {
        const newMeal = {
            name, recipe, macros, ingredients, category, comments, rating: value
        }
        console.log(newMeal)
        try {
            await addMeals(newMeal); // or axios.post(...)
            // on success will navigate to favorites page
            navigate('/favorites');
        } catch (err) {
            console.error("Error saving meal:", err);
        }
    }

    return (
        <>
            <Box>
                <h1>Add your recipe</h1>
                <TextField
                    required
                    name="name"
                    label="Recipe Name"
                    value={name}
                    onChange={changeForm}
                />

                <Box>
                    <h2>Ingredients</h2>
                    <IconButton onClick={() => addField()}>
                        <AddIcon />
                    </IconButton>
                    {ingredients.map((value, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TextField
                                fullWidth
                                label={`Ingredient ${index + 1}`}
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />

                            {ingredients.length > 1 && (
                                <IconButton onClick={() => removeField(index)}>
                                    <RemoveIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}

                </Box>
                <button> Add Macros from ingredients </button>
                <Box>
                <TextField
                    name="calories"
                    type={"number"}
                    label="Calories"
                    value={calories}
                    onChange={changeMacros}
                />
                <TextField
                    name="protein"
                    type={"number"}
                    label="Protein"
                    value={protein}
                    onChange={changeMacros}
                    // onChange={formChange}
                />
                <TextField
                    name="carbs"
                    type={"number"}
                    label="Carbs"
                    value={carbs}
                    onChange={changeMacros}
                    // onChange={formChange}
                />
                <TextField
                    name="fat"
                    type={"number"}
                    label="Fat"
                    value={fat}
                    onChange={changeMacros}
                    // onChange={formChange}
                />
                <TextField
                    name="satFat"
                    type={"number"}
                    label="Saturated Fat"
                    value={satFat}
                    onChange={changeMacros}
                    // onChange={formChange}
                />
                <TextField
                    name="sugar"
                    type={"number"}
                    label="Sugar"
                    value={sugar}
                    onChange={changeMacros}
                    // onChange={formChange}
                />
                <TextField
                    name="sodium"
                    type={"number"}
                    label="Sodium"
                    value={sodium}
                    onChange={changeMacros}
                    // onChange={formChange}
                />
                </Box>
                <h2>Instructions</h2>
                <TextField
                    name="recipe"
                    type={"text"}
                    label="Recipe Instructions here"
                    value={recipe}
                    onChange={changeForm}
                    fullWidth
                    multiline
                    rows={3}
                />

                <Box>
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
                    <FormControl>
                        <FormLabel id="catergory-radio">Category</FormLabel>
                        <RadioGroup
                            row
                            defaultValue={'Other'}
                            defaultChecked={true}
                            name="category"
                            value={category}
                            onChange={changeForm}
                        >
                            <FormControlLabel value="Main Course" control={<Radio />} label="Main Course" />
                            <FormControlLabel value="Appetizer" control={<Radio />} label="Appetizer" />
                            <FormControlLabel value="Side Dish" control={<Radio />} label="Side Dish" />
                            <FormControlLabel value="Dessert" control={<Radio />} label="Desert" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    <Box>
                        <TextField fullWidth onChange={changeForm} name={"comments"} value={comments} multiline rows={5} label="Comments" variant="outlined" />
                    </Box>
                </Box>

                <button onClick={addRecipe}>Add Recipe to Favorites</button>
            </Box>
        </>
    )
}

export default AddRecipe
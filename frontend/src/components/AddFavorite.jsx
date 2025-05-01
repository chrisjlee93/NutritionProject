import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {
    FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    InputLabel,
    MenuItem, RadioGroup,
    Rating,
    Select,
    TextField
} from "@mui/material";
import Radio from '@mui/material/Radio';
import StarIcon from '@mui/icons-material/Star';
import {useParams} from "react-router-dom";
import axios from "axios";

const addFavorite = ({meal}) => {
    const { id } = useParams(); // 🛠 Grab meal ID from URL

    const initalForm = {
        category: '',
        value: 3,
        // comments: ''
    }

    // Use State Area
    const [form, setForm] = useState(initalForm)
    const {category, value} = form
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
        setForm({...form,[e.target.value]:e.target.value});
        console.log(form)
    };


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // Call and load from API based on ID
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


    return (
        <>
            <Box>
                <p>Meal Stuff here</p>
            </Box>
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { m: 1, width: '75ch' }}}
                noValidate
                autoComplete="off"
            >

                {/*Meal Type Category Selection*/}
                <FormControl>
                    <FormLabel id="catergory-radio">Category</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="categoryRadios"
                        name="category"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />
                        <FormControlLabel value="lunch" control={<Radio />} label="Lunch" />
                        <FormControlLabel value="dinner" control={<Radio />} label="Dinner" />
                        <FormControlLabel value="snack" control={<Radio />} label="Snack" />
                        <FormControlLabel value="other" defaultChecked={'true'} control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>

                <Box>
                    <TextField fullWidth id="comments" multiline rows={5} label="Comments" variant="outlined" />
                </Box>

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
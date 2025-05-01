import {useState} from "react";
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

const addFavorite = ({meal}) => {

    const initalForm = {
        category: '',
        size: 1,
        value: 3,
        // comments: ''
    }

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

    // Use State Area
    const [form, setForm] = useState(initalForm)
    const {category, size, value} = form
    // const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

        const handleChange = (e) => {
            setForm({...form,[e.target.value]:e.target.value});
            console.log(form)
        };

    const handleSubmit = (e) => {
        e.preventDefault()
    }

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
                {/*<TextField id="outlined-basic" label="" variant="outlined" />*/}
                {/*<TextField id="filled-basic" label="Filled" variant="filled" />*/}
                {/*<TextField id="standard-basic" label="Standard" variant="standard" />*/}
                {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}


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

                <FormControl fullWidth>
                    <InputLabel id="servings-label">Serving Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        label="Size"
                        onChange={handleChange}
                    >
                        <MenuItem value={0.25}>0.25</MenuItem>
                        <MenuItem value={0.5}>0.5</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                    </Select>
                </FormControl>

                <Box>
                    <TextField fullWidth id="comments" multiline rows={5} label="Comments" variant="outlined" />
                </Box>

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
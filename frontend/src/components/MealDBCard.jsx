import AccordionItem from "./Accordian.jsx";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from "@mui/material/IconButton";
import {CardActions} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate} from "react-router-dom";

const MealDBCard = ({data}) => {
    const {meal, recipe} = data

    // This is what is used to open a unique page for each meal based on the MealDB ID
    const navigate = useNavigate();

    const openInfo = () => {
        navigate(`/info/${meal.idMeal}`)
    }

    // This is what is used to open a unique page for each meal based on the MealDB ID

    const openFavorite = () => {
        navigate(`/favorites/${meal.idMeal}`)
    }

    return(
        <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={300}
                    image={meal.strMealThumb}
                    alt={meal.strMeal}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {meal.strMeal}
                    </Typography>

                    {/*Will only load this element if content for it exists */}
                    {recipe && (
                        <div>
                            <p><strong>Category:</strong> {recipe.strCategory} </p>
                            <p><strong>Area:</strong> {recipe.strArea}</p>

                            {/*Calls the accordion element to display information in a organized way*/}
                            <AccordionItem info={recipe}/>
                        </div>
                        )}

                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={openFavorite}
                        >
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={openInfo}
                        >
                            <InfoIcon />
                        </IconButton>
                    </CardActions>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default MealDBCard
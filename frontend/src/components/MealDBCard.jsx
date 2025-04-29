import AccordionItem from "./Accordian.jsx";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

const MealDBCard = ({data}) => {
    const {meal, recipe} = data

    // const {idMeal, strMeal, strMealThumb} = meal


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
                    {recipe && (
                        <div>
                            <p><strong>Category:</strong> {recipe.strCategory} </p>
                            <p><strong>Area:</strong> {recipe.strArea}</p>
                            <AccordionItem info={recipe}/>
                        </div>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>


    )

}

export default MealDBCard
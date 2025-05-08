import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import * as React from "react";
import Box from "@mui/material/Box";
import foodImage from "../assets/MissingFoodImage.png"
import {Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {deleteMeal} from "./service.js";

const FavoritesCard = ({meal, onDelete}) => {

    const {id, name, category, video, imageUrl, rating, comments, ingredients} = meal

    const goToFavInfo = () => {

    }

    const handleDelete = async () => {
        await deleteMeal(id)
        onDelete()
    }

    const gotToEdit = () => {}

    // const extractYouTubeID = (url) => {
    //     if (!url) return null;
    //
    //     // Regex to accept all valid youtube links
    //     const regex =
    //         /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    //
    //     const match = url.match(regex);
    //     return match && match[1] ? match[1] : null;
    // };
    //
    // // Youtube for some reason does not like direct link calls
    // const videoId = extractYouTubeID(video);
    // const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;


    return(
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={300}
                    image={imageUrl}
                    alt={name}
                    onClick={goToFavInfo}
                    onError={(e) => {
                        e.target.onerror = null; // prevent looping
                        e.target.src = foodImage; // your local fallback image
                    }}
                />
            </CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                        <div>
                            <p><strong>Rating:</strong> </p>
                                <Rating
                                    name="read-only-rating"
                                    value={rating}
                                    precision={0.5}
                                    readOnly
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                        </div>
                        <div>
                            <p><strong>Category:</strong> {category} </p>
                        </div>
                        <div>
                            <p><strong>Comments:</strong> {comments} </p>
                        </div>
                    <button onClick={handleDelete}> Delete </button>
                    <button onClick={gotToEdit}> Delete </button>
                </CardContent>
        </Card>
    )

}

export default FavoritesCard
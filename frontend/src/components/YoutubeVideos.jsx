import * as React from "react";
import Box from "@mui/material/Box";


const YoutubeVideo = ({mealInfo}) => {


    // To grab the youtube video id to allow it to display it in the embedded player
    const extractYouTubeID = (url) => {
        if (!url) return null;

        // Regex to accept all valid youtube links
        const regex =
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;

        const match = url.match(regex);
        return match && match[1] ? match[1] : null;
    };

    // Youtube for some reason does not like direct link calls
    const videoId = extractYouTubeID(mealInfo.strYoutube);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    return (
        <Box sx={{ position: 'relative', paddingTop: '56.25%', marginTop: 2}}>
            <iframe
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                }}
            ></iframe>
        </Box>
    )
}

export default YoutubeVideo
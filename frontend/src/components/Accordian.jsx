import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import YoutubeVideo from "./YoutubeVideos.jsx";

export default function AccordionItem({info}) {


    // To grab the youtube video id to allow it to display it in the embedded player
    const extractYouTubeID = (url) => {
        if (!url) return null;

        const regex =
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;

        const match = url.match(regex);
        return match && match[1] ? match[1] : null;
    };

    const videoId = extractYouTubeID(info.strYoutube);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;



    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Instructions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {info.strInstructions}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Sources</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {info.strSource ?
                        <p> <a href={info.strSource} target="_blank" rel="noopener noreferrer"> Recipe </a> </p>
                        : <p>No Recipe Available</p>}
                    {/*displays video if available*/}
                    {info.strYoutube ? <YoutubeVideo mealInfo={info}/> : <p>No Video Available </p>}
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';



export default function PrayerCard({title, time, image}) {
    return (
        <Card sx={{ maxWidth: 350 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="150"
            image={image}
            alt="prayer"
            className='prayer_img'
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {title}
            </Typography>
            <Typography variant="h2" sx={{ color: 'text.secondary' }}>
                {time}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
// @ts-ignore
import { useTheme } from '@mui/material';


export default function SideCard({open}) {
    const theme = useTheme()
    return (
        <Card sx={{ 
            maxWidth: open ? 350: 0, m: 2,
            display: open ? "block": "none",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `2px solid ${theme.palette.border.primary} `}} className='cardd'>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h6" component="div" >
            Become A Monthly <br /> Doner
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Monthly donations help us <br />improve Quran.com and<br /> sustain operations so we<br />
            focus less on fundraising <br />and  more on creating impact.
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions >
            <Button size="small" >
            Donate monthly
            </Button>
        </CardActions>
        </Card>
    );
}

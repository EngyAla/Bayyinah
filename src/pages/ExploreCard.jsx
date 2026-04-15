import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';


export default function ExploreCard({title,subtitle, link}) {
    const theme = useTheme()
    // const date = new Date()
    // console.log(date.getHours())
    return (
        <Card sx={{ 
            maxWidth:  550, m: 2,
            height: 160,
            paddingBottom:{ xs: 22, sm: 22, lg: 0},
            display: open ? "block": "none",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `2px solid ${theme.palette.border.primary} `
            }} className='cardd'>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h4" fontWeight={'700'} component="div">
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize:"13px",fontFamily:'cursive' }}>
                {subtitle}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions >
            <Link to={link}>
            <Button size="small" >
            Start Now <ArrowRightIcon />
            </Button>
            </Link>
        </CardActions>
        </Card>
    );
}

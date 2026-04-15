import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTimer } from './Context/TimerContext';
import moment from 'moment';


export default function HomeCard({link}) {
    const theme = useTheme()
    const {timings} = useTimer()
    const momentNow = moment();
    // console.log(date.getHours())
    return (
        <Card sx={{ 
            maxWidth:  550, m: 2,
            height: 160,
            paddingBottom:{ xs: 23, sm: 23, lg: 0},
            display: open ? "block": "none",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `2px solid ${theme.palette.border.primary} `}} className={momentNow.isAfter(moment(timings['Fajr'], 'hh:mm')) && momentNow.isBefore(moment(timings['Asr'], 'hh:mm')) ? 'morning_card' : 'nignt_card'}>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h4" fontWeight={'700'} component="div" >
                Welcome!
            </Typography>
            {
                momentNow.isAfter(moment(timings['Fajr'], 'hh:mm')) && momentNow.isBefore(moment(timings['Asr'], 'hh:mm')) ?
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary,fontFamily:'cursive' }}>
            Start your day with Morning Azkar...
            </Typography>
                :
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary,fontFamily:'cursive' }}>
            End your day with Evening Azkar...
            </Typography>
            }
            </CardContent>
        </CardActionArea>
        <CardActions >
            <Link to={link}>
            <Button size="small">
                Start Now <ArrowRightIcon />
            </Button>
            </Link>
        </CardActions>
        </Card>
    );
}

export function HomeCard2({link}) {
    const theme = useTheme()
    const {remainingTime, nextPrayer} = useTimer();
    return (
        <Card sx={{ 
            maxWidth:  750, m: 2,
            height: 160,
            paddingBottom:{ xs: 23, sm: 23, lg: 0},
            display: open ? "block": "none",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `2px solid ${theme.palette.border.primary} `}} className='cardd'>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h4" fontWeight={'700'} component="div" >
                {remainingTime}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>Remaining until the <span style={{fontWeight: "800", fontSize: "18px"}}>{nextPrayer}</span> prayer</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions >
            <Link to={link}>
            <Button size="small" >
                Show Times <ArrowRightIcon />
            </Button>
            </Link>
        </CardActions>
        </Card>
    );
}
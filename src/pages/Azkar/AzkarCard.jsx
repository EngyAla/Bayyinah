import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Button, CardActions, Stack, useTheme } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


export default function AzkarCard({title, onClick }) {
    const theme = useTheme()
    return (
        <Card sx={{ 
            minWidth: 290,
            // maxWidth: {sx: 250, lg: 380},
            my: 2,
            height: 100,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `2px solid ${theme.palette.border.primary} `,
            direction: 'rtl',
        }} 
            className='azkar_cardd' >
        <CardActionArea>
            <CardContent sx={{display:'flex', justifyContent:'space-between'}}  onClick={onClick}>
            <Stack direction={'row'}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '18px', marginTop: '8px',fontFamily:'Uthmani' }}>
                    {title}
                </Typography>
            </Stack>
            </CardContent>
        </CardActionArea>
        <CardActions sx={{mt: -2}}  onClick={onClick}>
            {/* <Link> */}
            <Button size="small" style={{fontSize:'16px', fontWeight:600}}>
                ابدأ الآن<ArrowLeftIcon />
            </Button>
            {/* </Link> */}
        </CardActions>
        </Card>
    );
}

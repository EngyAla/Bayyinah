import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Stack, useTheme } from '@mui/material';


export default function QuranCard({number,englisName,arabicName, onClick }) {
    const theme = useTheme()
    return (
        <Card   sx={{ 
            minWidth: 290,
            maxWidth: 380,
            my: 2,
            height: 80,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            // @ts-ignore
            border: `2px solid ${theme.palette.border.primary} `
        }} 
            className='cardd' >
        <CardActionArea>
            <CardContent sx={{display:'flex', justifyContent:'space-between'}} onClick={onClick}>
            <Stack direction={'row'} gap={2} display={'flex'} alignItems={'center'}>
                <div className="diamond-shape" style={{backgroundColor: theme.palette.
// @ts-ignore
                card.primary}}>
                    <div className="item-count" style={{color: theme.palette.text.primary}}>
                        {number}
                    </div>
                </div>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '17px',  }}>
                    {englisName}
                </Typography>
            </Stack>
            <Stack direction={'row'}>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '17px', marginTop: '8px' }}>
                    {arabicName}
                </Typography>
            </Stack>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}

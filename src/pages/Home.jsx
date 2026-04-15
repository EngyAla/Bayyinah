import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeCard, { HomeCard2 } from './HomeCard'
import ExploreCard from './ExploreCard';
import HomeOpening from './HomeOpenning';

const Home = ()=>{
    return(
        <>  
        <div className="parent">
            <HomeOpening />
            <Stack direction={'column'} mt={5} >
                <Typography variant='h4' fontWeight={600} mx={2}>Continue Reading</Typography>
                <Stack direction={"row"} gap={5} mt={1} flexWrap={"wrap"} >
                    <Box sx={{maxWidth: "900px",flexGrow: 1}}>
                        <Link to={'adhkar/أذكار%20الصباح%20والمساء'}>
                            <HomeCard link={'adhkar/أذكار%20الصباح%20والمساء'} />
                        </Link>
                    </Box>
                    <Box sx={{maxWidth: "900px",flexGrow: 1}}>
                        <Link to={'/prayertime'}>
                            <HomeCard2 link={'/prayertime'}/>
                        </Link>
                    </Box>
                </Stack>
            </Stack>
            <Stack direction={'column'} mt={5} >
                <Typography variant='h4' fontWeight={600} mx={2}>Explore Topics</Typography>
                <Stack direction={"row"} gap={1.8} mt={1} flexWrap={"wrap"} >
                    <Box sx={{maxWidth: "900px",flexGrow: 1}}>
                        <Link to={'/quran'}>
                            <ExploreCard title={"Quran!"} subtitle={"And He found you lost and guided you. 93:7"} link={'/quran'} />
                        </Link>
                    </Box>
                    <Box sx={{maxWidth: "900px",flexGrow: 1}}>
                        <Link to={'/azkar'}>
                            <ExploreCard title={"Azkar!"} subtitle={"And He found you lost and guided you. 93:7"} link={'/azkar'}/>
                        </Link>
                    </Box>
                    <Box sx={{maxWidth: "900px",flexGrow: 1}}>
                        <Link to={'/tasbih'}>
                            <ExploreCard title={"Tasbih!"} subtitle={"And He found you lost and guided you. 93:7"} link={'/tasbih'}/>
                        </Link>
                    </Box>
                    <Box sx={{maxWidth: "900px",flexGrow: 1}}>
                        <Link to={'/prayertime'}>
                            <ExploreCard title={"Time-Prayer!"} subtitle={"And He found you lost and guided you. 93:7"} link={'/prayertime'}/>
                        </Link>
                    </Box>
                </Stack>
            </Stack>
        </div>
        </>
    )
}

export default Home;
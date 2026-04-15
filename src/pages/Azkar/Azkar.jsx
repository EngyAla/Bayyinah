import HomeOpening from "../HomeOpenning";
import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import adhkar from './adhkar.json'
import AzkarCard from './AzkarCard';
import { useNavigate } from "react-router-dom";
import { useSearch } from '../Context/SearchContext'

const Azkar = ()=> {
    const {search} = useSearch();
    const navigate = useNavigate()
    return(
        <div className="AzkarPage">
            <HomeOpening />
                <Typography variant="h4" fontWeight={600} mt={5} mb={1}>Azkar Content...</Typography>
                <Divider />
                {adhkar.length
                ?
                <div>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={1} justifyContent={'center'} marginTop={1.7} width={'95%'}>
                    {adhkar.filter((item)=>{
                        return(
                            search === '' 
                            ?
                            item 
                            :
                            item.category.includes(search)
                        )
                    }).map((item) => (
                        <AzkarCard key={item.category} title={item.category} onClick={()=>{navigate(`/adhkar/${encodeURIComponent(item.category)}`)}} />
                    ))}
                    </Stack>
                </div>
                :
                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} mt={'5'}>
                    <h1>Wait a second...</h1>
                    <CircularProgress />
                </Stack>
                }
        </div>
    )
}

export default Azkar;

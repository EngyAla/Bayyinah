import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import HomeOpening from "../HomeOpenning";
import { useEffect, useState } from "react";
import QuranCard from "./QuranCard";
import { useNavigate } from "react-router-dom";
import { useSearch } from '../Context/SearchContext'

    const Quran = () => {
        const [surahs, setSurahs] = useState([])
        const [loading,setLoading] = useState(true)
        const {search} = useSearch();
        const navigate = useNavigate()
        useEffect(()=>{
            fetch('https://api.alquran.cloud/v1/surah')
            .then((response)=> response.json())
            .then((data)=>{
                // console.log(data.data)
                setSurahs(data.data)
                setLoading(false)
            })
            .catch((error)=>{
                console.error(error)
                setLoading(false)
            })
        },[])

    return (
        <>
            <div className="QuranPage">
                <HomeOpening />
                <Typography variant="h4" fontWeight={600} mt={5} mb={1}>Quran Content...</Typography>
                <Divider />
                {loading ? 
                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} mt={'5'}>
                    <h1>Wait a second...</h1>
                    <CircularProgress />
                </Stack>
                : 
                (
                <Stack direction={"row"} flexWrap={"wrap"} gap={1} justifyContent={'center'} marginTop={1.7} width={'95%'}>
                    {
                    surahs.filter((item) => {
                    // console.log(item.name)
                        return(
                            search.toLowerCase() === '' ? item :
                            item.englishName.toLowerCase().includes(search.toLowerCase()) ||
                            item.name.includes(search)
                        )
                    }).map((surah)=>(
                            <QuranCard onClick={()=>{navigate(`/surah/${surah.number}`)}} key={surah.number} number={surah.number} englisName={surah.englishName} arabicName={surah.name} />
                        ))
                    }
                </Stack>
                )
                }
            </div>
        </>
    );
    };

    export default Quran;

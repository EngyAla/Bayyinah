import { Button, CircularProgress, Stack } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useRef, useState } from "react";

const RECITER_ID = 7;    
const SurahAudio = ({surahNumber}) =>{
    const audioRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [isplaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchAudio = async ()=>{
            try{
                const responce = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${RECITER_ID}/${surahNumber}`);
                const data = await responce.json();
                setAudioUrl(data.audio_file.audio_url)
            } catch(error){
                console.log(error)
            } finally{
                setLoading(false)
            }
        }
        fetchAudio();
    },[surahNumber])
    const toggleAudio = () =>{
        if(!audioRef.current) return;
        if(isplaying){
            audioRef.current.pause();
        } else{
            audioRef.current.play();
        }
        setIsPlaying(!isplaying)
    }

    // console.log(surahNumber)
    return(
        <>
        {loading? 
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} mt={'5'}>
            <h1>Wait a second...</h1>
            <CircularProgress />
        </Stack> 
        :
        ( <>
            <Button 
                onClick={toggleAudio}
                variant="text">
                {isplaying? 'Pause Audio' : 'Play Audio'}
                {' '}
                {isplaying? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <audio ref={audioRef} src={audioUrl} />
        </>)
        }
        </>
    )
}

export default SurahAudio;

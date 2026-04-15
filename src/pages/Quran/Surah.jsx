import { Button, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import SurahAudio from "./SurahAudioPlayer";

const SurahDeatails = () =>{
    const {id} = useParams();
    // console.log(id)
    const [ayahs, setAyahs] = useState([]);
    const [surahName, setSurahName] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        fetch(`https://api.alquran.cloud/v1/surah/${id}`)
        .then((res) => res.json())
        .then((data) =>{
            setAyahs(data.data.ayahs) 
            setSurahName(data.data.name)
            setLoading(false)
        })
        .catch((error)=>{
            console.error(error)
            setLoading(true)
        })
    }, [id])
    return(
        <>
            {loading ? 
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} mt={'5'}>
                <h1>Wait a second...</h1>
                <CircularProgress />
            </Stack> :
            (
                <div style={{ padding: '20px', direction: 'rtl', textAlign: 'center', width:'100%', display: 'flex', justifyContent:'center', alignItems: 'center',flexDirection:'column' }}>
                    <h2 style={{fontSize: '32px', marginBottom: '10px'}}> {surahName}</h2>
                    <Stack sx={{fontSize:'14px', gap: {lg: 35}}} direction={'row'} justifyContent={'space-between'} mb={5}>
                        <SurahAudio surahNumber={id} />
                        <Button variant="text">Surah Info&nbsp;<InfoIcon /></Button>
                    </Stack>
                    {
                        ayahs.map((ayah, index) =>{
                        const isPreviousPage = index > 0 ? ayahs[index -1].page : ayah.page;
                        const isNewPage = ayah.page !== isPreviousPage;

                        const isFirstAyah = ayah.numberInSurah === 1;
                        const basmala = 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ';
                        const containBesmala = isFirstAyah && ayah.text.startsWith(basmala);

                        const basmalaText = containBesmala ? basmala : '';
                        let resultOfAyah = containBesmala ? ayah.text.replace(basmala, '').trim() : ayah.text;
                        return(
                                <div key={ayah.number} className="quran_contaier" >
                                    
                                    {
                                        isNewPage && (
                                            <>
                                            <p style={{margin: '30px 0 0',color: '#888', fontSize:'12px'}}>{ayah.page}</p>
                                            <Divider style={{ borderTop: '2px solid #aaa', margin: '10px 0 20px' }}/>
                                            </>
                                        )
                                    }
                                    {
                                        basmala && (
                                            <>
                                            <Typography variant="h4" mb={3} sx={{fontFamily: 'Amiri'}}>
                                            {basmalaText}
                                            </Typography>
                                            </>
                                            
                                        )
                                    }
                                    {resultOfAyah && (
                                    <span className="quran_text" style={{ fontSize: '24px', textAlign: 'center'}}>
                                        {resultOfAyah} <span style={{ color: '#888', fontSize:"16px" }}>({ayah.numberInSurah})</span>
                                    </span>
                                    )}
                                </div>
                            )
                        })
                        
                    }
                    
                </div>
            )}
        </>
    )
}

export default SurahDeatails;
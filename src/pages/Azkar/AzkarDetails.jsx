import { useEffect, useState } from 'react';
import adhkar from './adhkar.json'
import { useParams } from "react-router-dom";
import { Button, Paper, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


const AzkarDetails = ()=>{
    // category from main.jsx file
    const {category} = useParams();
    const decoded = decodeURIComponent(category);
    const [azkar, setAzkar] = useState([]);
    // console.log(category)

    useEffect(() =>{
        const found = adhkar.find((c) => c.category === decoded)
        setAzkar(found ? found.array : [])
    },[decoded])

    const handelZkeCont = (index)=>{
        // navigator.clipboard.writeText(zkr.text);
        setAzkar(prevZkr => 
            prevZkr.map((zkr, i) =>(
                i === index && zkr.count > 0 ? {...zkr, count: zkr.count -1} : zkr
            ))
        )
    }

    return(
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
        <Typography variant='h4' mb={5}>{decoded}</Typography>
        {azkar.map((zkr, i) => (
        <Paper className={` ${zkr.count > 0 ? 'azkar_card' : 'hidden_card'}`} onClick={()=> {handelZkeCont(i)}} key={i} sx={{ p: 2, mb: 3, width: '70%',boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.25)'}} >
            <Stack spacing={1}>
                <Typography sx={{textAlign: 'center', fontSize:'18px'}}>{zkr.text}</Typography>
                {zkr.count && <Typography>التكرار:{zkr.count} </Typography>}
                {zkr.reference && <Typography>📚 المرجع: {zkr.reference}</Typography>}
            </Stack>
        </Paper>
    ))}
        </div>
        </>
    )
}

export default AzkarDetails;
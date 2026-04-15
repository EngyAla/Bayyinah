import { Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Tasbih = ()=> {
    const [count, setCount] = useState(0);
    const theme = useTheme();
        useEffect(() => {
            const saved_count = localStorage.getItem("tasbih")
            if(saved_count != null){
                setCount(JSON.parse(saved_count))
            }
        }, [])
    const handelCount = () =>{
        setCount(prevCount =>{
            const newCount = prevCount +1;
            localStorage.setItem("tasbih", JSON.stringify(newCount));
            return newCount
        })
    }
    const restCount = ()=>{
        setCount(0)
        localStorage.setItem("tasbih", JSON.stringify(0))
    }

    return(
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', marginTop: "20px" }}>
            {/* <Typography variant="h3" marginBottom={4}>
                سبحة إلكترونية
            </Typography> */}
            <Paper sx={{ p: 2, mb: 3, width: '70%',boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.25)'}}>
                <Stack direction={'column'} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
                    <Paper sx={{padding: '10px 80px', fontSize:"20px" }} variant="outlined">
                        {count}
                    </Paper>
                    <Paper onClick={()=> restCount()} className="click_tasbih" variant="outlined" sx={{width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', marginTop: '20px', marginLeft: "90%",
                    backgroundColor: `${theme.palette.
                    // @ts-ignore
                    tasbih_card.primary}`}}>
                    </Paper>
                    <Paper onClick={()=> handelCount()} className="click_tasbih" variant="outlined" sx={{width: '22vw', height: '22vw', borderRadius: '50%', cursor: 'pointer', marginTop: '40px', marginBottom: '50px',backgroundColor: `${theme.palette.
// @ts-ignore
                    tasbih_card.primary}`}}>
                    </Paper>
                </Stack>
            </Paper>
        </div>
        </>
    )
}

export default Tasbih;

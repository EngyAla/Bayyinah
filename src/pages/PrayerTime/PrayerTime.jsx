// @ts-ignore
import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PrayerCard from "./PrayerCard";
// @ts-ignore
import fajr from '../../assets/fajr2.jpg'
// @ts-ignore
import dhuhr from '../../assets/dhuhr.webp'
// @ts-ignore
import asr from '../../assets/asr.jpg'
// @ts-ignore
import maghrib from '../../assets/maghrib.webp'
// @ts-ignore
import isha from '../../assets/isha.jpg'
import { useEffect, useState } from "react";
import moment from "moment";
// import { useTimer } from '../Context/TimerContext'



const PrayerTime = ()=> {
    const theme = useTheme();
    // كان ممكن امسح الجزء المشترك بين هنا وبين TimerContext بس هسيبه كامل عشان لو احتجت ارجعله ابقي فاهماه
    const [city, setCity] = useState('Cairo');
    const [today, setToday] = useState('')
    const [timings, setTimings] = useState({})
    const [nextPrayer, setNextPrayer] = useState("")
    const [remainingTime, setRemainingTime] = useState("")
    // const {remainingTime, setRemainingTime} = useTimer();
    const handleChange = (event) => {
        setCity(event.target.value);
    };
    // console.log(city)
    useEffect(()=>{
        fetch(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}&timeformat=24`)
        .then(response => response.json())
        .then((result) => {
            // console.log(result)
            setTimings(result.data.timings)
        })

    },[city])

    useEffect(() =>{
        const t = moment();
        setToday(t.format('MMMM Do YYYY, h:mm'))
        let interval = setInterval(() => {
            setCountDownTimer()
            
        }, 1000)
        return () =>{
            clearInterval(interval)
        }
    }, [timings])

    const setCountDownTimer = ()=>{
        if(!timings) return;
        const momentNow = moment();
        // const fajr = timings['Fajr']
        // const fajrMomentObj = moment(fajr, 'hh:mm')
        // console.log(fajr)
        // console.log(fajrMomentObj)
        // console.log(momentNow.isBefore(fajrMomentObj))

        // I should use local variable to update NextPrayer if I will use setNextPrayer and NextPrayer in the same scope because NextPrayer will still "empty"
        let upComingPrayer = '';
        if(momentNow.isAfter(moment(timings['Fajr'], 'hh:mm')) && momentNow.isBefore(moment(timings['Dhuhr'], 'hh:mm'))){
            upComingPrayer = "Dhuhr";
        } else if(momentNow.isAfter(moment(timings['Dhuhr'], 'hh:mm')) && momentNow.isBefore(moment(timings['Asr'], 'hh:mm'))){
            upComingPrayer = "Asr";
        } else if(momentNow.isAfter(moment(timings['Asr'], 'hh:mm')) && momentNow.isBefore(moment(timings['Maghrib'], 'hh:mm'))){
            upComingPrayer = "Maghrib";
        } else if(momentNow.isAfter(moment(timings['Maghrib'], 'hh:mm')) && momentNow.isBefore(moment(timings['Isha'], 'hh:mm'))){
            upComingPrayer = "Isha";
        } else{
            upComingPrayer = "Fajr";
        }
        setNextPrayer(upComingPrayer);
        const nextPrayerTime = timings[upComingPrayer];
        // remaingTime =        nextPrayerTime  -  momentNow;
        // this remaingTime is good for every prayers except fajr/ if time now is 10:00 after Isha and fajr is in 04:00
        //so the difference 04:00 - 10:00 => negative value "inCorrect"
        // and the correct way is to use midnight time (23:59 - 22:00)+(4:00 - 00:00)
        // I will use condiction for only fajr prayer
        let remaingTime = moment(nextPrayerTime, 'hh:mm').diff(momentNow)

        if(upComingPrayer === 'Fajr'){
            const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
            const fajrToMidNightDiff = moment(timings['Fajr'], 'hh:mm:ss').diff(moment("00:00:00", "hh:mm:ss"));
            const totalRemaingTimeForFajr = midNightDiff + fajrToMidNightDiff;
            remaingTime = totalRemaingTimeForFajr;
        }

        const durationRemainingTime = moment.duration(remaingTime);
        setRemainingTime(`${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`)
        // console.log(durationRemainingTime.hours())
        // console.log(durationRemainingTime.minutes())
        // console.log(durationRemainingTime.seconds())

        // console.log(nextPrayerTime)
        // console.log(remaingTime)
    }

const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الجيزة", value: "Giza" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الدقهلية", value: "Dakahlia" },
    { name: "البحر الأحمر", value: "Red Sea" },
    { name: "البحيرة", value: "Beheira" },
    { name: "الفيوم", value: "Faiyum" },
    { name: "الغربية", value: "Gharbia" },
    { name: "الإسماعيلية", value: "Ismailia" },
    { name: "المنوفية", value: "Monufia" },
    { name: "المنيا", value: "Minya" },
    { name: "القليوبية", value: "Qalyubia" },
    { name: "الوادي الجديد", value: "New Valley" },
    { name: "السويس", value: "Suez" },
    { name: "أسوان", value: "Aswan" },
    { name: "أسيوط", value: "Asyut" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "بورسعيد", value: "Port Said" },
    { name: "دمياط", value: "Damietta" },
    { name: "الشرقية", value: "Sharqia" },
    { name: "جنوب سيناء", value: "South Sinai" },
    { name: "كفر الشيخ", value: "Kafr El Sheikh" },
    { name: "مطروح", value: "Matruh" },
    { name: "الأقصر", value: "Luxor" },
    { name: "قنا", value: "Qena" },
    { name: "شمال سيناء", value: "North Sinai" },
    { name: "سوهاج", value: "Sohag" }
];

    return(
        <div className="prayerTime_container">
        <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', margin:"0px 20px"}}>
            <Stack>
                <Typography variant="body2" color={theme.palette.text.secondary}>{today}</Typography>
                <Typography variant="h3" fontWeight={500}>{city}</Typography>
            </Stack>
            <Stack>
                <Typography variant="body2" color={theme.palette.text.secondary}>Remaining until the <span style={{fontWeight: "800", fontSize: "18px"}}>{nextPrayer}</span> prayer</Typography>
                <Typography variant="h3" fontWeight={500}>{remainingTime}</Typography>
            </Stack>        
            <Box ml={-70} />
        </div>
        <Divider style={{margin: "20px 0px"}}/>
        <Stack direction={'row'} gap={1.8} mt={5} flexWrap={"wrap"} justifyContent={'start'}>
            <PrayerCard title={'Fajr'} time={timings['Fajr']} image={maghrib}/>
            <PrayerCard title={'Dhuhr'} time={timings['Dhuhr']} image={dhuhr}/>
            <PrayerCard title={'Asr'} time={timings['Asr']} image={asr}/>
            <PrayerCard title={'Maghrib'} time={timings['Maghrib']} image={fajr}/>
            <PrayerCard title={'Isha'} time={timings['Isha']} image={isha}/>
        </Stack>
        <Box sx={{ minWidth: 220 }}  mt={5} display={'flex'} justifyContent={'center'}>
            <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Age"
                onChange={handleChange}
                >
                {cities.map((c,index) =>(
                    <MenuItem key={index} value={c.value}>{c.name}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
        </div>
    )
}

export default PrayerTime;
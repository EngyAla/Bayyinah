import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";

const TimerContext = createContext(null);

export const TimerProvider  = ({children}) =>{
        const [city, setCity] = useState('Cairo');
        const [today, setToday] = useState('')
        const [timings, setTimings] = useState({})
        const [nextPrayer, setNextPrayer] = useState("")
        const [remainingTime, setRemainingTime] = useState("")

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

            let remaingTime = moment(nextPrayerTime, 'hh:mm').diff(momentNow)
    
            if(upComingPrayer === 'Fajr'){
                const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
                const fajrToMidNightDiff = moment(timings['Fajr'], 'hh:mm:ss').diff(moment("00:00:00", "hh:mm:ss"));
                const totalRemaingTimeForFajr = midNightDiff + fajrToMidNightDiff;
                remaingTime = totalRemaingTimeForFajr;
            }
    
            const durationRemainingTime = moment.duration(remaingTime);
            setRemainingTime(`${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`)
        }
    return(
        <TimerContext.Provider value={{
            city, setCity,
            today,
            timings,
            nextPrayer,
            remainingTime
            }}>
            {children}
        </TimerContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useTimer = () => useContext(TimerContext);
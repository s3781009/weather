import React, {useState} from 'react';
import cloudy from './static/cloudy.svg';
import rainy from './static/rainy-1.svg';
import clear from './static/day.svg';
import clearNight from './static/night.svg'
import cloudyNight from './static/cloudy-night-1.svg'
import './Weather.css';
const Weather = (props) => {
    let icon;
    const [time, setTime] = useState('');
    var date = new Date((props.time ) * 1000);
    switch (props.description){
        case "Clouds":
            if(date.getUTCHours()>=20 || date.getUTCHours()<6){
               icon =cloudyNight;
            }
            else{icon=cloudy;}
           break;
        case "Rain":
            if(date.getUTCHours()>=20 || date.getUTCHours()<6){
                icon =rainy;
            } else{icon=rainy;}
            break;
        case "Clear":
            if(date.getUTCHours()>=20 || date.getUTCHours()<6){
                icon =clearNight;
            }
            else{icon=clear;}
            break;
        default:
            break;
    }

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let dateString = date.getUTCHours() + " AM";
    if(date.getUTCHours() > 12 ){
        dateString = date.getUTCHours()-12 + " PM";
    }
    if(date.getUTCHours() === 12 ){
        dateString = date.getUTCHours() + " PM";
    }
    if(date.getUTCHours() ===0 ){
        dateString = 12 + " AM";
    }

    return (
        <div className="litem">
            <p className={"temp-forecast"}>{dateString}</p>
            <img src={icon}/>
            <p className="temp-next">{props.temp} {props.unit}</p>
        </div>
    );
};

export default Weather;

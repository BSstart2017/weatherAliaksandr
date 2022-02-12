import React, {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import {getImgWeatherBackground, getWeatherData} from "../../redux/Selectors/WeatherBitSelector";


const WeatherBackground : FC = () => {

    const weatherData = useSelector(getWeatherData)
    const imgWeatherBackground = useSelector(getImgWeatherBackground)
    const imgServerProblem = `${process.env.PUBLIC_URL}/assets/images/ServerProblem.jpg`

    const ImgWeatherBackgroundMemo = useMemo(() => imgWeatherBackground.map(
            (imgWeather) => {
                if (weatherData && imgWeather.code === weatherData.weather.code ) {
                    return <img key={imgWeather.code}
                                style={{width: '100%', height: '100%', position: "relative"}}
                                src={imgWeather ? imgWeather.img : imgServerProblem} alt={"imgServerProblem"}/>
                } else { return null }
            })
        , [imgServerProblem, imgWeatherBackground, weatherData])

    return (
        <>
            {weatherData ? ImgWeatherBackgroundMemo
                : <img style={{width: '100%', height: '100%', position: "relative"}}
                       src={imgServerProblem} alt="imgServerProblem"/>}
        </>
    )
}

export {WeatherBackground}

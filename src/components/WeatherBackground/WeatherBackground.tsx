import React, {FC, useMemo} from "react"
import {useSelector} from "react-redux"
import {getImgWeatherBackground, getWeatherData} from "../../redux/Selectors/WeatherBitSelector"
import styles from "./WeatherBackground.module.css"

const WeatherBackground : FC = () => {

    const imgServerProblem = `${process.env.PUBLIC_URL}/assets/images/ServerProblem.jpg`

    const weatherData = useSelector(getWeatherData)
    const imgWeatherBackground = useSelector(getImgWeatherBackground)

    const ImgWeatherBackgroundMemo = useMemo(() => imgWeatherBackground.map(
            (imgWeather) => {
                    if (weatherData && imgWeather.code === weatherData.weather.code ) {
                        return <img key={imgWeather.code}
                                    className={styles.backgroundImages}
                                    src={imgWeather ? imgWeather.img : imgServerProblem} alt={"imgServerProblem"}/>
                    } else { return null }
                }
            ), [imgServerProblem, imgWeatherBackground, weatherData])

    return (
        <>
            { weatherData
                ? ImgWeatherBackgroundMemo
                : <img className={styles.backgroundImages} src={imgServerProblem} alt="imgServerProblem"/>}
        </>
    )
}

export {WeatherBackground}

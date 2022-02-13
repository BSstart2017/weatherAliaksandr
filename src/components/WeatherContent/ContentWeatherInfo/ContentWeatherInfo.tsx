import React, {FC} from "react"
import {Col} from "antd"
import {useSelector} from "react-redux"
import {getWeatherData} from "../../../redux/Selectors/WeatherBitSelector"
import styles from "./ContentWeatherInfo.module.css"

const ContentWeatherInfo: FC = () => {

    const weatherData = useSelector(getWeatherData)

    const iconWeather = `https://www.weatherbit.io/static/img/icons/${weatherData?.weather.icon}.png`
    const imgServerProblem = `${process.env.PUBLIC_URL}/assets/images/ServerProblem.jpg`
    
    return (
        <>
            {weatherData && <Col xl={7} md={12} sm={22} xs={22}  className={styles.container}>
                <img className={styles.iconImages}
                     src={weatherData.weather.icon ? iconWeather : imgServerProblem}
                     alt={'imgServerProblem'}/>
                <div className={styles.contentHeader}>
                    <p>{weatherData.weather.description}</p>
                    <p>{weatherData.temp} °C</p>
                </div>
                <div className={styles.contentBottom}>
                    <p>Last update time: {weatherData.ob_time}</p>
                    <p>
                        {weatherData.city_name + ' ' + weatherData.country_code + ' ' + weatherData.timezone}
                    </p>
                    <p>
                        Pressure: {weatherData.pres} Wind direction: {weatherData.wind_dir}
                    </p>
                    <p>Relative humidity: {weatherData.rh}%</p>
                    <p>Cloud coverage: {weatherData.clouds}%</p>
                    <p>Visibility: {weatherData.vis}KM</p>
                </div>
            </Col>
            }
        </>
    )
}

export {ContentWeatherInfo}
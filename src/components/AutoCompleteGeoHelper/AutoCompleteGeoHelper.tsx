import React, {FC, useCallback, useEffect, useState} from "react"
import {AutoComplete, Button, Col} from "antd"
import {
    actions,
    getHelperCityThunk,
    getWeatherBitCityIntervalThunk,
    getWeatherBitCityThunk
} from "../../redux/WeatherBitReducer"
import {useDispatch, useSelector} from "react-redux"
import {getHelperCityResult, getIsErrorCity, getWeatherData} from "../../redux/Selectors/WeatherBitSelector"
import styles from "./AutoCompleteGeoHelper.module.css"

const AutoCompleteGeoHelper: FC = () => {

    const delay = 600000 //5 min

    const dispatch = useDispatch()

    const helperCityResult = useSelector(getHelperCityResult)
    const weatherData = useSelector(getWeatherData)
    const isErrorCity = useSelector(getIsErrorCity)

    const [helperCityName, setHelperCityName] = useState<string>('')
    const [weatherInterval, setWeatherInterval] = useState<NodeJS.Timer | null>(null)

    const handlerSearchCity = useCallback((city: string) => {
        if (city.length >= 2) dispatch(getHelperCityThunk(city))
    }, [dispatch])

    const handlerSelectCity = useCallback((city: string) => {
        dispatch(getWeatherBitCityThunk(city))
        setHelperCityName('')
    }, [dispatch])

    const handlerChangeCity = useCallback((city: string) => {
        setHelperCityName(city)
    }, [])

    const handlerClickSearch = useCallback(() => {
        dispatch(getWeatherBitCityThunk(helperCityName))
        setHelperCityName('')
    }, [dispatch, helperCityName])
    
    const handlerClickAutoComplete = useCallback(() => {
        dispatch(actions.setIsErrorCity(false))
    }, [dispatch])


    useEffect(() => {
        if (!weatherData){
            return
        }
        if (weatherInterval === null) {
            setWeatherInterval(setInterval(() =>
                dispatch(getWeatherBitCityIntervalThunk(weatherData.city_name)), delay)
            )
        } else {
            clearInterval(weatherInterval)
            setWeatherInterval(setInterval(() =>
                dispatch(getWeatherBitCityIntervalThunk(weatherData.city_name)), delay)
            )
        }
    }, [dispatch, weatherData])

    return (
       <>
           <Col xl={4} md={8} sm={8} xs={0} className={styles.containerPositionEnd}>
               <span>RADAR Geo Helper</span>
           </Col>
           <Col xl={5} md={8} sm={12} xs={16} className={styles.containerPositionCenter}>
               <AutoComplete
                   autoFocus={true}
                   value={helperCityName}
                   onClick={handlerClickAutoComplete}
                   className={styles.autoComplete}
                   options={helperCityResult}
                   onSelect={handlerSelectCity}
                   onSearch={handlerSearchCity}
                   onChange={handlerChangeCity}
                   placeholder="Enter the name of the city"
               />
               {isErrorCity &&
                   <span className={styles.errorMessage} >No city found!!</span>
               }
           </Col>
           <Col xl={11} md={4} sm={4} xs={8} >
               <Button type={"primary"} disabled={helperCityName.length === 0} onClick={handlerClickSearch}>
                   Search
               </Button>
           </Col>
       </>
    )
}

export {AutoCompleteGeoHelper}


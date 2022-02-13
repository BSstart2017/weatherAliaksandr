import React, {FC, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {actions, getWeatherLatLonThunk} from "./redux/WeatherBitReducer"
import {getIsLoading, getWeatherSeniorData} from "./redux/Selectors/WeatherBitSelector"
import {Col, Layout, Row} from "antd"
import {AutoCompleteGeoHelper} from "./components/AutoCompleteGeoHelper"
import {WeatherContent} from "./components/WeatherContent"
import {WeatherBackground} from "./components/WeatherBackground"
import {getBrowserLocation, PositionType} from "./utils/geo"
import {Preloader} from "./components/common/Preloader"
import styles from "./App.module.css"

const App: FC = () => {

    const dispatch = useDispatch()
    const weatherSeniorData = useSelector(getWeatherSeniorData)
    const hasMounted = useRef<boolean>(false)
    const isLoading = useSelector(getIsLoading)

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true
            //get localStorage
            const localStorageWeatherSeniorData = localStorage.getItem('WeatherSeniorData')
            if (localStorageWeatherSeniorData) {
                dispatch(actions.setWeatherSeniorData(JSON.parse(localStorageWeatherSeniorData)))
            }
            //Get/Set geoCode
            getBrowserLocation().then((curLoc: PositionType)=>{
                dispatch(getWeatherLatLonThunk(curLoc))
            }).catch((defaultLocation: PositionType) =>{
                dispatch(getWeatherLatLonThunk(defaultLocation))
            })
        } else if (weatherSeniorData?.length !== 0) {
            localStorage.setItem('WeatherSeniorData', JSON.stringify(weatherSeniorData))
        }
    }, [dispatch, weatherSeniorData])


    return (
        <div className={styles.container}>
            <WeatherBackground/>
            {!isLoading
                ?  <Layout className={styles.containerLayout}>
                        <Row className={styles.containerHeader}  align={"middle"}>
                            <AutoCompleteGeoHelper/>
                            <Col xl={4} md={0} sm={0} xs={0} className={styles.containerPositionCenter}>
                                <span>WEATHER APP</span>
                            </Col>
                        </Row>
                        <WeatherContent/>
                    </Layout>
                : <Preloader />
            }
        </div>
    )
}

export default App;

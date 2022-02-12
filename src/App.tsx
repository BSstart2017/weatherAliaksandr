import React, {FC, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actions} from "./redux/WeatherBitReducer";
import { getWeatherSeniorData } from "./redux/Selectors/WeatherBitSelector";
import {Layout, Row} from "antd";
import {AutoCompleteGeoHelper} from "./components/AutoCompleteGeoHelper";
import {WeatherContent} from "./components/WeatherContent";
import {WeatherBackground} from "./components/WeatherBackground";

const App: FC = () => {

    const dispatch = useDispatch()
    const weatherSeniorData = useSelector(getWeatherSeniorData)
    const hasMounted = useRef<boolean>(false)

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            const localStorageWeatherSeniorData = localStorage.getItem('WeatherSeniorData')
            if(localStorageWeatherSeniorData)dispatch(actions.setWeatherSeniorData(JSON.parse(localStorageWeatherSeniorData)))
        } else if (weatherSeniorData?.length !== 0) {
            localStorage.setItem('WeatherSeniorData', JSON.stringify(weatherSeniorData))
        }
    },[dispatch, weatherSeniorData])

    return (
        <div style={{width: '100vw', height: '100vh'}}>
           <WeatherBackground />
            <Layout style={{position: "absolute", top: '10%', width: '100%', backgroundColor: 'unset'}}>
                <Row justify={'space-around'} style={{marginBottom: '50px'}}>
                    <span style={{color: 'white'}}>WEATHER APP</span>
                        <AutoCompleteGeoHelper />
                </Row>
                <WeatherContent/>
            </Layout>
        </div>

    )
}

export default App;

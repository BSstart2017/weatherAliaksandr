import React, {FC, useCallback, useState} from "react"
import {AutoComplete, Button, Col, Row} from "antd";
import {getHelperCityThunk, getWeatherBitCityThunk} from "../../redux/WeatherBitReducer";
import {useDispatch, useSelector} from "react-redux";
import {getHelperCityResult} from "../../redux/Selectors/WeatherBitSelector";

const AutoCompleteGeoHelper: FC= () => {
    const dispatch = useDispatch()
    const helperCityResult = useSelector(getHelperCityResult)
    const [helperCityName, setHelperCityName] = useState<string>('');

    const handlerSearchCity = useCallback((city: string) => {
        if(city.length >= 2) dispatch(getHelperCityThunk(city))
    },[dispatch])

    const handlerSelectCity = useCallback((city: string) => {
        dispatch(getWeatherBitCityThunk(city))
    }, [dispatch])

    const handlerChangeCity = useCallback((city: string) => {
        setHelperCityName(city)
    }, [])

    const handlerClickSearch = useCallback(() => {
        dispatch(getWeatherBitCityThunk(helperCityName))
    }, [dispatch, helperCityName])
    
    return (
        <Row gutter={[16, 16]} align={"middle"}>
            <Col>
                <span style={{color: 'white'}}>RADAR</span>
            </Col>
            <Col>
                <AutoComplete
                    autoFocus={true}
                    value={helperCityName}
                    style={{width:200}}
                    options={helperCityResult}
                    onSelect={handlerSelectCity}
                    onSearch={handlerSearchCity}
                    onChange={handlerChangeCity}
                    placeholder="Enter the name of the city"
                />
            </Col>
            <Col>
                <Button type={"primary"} disabled={helperCityName.length === 0} onClick={handlerClickSearch}>
                    Search
                </Button>
            </Col>
        </Row>
    )
}

export {AutoCompleteGeoHelper}


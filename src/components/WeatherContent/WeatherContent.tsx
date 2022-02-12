import React, {FC, useCallback} from 'react'
import {Button, Col, Divider, Row, Table} from "antd";
import {useSelector} from "react-redux";
import {getWeatherData, getWeatherSeniorDataTable} from "../../redux/Selectors/WeatherBitSelector";


const WeatherContent: FC = () => {

    const weatherData = useSelector(getWeatherData)
    const weatherSeniorDataTable = useSelector(getWeatherSeniorDataTable)
    const iconWeather = `https://www.weatherbit.io/static/img/icons/${weatherData?.weather.icon}.png`
    const imgServerProblem = `${process.env.PUBLIC_URL}/assets/images/ServerProblem.jpg`

    const columns = [
        { title: 'City', dataIndex: 'city' },
        { title: 'Temperature', dataIndex: 'temperature' },
        { title: 'Region', dataIndex: 'region' },
        { title: 'Date', dataIndex: 'date' },
        {
            title: 'Action',
            dataIndex: '',
            render: (field:any) => <Button onClick={()=>handlerClickDeleteFields(field)} type={"primary"} danger >Delete</Button>,
        },
    ];



    const handlerClickDeleteFields = useCallback((field)=>{
        console.log(field)
    },[])

    if(!weatherData) return null
    return (
        <Row justify={'center'}>
            <Col span={10}>
                <Divider orientation="center" style={{color: "yellow"}}>Request History</Divider>
                <Table
                    columns={columns}
                    dataSource={weatherSeniorDataTable}
                />
            </Col>
            <Col span={12} style={{textAlign: 'center', color: "blue", fontWeight: "bold"}}>
                <img style={{height: 100, width: 100}}
                     src={weatherData.weather.icon ? iconWeather : imgServerProblem}
                     alt={'imgServerProblem'}/>
                <p style={{fontSize: "32px", margin: '5px'}}>{weatherData.weather.description}</p>
                <p style={{fontSize: "32px", margin: '5px'}}>{weatherData.temp} °C</p>
                <p style={{
                    fontSize: "18px",
                    margin: '5px'
                }}>{weatherData.city_name + ' ' + weatherData.country_code + ' ' + weatherData.timezone}</p>
                <p style={{fontSize: "18px", margin: '5px'}}>Pressure: {weatherData.pres} Wind
                    direction: {weatherData.wind_dir}</p>
                <p style={{fontSize: "18px", margin: '5px'}}>Relative humidity: {weatherData.rh}%</p>
                <p style={{fontSize: "18px", margin: '5px'}}>Cloud coverage: {weatherData.clouds}%</p>
                <p style={{fontSize: "18px", margin: '5px'}}>Visibility: {weatherData.vis}KM</p>
                <p style={{fontSize: "18px", margin: '5px'}}>Last update time: {weatherData.ob_time}</p>
            </Col>
        </Row>
    )
}

export {WeatherContent}

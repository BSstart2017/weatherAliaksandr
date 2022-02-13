import React, {FC} from "react"
import {Row} from "antd"
import {ContentTable} from "./ContentTable"
import {ContentWeatherInfo} from "./ContentWeatherInfo"

const WeatherContent: FC = () => {
    return (
        <Row justify={'center'} >
            <ContentTable/>
            <ContentWeatherInfo/>
        </Row>
    )
}

export {WeatherContent}

import { AppStateType } from "../store"
import {createSelector} from "reselect";
import {WeatherBitCityDataType} from "../../api/WeatherbitApi";

export const getWeatherData = (state: AppStateType) => state.WeatherBitReducer.weatherData
export const getImgWeatherBackground = (state: AppStateType) => state.WeatherBitReducer.imgWeatherBackground
export const getHelperCityData = (state: AppStateType) => state.WeatherBitReducer.helperCityData
export const getWeatherSeniorData = (state: AppStateType) => state.WeatherBitReducer.weatherSeniorData

export const getWeatherSeniorDataTable = createSelector(getWeatherSeniorData, (weatherSeniorData: WeatherBitCityDataType[] | null) : Array<WeatherSeniorDataTableType> | undefined =>{
    if (weatherSeniorData){
        return  [...weatherSeniorData.map((result: WeatherBitCityDataType, index) => ({key: index ,
            city: result.city_name,region: result.timezone,temperature: result.temp, date:result.ob_time}))]
    }
})

export const getHelperCityResult = createSelector(getHelperCityData, (helperCityDat) : Array<HelperCityResultType> | undefined =>{
    if (helperCityDat){
        return  [...helperCityDat.result.map((result) =>( result.name ) )]
            .filter((item, index, array)=> array.indexOf(item) === index)
            .map(item=>({value: item, label: item}))
    }
})

export type HelperCityResultType = {
    value: string
    label: string
}

export type WeatherSeniorDataTableType = {
    key: number
    city: string
    temperature: number
    region: string
    date: string
}
import {BaseThunkType, InferActionType} from "./store"
import weatherBitApi, {WeatherBitCityDataType} from "../api/WeatherbitApi";
import geoHelperApi, {HelperCityType} from "../api/GeohelperApi";

let defaultState = {
    weatherData : null as null | WeatherBitCityDataType,
    weatherSeniorData : null as null | Array<WeatherBitCityDataType>,
    imgWeatherBackground : [
        {code: 200, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 201, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 202, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 230, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 231, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 232, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 233, img: `${process.env.PUBLIC_URL}/assets/images/ThunderstormWithLightRain.jpg` },
        {code: 300, img: `${process.env.PUBLIC_URL}/assets/images/LightDrizzle.jpg` },
        {code: 301, img: `${process.env.PUBLIC_URL}/assets/images/LightDrizzle.jpg` },
        {code: 302, img: `${process.env.PUBLIC_URL}/assets/images/LightDrizzle.jpg` },
        {code: 500, img: `${process.env.PUBLIC_URL}/assets/images/LightRain.jpg` },
        {code: 501, img: `${process.env.PUBLIC_URL}/assets/images/LightRain.jpg` },
        {code: 502, img: `${process.env.PUBLIC_URL}/assets/images/LightRain.jpg` },
        {code: 511, img: `${process.env.PUBLIC_URL}/assets/images/LightRain.jpg` },
        {code: 520, img: `${process.env.PUBLIC_URL}/assets/images/ShowerRain.jpg` },
        {code: 521, img: `${process.env.PUBLIC_URL}/assets/images/ShowerRain.jpg` },
        {code: 522, img: `${process.env.PUBLIC_URL}/assets/images/ShowerRain.jpg` },
        {code: 600, img: `${process.env.PUBLIC_URL}/assets/images/ShowerRain.jpg` },
        {code: 601, img: `${process.env.PUBLIC_URL}/assets/images/ShowerRain.jpg` },
        {code: 602, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 610, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 611, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 612, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 621, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 622, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 623, img: `${process.env.PUBLIC_URL}/assets/images/HeavySnow.jpg` },
        {code: 700, img: `${process.env.PUBLIC_URL}/assets/images/Fog.jpg` },
        {code: 711, img: `${process.env.PUBLIC_URL}/assets/images/Fog.jpg` },
        {code: 721, img: `${process.env.PUBLIC_URL}/assets/images/Fog.jpg` },
        {code: 731, img: `${process.env.PUBLIC_URL}/assets/images/Fog.jpg` },
        {code: 741, img: `${process.env.PUBLIC_URL}/assets/images/Fog.jpg` },
        {code: 751, img: `${process.env.PUBLIC_URL}/assets/images/Fog.jpg` },
        {code: 800, img: `${process.env.PUBLIC_URL}/assets/images/CleareSky.jpg` },
        {code: 801, img: `${process.env.PUBLIC_URL}/assets/images/BrokenClouds.jpg` },
        {code: 802, img: `${process.env.PUBLIC_URL}/assets/images/BrokenClouds.jpg` },
        {code: 803, img: `${process.env.PUBLIC_URL}/assets/images/BrokenClouds.jpg` },
        {code: 804, img: `${process.env.PUBLIC_URL}/assets/images/BrokenClouds.jpg` },
        {code: 900, img: `${process.env.PUBLIC_URL}/assets/images/ShowerRain.jpg` },
    ] as Array<imgWeatherBackgroundType>,
    helperCityData : null as null | HelperCityType
}

const weatherBitReducer = (state = defaultState, action: ActionType) : defaultStateType => {
  switch (action.type){
    case "weatherBit/Aliaksandr_Andreyeu/WEATHER_BIT_SUCCESS" :
      return {...state,
          weatherData: action.data}
      case "weatherBit/Aliaksandr_Andreyeu/WEATHER_BIT_SENIOR_SUCCESS" :
      return {...state,
          weatherSeniorData: state.weatherSeniorData ? [...action.data, ...state.weatherSeniorData] : action.data}
      //todo: uuid create
    case "weatherBit/Aliaksandr_Andreyeu/HELPER_CITY_SUCCESS" :
      return {...state,
          helperCityData: action.data}
    default:
      return state
  }
}

export const actions = {
   setWeatherData: (data: WeatherBitCityDataType) => ({type : 'weatherBit/Aliaksandr_Andreyeu/WEATHER_BIT_SUCCESS', data} as const),
   setWeatherSeniorData: (data: Array<WeatherBitCityDataType>) => ({type : 'weatherBit/Aliaksandr_Andreyeu/WEATHER_BIT_SENIOR_SUCCESS', data} as const),
   setHelperCityData: (data: HelperCityType) => ({type : 'weatherBit/Aliaksandr_Andreyeu/HELPER_CITY_SUCCESS', data} as const)
}

export const getWeatherBitCityThunk = (city: string): ThunkType => async (dispatch, getState) => {
    try {
        const response = await weatherBitApi.getWeatherCity(city)
        dispatch(actions.setWeatherData(response))
        dispatch(actions.setWeatherSeniorData([response]))
    } catch (err: any) {
        console.log(err)
    }
}

export const getHelperCityThunk = (city:string): ThunkType => async (dispatch, getState) => {
    try {
        const response = await geoHelperApi.getHelperCity(city)
        dispatch(actions.setHelperCityData(response))
    } catch (err: any) {
        console.log(err)
    }
}


export default weatherBitReducer;

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>

type imgWeatherBackgroundType = {
    code: number
    img: string
}
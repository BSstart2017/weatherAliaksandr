import React, {FC, useCallback} from "react"
import {Button, Col, Divider, Table} from "antd"
import {WeatherBitCityDataType} from "../../../api/WeatherBitApi"
import {actions} from "../../../redux/WeatherBitReducer"
import {useDispatch, useSelector} from "react-redux"
import {getWeatherSeniorData} from "../../../redux/Selectors/WeatherBitSelector"
import styles from "./ContentTable.module.css"

const ContentTable: FC = () => {

    const columns = [
        {title: 'City', dataIndex: 'city_name'},
        {title: 'Temperature', dataIndex: 'temp'},
        {title: 'Region', dataIndex: 'timezone'},
        {title: 'Date', dataIndex: 'ob_time'},
        {
            title: 'Action',
            render: (field: WeatherBitCityDataType) => (
                <Button onClick={() => handlerClickDeleteFields(field)} type={"primary"} danger>Delete</Button>
            )
        }
    ]

    const dispatch = useDispatch()

    const weatherSeniorData = useSelector(getWeatherSeniorData)

    const rowSelection = {
        onChange: useCallback((selectedRowKeys: React.Key[], selectedRows: WeatherBitCityDataType[]) => {
            dispatch(actions.setWeatherData(selectedRows[0]))
        }, [dispatch])
    }

    const handlerClickDeleteFields = useCallback((field: WeatherBitCityDataType) => {
        dispatch(actions.setDeleteWeatherSeniorData(field))
    }, [dispatch])

    return (
        <>
            { weatherSeniorData && <Col span={12} className={styles.container}>
                <Divider orientation="center" className={styles.divider}>Request History</Divider>
                <Table
                    loading={!weatherSeniorData}
                    rowKey={record => record.key}
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                    pagination={{defaultPageSize: 1, pageSize: 4}}
                    columns={columns}
                    dataSource={weatherSeniorData ? weatherSeniorData : []}
                />
            </Col>
            }
        </>
    )
}

export {ContentTable}
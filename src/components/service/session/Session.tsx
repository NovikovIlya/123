import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

import { Exam } from '../../../api/types'
import { useGetExamsScheduleQuery } from '../../../store/slice/studyPlanSlice'

type DataType = Omit<Exam, 'employee_id'> & {
	key: number
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Time',
		dataIndex: 'time_note',
		key: 'time_note',
		align: 'center'
	},
	{
		title: 'Address',
		dataIndex: 'building_name',
		key: 'building_name',
		align: 'center'
	},
	{
		title: 'Lecture',
		dataIndex: 'room_num',
		key: 'room_num',
		align: 'center'
	},
	{
		title: 'Subject',
		key: 'name',
		dataIndex: 'name',
		align: 'center'
	},
	{
		title: 'Teacher',
		key: 'employee_name',
		dataIndex: 'employee_name',
		align: 'center'
	}
]

export const Session = () => {
	const { data: examSchedule, isLoading } = useGetExamsScheduleQuery()
	const [data, changeData] = useState<DataType[]>([])
	console.log(examSchedule, '==========================')

	useEffect(() => {
		if (isLoading && examSchedule)
			changeData(
				//@ts-ignore
				examSchedule.map((el, index) => {
					return {
						...el,
						key: index
					}
				})
			)
	}, [examSchedule])

	return (
		<div>
			<div className="text-black text-3xl font-normal leading-7">
				Session schedule
			</div>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				className=" mt-[50px] rounded-none max-w-[1300px]"
				loading={isLoading}
			/>
		</div>
	)
}

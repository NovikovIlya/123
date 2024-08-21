import { Button, Radio, RadioChangeEvent, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

import { useGetScheduleQuery } from '../../../store/slice/scheduleSlice'

import './StyleSchedule.scss'

interface DataType {
	key: number
	name: string
	time: string
	teacher: string
	teacherId: number
	building: string
	room: string
	type: string
	links: string
}
type week =
	| 'sunday'
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
function getWeekDay(date: Date): week {
	let days: week[] = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday'
	]

	return days[date.getDay()]
}
const columns: ColumnsType<DataType> = [
	{
		title: '',
		dataIndex: 'type',
		key: 'type',
		render: item => {
			return {
				props: {
					style: {
						background: item === 'black' ? 'red' : '#B3B3B3',
						padding: '0 6.5px 0 6.5px'
					}
				},
				children: <></>
			}
		}
	},
	{
		title: 'Time',
		dataIndex: 'time',
		key: 'time',
		render: item => <p className="text-base whitespace-nowrap">{item}</p>
	},
	{
		title: 'Subject',
		dataIndex: 'name',
		key: 'name',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Teacher',
		dataIndex: 'teacher',
		key: 'teacher',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Department',
		key: 'building',
		dataIndex: 'building',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Classroom',
		key: 'room',
		dataIndex: 'room',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Period',
		key: 'period',
		dataIndex: 'duration',
		render: item => <p className="text-base">{item}</p>
	},
	{
		title: 'Link',
		key: 'links',
		dataIndex: 'links',
		render: item =>
			item.length ? (
				<Button type="link" href={item[0]}>
					Link
				</Button>
			) : (
				<p className="text-base">-</p>
			)
	}
]
export const Schedule = () => {
	const { data: schedule, isLoading } = useGetScheduleQuery()
	const [data, setData] = useState<DataType[] | undefined>()

	useEffect(() => {
		if (schedule) {
			const changedData = schedule[date].map((el, index) => ({
				...el,
				key: index
			}))
			setData(changedData)
		}
	}, [schedule])

	const onChange = (e: RadioChangeEvent) => {
		//@ts-ignore
		setData(schedule[e.target.value])
	}
	const date = getWeekDay(new Date(Date.now()))

	return (
		<div className="mt-14 mx-14 radio">
			<div className="mb-14 text-[28px]">My schedule</div>
			<Radio.Group
				onChange={onChange}
				defaultValue={date}
				buttonStyle="solid"
				className="flex gap-[10px] h-9"
			>
				<Radio.Button
					className="rounded-full bg-transparent h-full flex items-center  text-base"
					value="monday"
				>
					Monday
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="tuesday"
				>
					Tuesday
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="wednesday"
				>
					Wednesday
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="thursday"
				>
					Thursday
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="friday"
				>
					Friday
				</Radio.Button>
				<Radio.Button
					className="rounded-full h-full flex items-center text-base bg-transparent"
					value="saturday"
				>
					Saturday
				</Radio.Button>
			</Radio.Group>
			<div className="my-10 gap-5 flex">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					loading={isLoading}
					className="max-w-[1050px] w-full  rounded-none"
				/>
			</div>
		</div>
	)
}

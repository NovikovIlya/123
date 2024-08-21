import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	DatePicker,
	Input,
	Select,
	Space,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IEducationError, IEducationState } from '../../../api/types'
import { useAppSelector } from '../../../store'
import {
	addEducationItemRequest,
	deleteEducationItemRequest,
	getEducationItemRequest,
	putEducationItemRequest
} from '../../../store/creators/MainCreators'
import {
	allData,
	countryId,
	documentNumber,
	documentSeries,
	educationLevelId,
	graduateYear,
	nameOfInstitute,
	specialization
} from '../../../store/reducers/FormReducers/EducationReducer'
import { useGetCountriesQuery } from '../../../store/slice/countrySlice'
import { useGetEducationLevelQuery } from '../../../store/slice/educationLevelSlice'

const props: UploadProps = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text'
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`)
		}
	}
}

export const Education = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	dayjs.locale('en')

	const educationData = useAppSelector(state => state.Education)
	const role = useAppSelector(state => state.InfoUser?.role)

	const { data: educations } = useGetEducationLevelQuery(!role ? 'ABIT' : role)
	const { data: countries } = useGetCountriesQuery()

	const getData = async () => {
		const response = await getEducationItemRequest(dispatch)
		if (typeof response !== 'number') {
			dispatch(allData(response))
		}
		if (response === 403) navigate('/')
	}

	const [updateItems, setUpdate] = useState<boolean>(true)
	const [IsError, setError] = useState<IEducationError | null>(null)

	const convertToString = (field: any): string => {
		if (typeof field === 'string') {
			return field
		} else {
			return ''
		}
	}

	const checkEducationItem = (item: IEducationState): boolean => {
		var haveError = false

		var errorPattern = {
			id: item.id,
			nameOfInstitute: false,
			documentNumber: false,
			documentSeries: false,
			graduateYear: false,
			specialization: false
		}

		if (
			item.documentNumber === null ||
			(item.documentNumber !== null && !/^[0-9]{4}$/.test(item.documentNumber))
		) {
			haveError = true
			errorPattern.documentNumber = true
		}

		if (
			item.documentSeries === null ||
			(item.documentSeries !== null && !/^[0-9]{4}$/.test(item.documentSeries))
		) {
			haveError = true
			errorPattern.documentSeries = true
		}
		if (
			item.nameOfInstitute === null ||
			(item.nameOfInstitute !== null &&
				(/\s\s/.test(item.nameOfInstitute) ||
					!/^[\p{L}\s()0-9]+$/u.test(item.nameOfInstitute)))
		) {
			haveError = true
			errorPattern.nameOfInstitute = true
		}
		if (
			item.specialization === null ||
			(item.specialization !== null &&
				(/\s\s/.test(item.specialization) ||
					!/^[\p{L}\s.,]+$/u.test(item.specialization)))
		) {
			haveError = true
			errorPattern.specialization = true
		}
		if (!item.graduateYear) {
			haveError = true
			errorPattern.graduateYear = true
		}

		haveError && setError(errorPattern)
		IsError !== null && !haveError && setError(null)

		return haveError
	}

	const handleUpdateEducation = async (item: IEducationState) => {
		if (!checkEducationItem(item)) {
			const status = await putEducationItemRequest(
				item.id.toString(),
				{
					nameOfInstitute: item.nameOfInstitute,
					documentNumber: item.documentNumber,
					documentSeries: item.documentSeries,
					graduateYear: item.graduateYear,
					specialization: item.specialization,
					educationLevelId: item.educationLevelId,
					countryId: item.countryId
				},

				dispatch
			)
			if (status === 200) setUpdate(true)
			if (status === 403) navigate('/')
		}
	}

	const handleDeleteEducation = async (id: string) => {
		const response = await deleteEducationItemRequest(id, dispatch)
		if (response === 200) setUpdate(true)
		if (response === 403) navigate('/')
	}

	const handleAddEducation = async () => {
		const item = {
			nameOfInstitute: null,
			documentNumber: null,
			documentSeries: null,
			graduateYear: null,
			specialization: null,
			educationLevelId: 2,
			countryId: 184
		}
		const response = await addEducationItemRequest(item, dispatch)
		if (response === 200) setUpdate(true)
		if (response === 403) navigate('/')
	}

	useEffect(() => {
		if (updateItems) {
			getData()
			setUpdate(false)
		}
	}, [updateItems])

	const isStudent = role === 'STUD'
	return (
		<div className="m-14 radio  min-w-[624px] w-full">
			<Space direction="vertical" size={20} className="w-full">
				<Typography.Title
					level={3}
					className="text-black text-2xl font-bold leading-normal"
				>
					{t('education')}
				</Typography.Title>
				{educationData.map((item, index) => (
					<Space direction="vertical" key={item.id} className="w-full">
						<Space>
							<Typography.Text ellipsis className="font-bold mr-3">
								{t('educationDocument')}
							</Typography.Text>
							<Typography.Text
								onClick={() => handleDeleteEducation(item.id.toString())}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px] mr-3',
									index === 0 && 'hidden'
								)}
							>
								{t('Delete')}
							</Typography.Text>
							<Typography.Text
								onClick={() => handleUpdateEducation(item)}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
									isStudent && 'hidden'
								)}
							>
								{t('Save')}
							</Typography.Text>
						</Space>
						<Space size={'large'} direction="vertical" className="w-full">
							<div className="grid grid-cols-2 gap-10 mt-5 w-full max-lg:grid-cols-1 max-lg:gap-1">
								<Space direction="vertical">
									<Typography.Text>{t('higherEducational')}</Typography.Text>
									<Select
										disabled={isStudent}
										size="large"
										className="w-full shadow rounded-lg"
										defaultValue={
											educationData.filter(el => el.id === item.id)[0]
												.educationLevelId
										}
										value={
											educationData.filter(el => el.id === item.id)[0]
												.educationLevelId
										}
										options={
											!educations
												? []
												: educations.map(el => ({
														value: el.id,
														label: el.name
												  }))
										}
										onChange={e =>
											dispatch(
												educationLevelId({ id: item.id, educationLevelId: e })
											)
										}
									/>
								</Space>
								<Space direction="vertical">
									<Typography.Text>{t('countryEducation')}</Typography.Text>
									{isStudent ? (
										//@ts-ignore
										<Input size="large" value={item.studentCountry} disabled />
									) : (
										<Select
											size="large"
											className="w-full shadow rounded-lg"
											onChange={e =>
												dispatch(
													countryId({
														id: item.id,
														countryId: e
													})
												)
											}
											options={
												!countries
													? []
													: countries.map(el => ({
															value: el.id,
															label: el.shortName
													  }))
											}
											value={item.countryId}
										/>
									)}
								</Space>
							</div>

							<Space direction="vertical" size={'small'} className="w-full">
								<Typography.Text>{t('nameEducational')}</Typography.Text>
								<Input
									disabled={isStudent}
									maxLength={200}
									placeholder="University of California at Berkeley, Department of All the smartest"
									size="large"
									className={clsx(
										'shadow ',
										IsError &&
											IsError.id === item.id &&
											IsError.nameOfInstitute &&
											'border-rose-500'
									)}
									value={convertToString(
										educationData.filter(el => el.id === item.id)[0]
											.nameOfInstitute
									)}
									onChange={e =>
										dispatch(
											nameOfInstitute({
												id: item.id,
												nameOfInstitute: e.target.value
											})
										)
									}
								/>
								{IsError &&
									IsError.id === item.id &&
									IsError.nameOfInstitute && (
										<div className="text-sm text-rose-500">
											{t('EmptyFolder')}
										</div>
									)}
							</Space>
							<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-lg:gap-1 max-lg:grid-cols-1">
								<Space direction="vertical" size={'small'}>
									<Typography.Text>{t('diplomaNumber')}</Typography.Text>
									<Input
										disabled={isStudent}
										placeholder="1234"
										size="large"
										maxLength={4}
										className={clsx(
											'shadow ',
											IsError &&
												IsError.id === item.id &&
												IsError.documentNumber &&
												'border-rose-500'
										)}
										value={convertToString(
											educationData.filter(el => el.id === item.id)[0]
												.documentNumber
										)}
										onChange={e =>
											dispatch(
												documentNumber({
													id: item.id,
													documentNumber: e.target.value
												})
											)
										}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.documentNumber && (
											<div className="text-sm text-rose-500">
												{t('EmptyFolder')}
											</div>
										)}
								</Space>
								<Space direction="vertical" size={'small'}>
									<Typography.Text>{t('diplomaSeries')}</Typography.Text>
									<Input
										disabled={isStudent}
										placeholder="1234"
										size="large"
										maxLength={4}
										className={clsx(
											'shadow ',
											IsError &&
												IsError.id === item.id &&
												IsError.documentSeries &&
												'border-rose-500'
										)}
										value={convertToString(
											educationData.filter(el => el.id === item.id)[0]
												.documentSeries
										)}
										onChange={e =>
											dispatch(
												documentSeries({
													id: item.id,
													documentSeries: e.target.value
												})
											)
										}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.documentSeries && (
											<div className="text-sm text-rose-500">
												{t('EmptyFolder')}
											</div>
										)}
								</Space>
								<Space direction="vertical">
									<Typography.Text>{t('graduateYear')}</Typography.Text>
									<DatePicker
										disabled={isStudent}
										className={clsx(
											'shadow w-full',
											IsError &&
												IsError.id === item.id &&
												IsError.graduateYear &&
												'border-rose-500'
										)}
										onChange={e => {
											dispatch(
												graduateYear({
													id: item.id,
													graduateYear:
														e == null ? '' : e.format('YYYY').toString()
												})
											)
										}}
										size="large"
										placeholder={new Date().getFullYear().toString()}
										picker="year"
										value={
											convertToString(
												educationData.filter(el => el.id === item.id)[0]
													.graduateYear
											) !== ''
												? dayjs(
														convertToString(
															educationData.filter(el => el.id === item.id)[0]
																.graduateYear
														),
														'YYYY'
												  )
												: null
										}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.graduateYear && (
											<div className="text-sm text-rose-500">
												{t('DateError')}
											</div>
										)}
								</Space>
								<Space
									direction="vertical"
									className={clsx(isStudent && 'hidden')}
								>
									<Typography.Text>{t('specialization')}</Typography.Text>
									<Input
										disabled={isStudent}
										placeholder={t('web')}
										size="large"
										className={clsx(
											'w-full shadow ',
											IsError &&
												IsError.id === item.id &&
												IsError.specialization &&
												'border-rose-500'
										)}
										value={convertToString(
											educationData.filter(el => el.id === item.id)[0]
												.specialization
										)}
										onChange={e =>
											dispatch(
												specialization({
													id: item.id,
													specialization: e.target.value
												})
											)
										}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.specialization && (
											<div className="text-sm text-rose-500">
												{t('EmptyFolder')}
											</div>
										)}
								</Space>
							</div>
						</Space>
						<Space direction="vertical" className={clsx(isStudent && 'hidden')}>
							<Space size={'small'} className="mt-5">
								<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
									{t('AttachDocuments')}
								</Typography.Text>
								<Tooltip title={t('AttachDocsDescription')}>
									<Button
										type="default"
										className="bg-transparent"
										icon={<QuestionOutlined className="text-xs" />}
									/>
								</Tooltip>
							</Space>
							<Upload {...props}>
								<Button icon={<UploadOutlined />}>{t('AddFile')}</Button>
							</Upload>
						</Space>
					</Space>
				))}
			</Space>
			<Space
				direction="vertical"
				size={'large'}
				className={clsx('w-full flex items-center', isStudent && 'hidden')}
			>
				<Button
					className="rounded-full text-center p-0 w-8 h-8 text-xl"
					type="primary"
					onClick={handleAddEducation}
				>
					+
				</Button>
			</Space>
		</div>
	)
}

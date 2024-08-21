import { Divider } from 'antd'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IUserData, TypeRole } from '../../api/types'
// import { MenuSvg } from '../../assets/svg'
import {
	LogoIasSvg,
	LogoutSvg,
	PersonCardSvg,
	PersonSvg,
	SettingSvg
} from '../../assets/svg'
import { RootState, useAppSelector } from '../../store'
import { getAbUsForm } from '../../store/creators/MainCreators'
import { LogOut } from '../../store/creators/SomeCreators'
import { allData } from '../../store/reducers/FormReducers/FormReducer'

type TypeHeaderProps = {
	type?: 'service' | 'main'
	service?: string
}

export const Header = ({ type = 'main', service }: TypeHeaderProps) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const { t } = useTranslation()
	const role = useAppSelector((state: RootState) => state.InfoUser.role)
	const form = useAppSelector((state: RootState) => state.Form)
	const [userEmail, changeUserEmail] = useState<IUserData | string>('')
	const [IsBurgerActive, changeIsBurgerActive] = useState<boolean>(true)

	const roleConverter = (role: TypeRole | null) => {
		if (role === 'ABIT') return 'Enrollee'
		if (role === 'ATTEND') return 'Attend'
		if (role === 'GUEST' || role === null) return 'Guest'
		if (role === 'SCHOOL') return 'Schoolboy'
		if (role === 'SEEKER') return 'Seeker'
		if (role === 'STUD') return 'Student'
	}

	useEffect(() => {
		if (localStorage.getItem('userInfo')) {
			changeUserEmail(JSON.parse(localStorage.getItem('userInfo') || ''))
		}
	}, [])

	const getUser = async () => {
		const response = await getAbUsForm(dispatch)
		if (response === 403) navigate('/')
		if (typeof response !== 'number') dispatch(allData(response))
	}

	useEffect(() => {
		getUser()
	}, [])

	const items: MenuProps['items'] = [
		{
			label: (
				<div className="p-2 text-sm text-[#1F5CB8] font-bold cursor-default">
					{typeof userEmail === 'string' ? '' : userEmail.email}
				</div>
			),
			key: '0'
		},
		{
			type: 'divider'
		},
		{
			label: (
				<div
					onClick={() => {
						navigate('/services/aboutMe/aboutMe')
					}}
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
				>
					<PersonCardSvg />
					About me
				</div>
			),
			key: '1'
		},
		{
			label: (
				<div
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
					onClick={() => {
						navigate('/services/setting/contactInformation')
					}}
				>
					<SettingSvg />
					{t('Setting')}
				</div>
			),
			key: '3'
		},
		{
			label: (
				<div
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
					onClick={() => {
						LogOut(dispatch)
						navigate('/')
					}}
				>
					<LogoutSvg />
					Log out
				</div>
			),
			key: '5'
		},
		{
			label: <div className="cursor-default" />,
			key: '6'
		}
	]
	return (
		<header
			className={clsx(
				' z-20  h-[80px] fixed flex items-center justify-center w-full',
				type === 'main' ? 'bg-[#f5f8fb]' : 'bg-[#65A1FA]'
			)}
		>
			<div className="w-screen flex h-full justify-between px-8">
				<div className="flex gap-8 items-center">
					<div className="flex items-center gap-5">
						<LogoIasSvg white={type === 'service'} />
						<Divider type="vertical" className="border-l-white h-10 m-0" />
						<div className="text-white text-base font-bold">{service}</div>
					</div>
				</div>
				<div className="flex gap-5 items-center h-full">
					<div
						className={clsx(
							'h-full flex items-center cursor-pointer ',
							type === 'main' && open && 'bg-[#E3E8ED]',
							type !== 'main' && open && 'bg-[#3073D7]',
							type === 'main' ? 'hover:bg-[#E3E8ED]' : 'target:bg-[#3073D7]'
						)}
					>
						<Dropdown
							menu={{ items }}
							placement="bottom"
							trigger={['click']}
							onOpenChange={() => setOpen(prev => !prev)}
							className="cursor-pointer h-full  box-border"
						>
							<Space className="px-10 max-[480px]:px-5 max-[455px]:!gap-0 gap-2">
								<PersonSvg white={type === 'service'} />
								<div
									className={clsx(
										'h-full max-[480px]:hidden',
										type === 'service' && 'text-white'
									)}
								>
									<div className="font-bold text-sm truncate max-w-[120px]">
										{`${form.surName} ${form.name.charAt(0)}. ${
											!form.patronymic ? '' : form.patronymic.charAt(0) + '.'
										}`}
									</div>
									<div className="text-sm">{roleConverter(role)}</div>
								</div>
							</Space>
						</Dropdown>
					</div>
				</div>
			</div>
		</header>
	)
}

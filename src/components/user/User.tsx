import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { GetRole } from '../../store/creators/MainCreators'
import { putRole } from '../../store/reducers/FormReducers/InfoUserReducer'
import DropDrag from '../dnd/DropDrag'
import { anotherBlock, studBlock } from '../dnd/constant'
import { Layout } from '../layout/Layout'
import { Heading } from '../ui/Heading'

export const User = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const role = useAppSelector(state => state.InfoUser.role)
	const [IsDashBoardSet, changeIsSet] = useState(false)

	const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(() => {
		return localStorage.getItem('dashboard')
			? JSON.parse(localStorage.getItem('dashboard') || '')
			: role === 'STUD'
			? studBlock
			: anotherBlock
	})

	const getRole = async () => {
		const response = await GetRole(dispatch)
		if (typeof response !== 'number') dispatch(putRole(response[0].role))
		if (response === 403) navigate('/')
	}

	useEffect(() => {
		getRole()
	}, [])

	useEffect(() => {
		if (role) {
			setLayouts(role === 'STUD' ? studBlock : anotherBlock)
			changeIsSet(true)
		}
	}, [role])

	if (!IsDashBoardSet) return <></>

	return (
		<Layout>
			<div className="px-10 flex items-center justify-center">
				<div className="max-w-[1600px] w-[1600px]">
					<Heading
						className={clsx(`mt-[125px] text-2xl font-bold text-[#1F5CB8]`)}
					>
						{t('PersonalAccount')} <br />
					</Heading>
					<DropDrag edit={true} layouts={layouts} setLayouts={setLayouts} />
				</div>
			</div>
		</Layout>
	)
}

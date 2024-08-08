import React, { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { GetRole } from '../../store/creators/MainCreators'
import { putRole } from '../../store/reducers/FormReducers/InfoUserReducer'
import { Header } from '../layout/Header'

import { NavAboutMe } from './aboutMe/NavAboutMe'
import AboutUniversity from './aboutUniversity/AboutUnversity'
import { NavElectronicBook } from './electronicBook/NavElectronicBook'
import { NavSchedule } from './schedule/NavSchedule'
import { NavSession } from './session/NavSession'
import { NavSetting } from './setting/NavSetting'

const Service = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const role = useAppSelector(state => state.InfoUser.role)
	const { pathname } = useLocation()
	const { t } = useTranslation()

	const getRole = async () => {
		const response = await GetRole(dispatch)
		if (typeof response !== 'number') dispatch(putRole(response[0].role))
		if (response === 403) navigate('/')
	}

	useEffect(() => {
		getRole()
	}, [])

	if (!role) return <></>

	return (
		<div className="h-screen w-screen">
			<Header type="service" service={t('StudentService')} />
			<div className="flex min-h-full pt-20">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
				{pathname.includes('/services/aboutMe') && <NavAboutMe />}
				{pathname.includes('/services/electronicBook') && <NavElectronicBook />}
				{pathname.includes('/services/aboutUniversity') && <AboutUniversity />}
				{pathname.includes('/services/setting') && <NavSetting />}
			</div>
		</div>
	)
}
export default Service

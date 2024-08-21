import { Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/images/group.png'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { loginUser } from '../../store/creators/MainCreators'
import { clearLoginErrors } from '../../store/creators/SomeCreators'
import { BackMainPage } from '../back-main-page/BackMainPage'

// import { Faq } from '../faq/Faq'
import styles from './Login.module.scss'
import { Buttons } from './buttons/Buttons'
import { Inputs } from './inputs/Inputs'

const { Title } = Typography

export const Login = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const error = useSelector((state: RootState) => state.AuthReg.authData.error)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(clearLoginErrors())
	}, [])

	const onFinish = async (values: { email: string; password: string }) => {
		let res = null
		if (values.email || values.password) {
			res = await loginUser(
				{ username: values.email, password: values.password },
				dispatch
			)
			const isEmol = res.data.user.roles.filter((item: any) => {
				console.log(item)

				return item.type === 'EMPL'
			})

			if (res.status === 200) navigate('/user')
		}
	}

	return (
		<div className={styles.wrapper}>
			<BackMainPage />
			<div className={styles.main}>
				<Form
					name="login"
					className={styles.loginForm}
					initialValues={{ remember: true }}
					onFinish={e => onFinish(e)}
				>
					<Title className={styles.title}>{t('authorization')}</Title>

					<Inputs error={error} />
					<Buttons />
				</Form>
				<div className="flex items-start mt-10">
					<img
						className="max-lg:hidden w-[400px] h-[400px]"
						src={logo}
						alt="group"
					/>
				</div>
			</div>
		</div>
	)
}

import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/images/group.png'
import { useAppDispatch } from '../../store'
import { RootState } from '../../store'
import { useRecoverPasswordMutation } from '../../store/api/recoverPassword'
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
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState('')
	const [sendEmail, { isSuccess, isError ,data,error:err}] = useRecoverPasswordMutation()

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
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const validateEmail = (
		rule: any,
		value: string,
		callback: (arg0: string | undefined) => void
	) => {
		const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/
		if (!emailRegex.test(value)) {
			callback('Invalid format email')
		} else {
			// @ts-ignore
			callback()
		}
	}

	const onFinishTwo: any = (values: any) => {
		console.log('Success:', values)
		sendEmail(email)
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
					<a
						className="mt-5 w-fit cursor-pointer underline;"
						onClick={showModal}
					>
						I don't remember the password
					</a>

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

			<Modal
				title="Forgot your password?"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				width={400}
			>
				{isSuccess === false ? (
					<>
						<Form onFinish={onFinishTwo}>
							<Row className="mt-4">
								<Col span={12} className="flex items-center">
									<label htmlFor="topic">E-mail:</label>
								</Col>
								<Col span={12} className="">
									<Form.Item
										className="mb-0"
										name="email"
										rules={[
											{ required: true, message: 'Email required' },
											{ validator: validateEmail }
										]}
									>
										<Input
											id="topic"
											placeholder=""
											onChange={e => setEmail(e.target.value)}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit" className="w-full mt-4">
								Send
							</Button>
						</Form>
					</>
				) : (
					<div>
						A letter has been sent to {email} To complete registration, you need
						to follow the link in the letter and set a password for your
						personal account.
					</div>
				)}
		
				{isError && <div className='flex justify-center text-red-500 mt-4'>An error has occurred. This email does not exist.</div>}
			</Modal>
		</div>
	)
}

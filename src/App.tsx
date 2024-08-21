import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

// import mp4 from './assets/video/Kfu.mp4'
import { ApproveEmail } from './components/approve/ApproveEmail'
import { CheckEmail } from './components/checkEmail/checkEmail'
import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'
import Service from './components/service'
import { User } from './components/user/User'
import { useAppDispatch } from './store'
import { refreshToken } from './store/creators/MainCreators'

const App = () => {
	const cookies = new Cookies()
	const [email, changeEmail] = useState('')
	const { t, i18n } = useTranslation()
	// const [video, changeVideo] = useState<string>('')

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const currentUrl = useLocation()

	// const installVideo = async () => {
	// 	if (!localStorage.getItem('greetingVideo')) {
	// 		try {
	// 			const response = await fetch(mp4)
	// 			const blob = await response.blob()
	// 			const videoObjectUrl = URL.createObjectURL(blob)
	// 			changeVideo(videoObjectUrl)
	// 		} catch (e) {
	// 			console.error('error')
	// 		}
	// 	}
	// }

	const dataApi = async () => {
		const res = await refreshToken(dispatch)
		if (res === 200) {
			if (
				!currentUrl.pathname.includes('/services' || '/user') &&
				!currentUrl.pathname.includes('/api/register/approve')
			) {
				navigate('/user')
			}
		}
		if (res === 403) {
			navigate('/')
		}
	}

	useEffect(() => {
		if (i18n.language === 'ru') {
			i18n.changeLanguage('en')
		}
		if (
			localStorage.getItem('access') !== null ||
			localStorage.getItem('userInfo') !== null ||
			cookies.get('refresh') !== undefined
		) {
			dataApi()
		} else {
			if (
				['/services', '/user'].some(el => el === currentUrl.pathname) &&
				!currentUrl.pathname.includes('/api/register/approve')
			) {
				navigate('/')
			}
		}
	}, [])

	// useEffect(() => {
	// 	console.log(video)
	// 	installVideo()
	// 	if (video) localStorage.setItem('greetingVideo', JSON.stringify(video))
	// })

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#3073D7',
						colorPrimaryHover: '#004EC2'
					}
				}}
			>
				<Routes>
					<Route path="/*" element={<Login />} />
					<Route
						path="/registration/*"
						element={<Registration email={email} changeEmail={changeEmail} />}
					/>
					<Route path="/user/*" element={<User />} />
					<Route path="/api/register/approve" element={<ApproveEmail />} />
					<Route
						path="/registration/checkingEmail"
						element={<CheckEmail email={email} />}
					/>
					<Route path="/services/*" element={<Service />} />
				</Routes>
			</ConfigProvider>
		</>
	)
}

export default App

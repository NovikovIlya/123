import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { approveEmail, setRole } from '../../store/creators/MainCreators'

import { CardForm } from './cardForm'

export const ApproveEmail = () => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [answer, changeAnswer] = useState<'loading' | 'bad' | 'success'>(
		'loading'
	)

	const query = async () => {
		if (localStorage.getItem('access')) {
			changeAnswer('success')
		} else {
			if (
				searchParams.get('id') !== null &&
				searchParams.get('hash') !== null
			) {
				const response = await approveEmail(
					{
						id: searchParams.get('id'),
						hash: searchParams.get('hash')
					},
					dispatch
				)
				if (response === 200) {
					await setRole({ role: 'ABIT' }, dispatch)
					changeAnswer('success')
				}
				if (response === 403) {
					changeAnswer('bad')
				}
			}
		}
	}

	useEffect(() => {
		query()
	}, [])

	const buttonEffect = () => {
		if (answer === 'success') {
			navigate('/user')
		} else {
			navigate('/')
		}
	}

	const closeEffect = () => {
		navigate('/')
	}
	return (
		<CardForm
			IsButtonDisabled={answer === 'loading' ? true : false}
			buttonEffect={buttonEffect}
			closeEffect={closeEffect}
			withDots={false}
			mainTittle="Welcome"
			secondTittle={<span></span>}
			buttonText="Start"
			buttonBgBlue={false}
		/>
	)
}

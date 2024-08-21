import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSentEmailMutation } from '../../store/slice/resentMail'
import { CardForm } from '../approve/cardForm'

interface ICheckEmailProps {
	email: string
}

export const CheckEmail: FC<ICheckEmailProps> = ({ email }) => {
	const navigate = useNavigate()
	const [sentEmail] = useSentEmailMutation()
	const [isDisable, setIsDisable] = useState(true)
	useEffect(() => {
		if (email === '') navigate('/')
	}, [])
	setTimeout(() => {
		setIsDisable(false)
	}, 60000)

	const buttonEffect = () => {
		sentEmail({ email: email })
		setIsDisable(true)
	}

	const closeEffect = () => {
		navigate('/registration')
	}
	return (
		<CardForm
			IsButtonDisabled={isDisable}
			buttonEffect={buttonEffect}
			closeEffect={closeEffect}
			withDots={true}
			mainTittle="Check your email"
			secondTittle={
				<span>
					Sent to the post office <span className="font-bold">{email}</span>{' '}
					&nbsp; welcome letter. To complete the registration, you need to
					follow the link provided in the letter
				</span>
			}
			buttonText="Resend"
			buttonBgBlue={true}
		/>
	)
}

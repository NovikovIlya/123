import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'

import { useSetPasswordsMutation } from '../../../store/slice/passwordSlice'

export const ChangePassword = () => {
	const [putPassword] = useSetPasswordsMutation()
	const [isEqual, setIsEqual] = useState<Boolean | null>(null)
	const [newPassword, setNewPassword] = useState<string>()
	const [oldPassword, setOldPassword] = useState<string>()
	const [equalPassword, setEqualPassword] = useState<string>()

	useEffect(() => {
		if (newPassword === equalPassword) setIsEqual(true)
		else setIsEqual(false)
	}, [newPassword, equalPassword])

	return (
		<section className="max-w-2xl">
			<h1 className="text-black text-2xl font-bold leading-normal">
				Change the password
			</h1>
			<article className="mt-10">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Enter the old password
				</h1>
				<Input.Password
					value={oldPassword}
					onChange={e => setOldPassword(e.target.value)}
					size="large"
					className="mt-2"
					placeholder="Old password"
				/>
			</article>
			<article className="mt-7">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Enter a new password
				</h1>
				<Input.Password
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
					size="large"
					className="my-2"
					placeholder="New password"
				/>
				<p className="text-zinc-500 text-xs font-normal leading-normal">
					The password must contain at least 8 characters, uppercase and
					lowercase letters, as well as numbers
				</p>
			</article>
			<article className="mt-7">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Repeat the new password
				</h1>
				<Input.Password
					value={equalPassword}
					onChange={e => setEqualPassword(e.target.value)}
					size="large"
					className="mt-2"
					placeholder="Repeat the password"
				/>
			</article>
			<Button
				className="bg-transparent border-black !rounded-full mt-4"
				size="large"
				onClick={() => {
					if (isEqual) {
						putPassword({
							oldPassword,
							newPassword
						})
					}
					console.log('====================================')
					console.log(
						{
							oldPassword,
							newPassword
						},
						isEqual
					)
					console.log('====================================')
				}}
			>
				Confirm
			</Button>
		</section>
	)
}

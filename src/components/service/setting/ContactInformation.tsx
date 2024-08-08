import { Button, Input } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import uuid from 'react-uuid'

import { useEmailsQuery } from '../../../store/slice/passwordSlice'

export const ContactInformation = () => {
	const { data } = useEmailsQuery()
	return (
		<section className="max-w-2xl">
			<h3 className="text-black text-2xl font-bold leading-normal">
				Contact information
			</h3>
			<article className=" mt-10">
				<h1 className="text-black text-sm font-bold">
					Basic contact information
				</h1>
				<article className="mt-7">
					<h1 className="opacity-80 text-black text-sm font-normal">Email</h1>
					<Input
						size="large"
						className="mt-2.5"
						placeholder={'PerelmanGYA@stud.kpfu.ru'}
					/>
					<section>
						<h1 className="opacity-40 text-black text-base font-normal">
							You need to confirm your email by clicking on the button below
						</h1>
						<Button
							className="bg-transparent border-black !rounded-full mt-4"
							size="large"
						>
							Confirm
						</Button>
					</section>
				</article>
				<article className="mt-7 mb-2.5">
					<h1 className="opacity-80 text-black text-sm font-normal">
						Telephone
					</h1>
					<Input
						size="large"
						className="mt-2.5"
						placeholder="+7 999 898-88-99"
					/>
					<section>
						<h1 className="opacity-40 text-black text-base font-normal">
							You need to confirm the number by clicking on the button below
						</h1>
						<Button
							className="bg-transparent border-black !rounded-full mt-4"
							size="large"
						>
							Confirm
						</Button>
					</section>
				</article>
			</article>
		</section>
	)
}

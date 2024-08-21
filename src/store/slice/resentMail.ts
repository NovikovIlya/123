import { useAppSelector } from '..'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IEducationLevelRequest, TypeRole } from './../../api/types'

export const resentEmail = createApi({
	reducerPath: 'educationLevelAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://egp.kpfu.ru/user-api' }),
	endpoints: build => ({
		sentEmail: build.mutation<IEducationLevelRequest[], { email: string }>({
			query: email => {
				return {
					url: '/register/send-verification',
					method: 'POST',
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						'Accept-Language': 'en'
					},
					body: email
				}
			}
		})
	})
})

export const { useSentEmailMutation } = resentEmail

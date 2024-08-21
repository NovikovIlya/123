import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://newlk.kpfu.ru/',
	prepareHeaders: headers => {
		const accessToken = localStorage.getItem('access')
		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})
export const passwordApi = createApi({
	reducerPath: 'passwordApi',
	baseQuery,
	endpoints: builder => ({
		emails: builder.query<any, void>({
			query: () => ({
				url: 'user-api/settings/emails'
			})
		}),
		setPasswords: builder.mutation<any, any>({
			query: body => ({
				url: 'user-api/settings/password',
				method: 'PUT',
				body
			})
		})
	})
})

export const { useSetPasswordsMutation, useEmailsQuery } = passwordApi

type Email = Array<{
	id: number
	email: string
	verified: boolean
}>

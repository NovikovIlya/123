import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'
import { TypeSchedule } from '../../api/types'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://egp.kpfu.ru/schedule-api',
	prepareHeaders: headers => {
		const accessToken = localStorage.getItem('access')
		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})
export const scheduleApi = createApi({
	reducerPath: 'scheduleApi',
	baseQuery,
	endpoints: builder => ({
		getSchedule: builder.query<TypeSchedule, void>({
			query: () => endpoints.USER.INFO.SCHEDULE
		})
	})
})

export const { useGetScheduleQuery } = scheduleApi
